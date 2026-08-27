import json
import os

from dotenv import load_dotenv
from openai import OpenAI

from puzzle import CATEGORIES

load_dotenv()

API_KEY = os.getenv("OPENAI_API_KEY")
MODEL = os.getenv("OPENAI_MODEL", "gpt-5-mini")

client = OpenAI(api_key=API_KEY) if API_KEY else None


def generate_puzzle(category, difficulty="easy"):
    """
    Generate a Linux puzzle using AI.

    If the API key is not configured, a local fallback puzzle is returned.
    """

    category_info = CATEGORIES.get(category)

    if not category_info:
        category = "files"
        category_info = CATEGORIES["files"]

    if not client:
        return fallback_puzzle(category, difficulty)

    prompt = f"""
You are generating a Linux terminal puzzle for a developer learning Linux.

Category:
{category_info["name"]}

Category description:
{category_info["description"]}

Difficulty:
{difficulty}

Create ONE small practical Linux challenge.

The challenge must:
- be safe
- be suitable for a learning game
- require a Linux command
- be solvable with one main command
- not require sudo
- not delete real files
- not modify the real operating system
- not use dangerous commands
- not use networking attacks
- not use passwords or secrets

Return ONLY valid JSON.

Required JSON structure:

{{
  "title": "short title",
  "description": "clear challenge description",
  "hint": "small hint without revealing the answer",
  "accepted_commands": [
    "command 1",
    "command 2"
  ],
  "explanation": "explain why the command solves the challenge"
}}
"""

    try:
        response = client.responses.create(
            model=MODEL,
            input=prompt
        )

        text = response.output_text.strip()

        puzzle = json.loads(text)

        required_fields = [
            "title",
            "description",
            "hint",
            "accepted_commands",
            "explanation"
        ]

        for field in required_fields:
            if field not in puzzle:
                raise ValueError(f"Missing field: {field}")

        if not isinstance(puzzle["accepted_commands"], list):
            raise ValueError("accepted_commands must be a list")

        return puzzle

    except Exception as error:
        print("AI generation failed:", error)
        return fallback_puzzle(category, difficulty)


def fallback_puzzle(category, difficulty):
    """
    Local puzzles used if AI is unavailable.
    """

    puzzles = {
        "files": {
            "title": "Find the Secret File",
            "description": (
                "There is a file named secret.txt somewhere "
                "inside the current directory. Find its location."
            ),
            "hint": "Think about the find command.",
            "accepted_commands": [
                "find . -name secret.txt"
            ],
            "explanation": (
                "The find command searches for files and directories. "
                "The -name option searches for a specific filename."
            )
        },

        "permissions": {
            "title": "Make the Script Executable",
            "description": (
                "The file backup.sh needs to be executable by its owner. "
                "Fix its permission."
            ),
            "hint": "Use chmod to modify permissions.",
            "accepted_commands": [
                "chmod +x backup.sh",
                "chmod u+x backup.sh"
            ],
            "explanation": (
                "chmod changes file permissions. "
                "The +x option adds execute permission."
            )
        },

        "processes": {
            "title": "Inspect Running Processes",
            "description": (
                "You need to see the currently running processes. "
                "Use a standard Linux command."
            ),
            "hint": "Think about the process listing command.",
            "accepted_commands": [
                "ps"
            ],
            "explanation": (
                "The ps command displays information about running processes."
            )
        },

        "networking": {
            "title": "Test Local Connectivity",
            "description": (
                "Check whether the local machine can respond to a network "
                "connectivity test."
            ),
            "hint": "Use ping with localhost.",
            "accepted_commands": [
                "ping localhost"
            ],
            "explanation": (
                "ping sends network requests to test connectivity. "
                "localhost refers to the current machine."
            )
        },

        "users": {
            "title": "Find Your Current User",
            "description": (
                "Find out which Linux user is currently logged into the shell."
            ),
            "hint": "There is a simple command specifically for this.",
            "accepted_commands": [
                "whoami"
            ],
            "explanation": (
                "whoami prints the username of the current user."
            )
        },

        "shell": {
            "title": "Print a Message",
            "description": (
                "Use Bash to print the message Hello Linux."
            ),
            "hint": "Use the echo command.",
            "accepted_commands": [
                "echo hello linux",
                "echo Hello Linux"
            ],
            "explanation": (
                "The echo command prints text to the terminal."
            )
        }
    }

    return puzzles.get(category, puzzles["files"])
