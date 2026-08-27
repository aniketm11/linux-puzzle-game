from flask import Flask, jsonify, request
from flask_cors import CORS
import os
import random

app = Flask(__name__)
CORS(app)


CATEGORY_COMMANDS = {

    "files": [
        "pwd",
        "ls",
        "cd",
        "find",
        "cat",
        "grep",
        "mkdir",
        "cp",
        "mv"
    ],

    "permissions": [
        "ls -l",
        "chmod",
        "chown",
        "umask"
    ],

    "processes": [
        "ps",
        "top",
        "kill",
        "pgrep",
        "jobs"
    ],

    "networking": [
        "ping",
        "ip",
        "curl",
        "ss",
        "netstat"
    ],

    "users": [
        "whoami",
        "id",
        "groups",
        "who",
        "passwd"
    ],

    "shell": [
        "echo",
        "export",
        "bash",
        "if",
        "for",
        "while"
    ]
}


def get_difficulty(level):

    if level <= 3:
        return "easy"

    if level <= 6:
        return "medium"

    if level <= 9:
        return "hard"

    return "expert"


def create_ai_prompt(
    category,
    difficulty,
    level
):

    commands = CATEGORY_COMMANDS.get(
        category,
        []
    )

    return f"""
You are an expert Linux instructor
creating an interactive Linux learning game.

Generate ONE Linux command-line puzzle.

CATEGORY:
{category}

LEVEL:
{level}

DIFFICULTY:
{difficulty}

AVAILABLE COMMANDS:
{", ".join(commands)}

DIFFICULTY RULES:

EASY:
- Basic Linux commands
- One simple objective
- Suitable for a beginner
- Avoid pipes and complex syntax

MEDIUM:
- Combine basic commands
- Require some reasoning
- May use paths, options or simple pipes

HARD:
- Multi-step Linux reasoning
- Pipes, grep, find, permissions,
  process or networking concepts
- Require the player to understand
  why the command works

EXPERT:
- Complex real-world Linux task
- Multiple commands may be required
- Require strong Linux knowledge

IMPORTANT:

Do not repeat common beginner questions
when the level becomes harder.

Return JSON only.

The JSON must contain:

{{
    "title": "short puzzle title",
    "description": "clear challenge description",
    "hint": "helpful hint without giving away the answer",
    "accepted_commands": [
        "command1",
        "command2"
    ],
    "explanation": "explain the Linux concept after solving"
}}

The accepted_commands field must contain
commands that genuinely solve the puzzle.
"""


def generate_fallback_puzzle(
    category,
    difficulty,
    level
):

    if category == "files":

        if difficulty == "easy":

            return {
                "title": "Find Your Location",
                "description":
                    "Display the current working directory.",
                "hint":
                    "There is a command that prints your current location.",
                "accepted_commands": [
                    "pwd"
                ],
                "explanation":
                    "The pwd command prints the current working directory."
            }

        if difficulty == "medium":

            return {
                "title": "Find the Secret File",
                "description":
                    "Find a file named secret.txt somewhere inside the current directory.",
                "hint":
                    "Use the find command with the current directory.",
                "accepted_commands": [
                    "find . -name secret.txt",
                    "find . -name 'secret.txt'"
                ],
                "explanation":
                    "The find command searches for files and directories recursively."
            }

        if difficulty == "hard":

            return {
                "title": "Search Inside Files",
                "description":
                    "Find files containing the word password.",
                "hint":
                    "Think about combining find with grep.",
                "accepted_commands": [
                    "grep -R password .",
                    "grep -R 'password' ."
                ],
                "explanation":
                    "grep can recursively search file contents for matching text."
            }

    if category == "permissions":

        if difficulty == "easy":

            return {
                "title": "Read File Permissions",
                "description":
                    "Display the permissions of files in the current directory.",
                "hint":
                    "Use ls with the option that shows detailed information.",
                "accepted_commands": [
                    "ls -l"
                ],
                "explanation":
                    "ls -l displays detailed file information including permissions."
            }

        if difficulty == "medium":

            return {
                "title": "Make a Script Executable",
                "description":
                    "Give script.sh execute permission for the owner.",
                "hint":
                    "Use chmod with the owner execute permission.",
                "accepted_commands": [
                    "chmod u+x script.sh",
                    "chmod +x script.sh"
                ],
                "explanation":
                    "chmod changes file permissions."
            }

    if category == "processes":

        if difficulty == "easy":

            return {
                "title": "List Running Processes",
                "description":
                    "Display currently running processes.",
                "hint":
                    "Use the standard process listing command.",
                "accepted_commands": [
                    "ps",
                    "ps aux"
                ],
                "explanation":
                    "ps displays information about running processes."
            }

    if category == "networking":

        if difficulty == "easy":

            return {
                "title": "Test Network Connectivity",
                "description":
                    "Test whether example.com is reachable.",
                "hint":
                    "Use a command that sends network packets.",
                "accepted_commands": [
                    "ping example.com"
                ],
                "explanation":
                    "ping tests network connectivity to a host."
            }

    if category == "users":

        return {
            "title": "Identify Yourself",
            "description":
                "Display the username of the current Linux user.",
            "hint":
                "There is a very short command for this.",
            "accepted_commands": [
                "whoami"
            ],
            "explanation":
                "whoami prints the username of the current user."
        }

    if category == "shell":

        return {
            "title": "Print a Message",
            "description":
                "Use Bash to print Hello Linux.",
            "hint":
                "Use the command normally used to print text.",
            "accepted_commands": [
                "echo Hello Linux",
                "echo 'Hello Linux'",
                'echo "Hello Linux"'
            ],
            "explanation":
                "echo prints text to the terminal."
        }

    return {
        "title": "Linux Basics",
        "description":
            "Display your current working directory.",
        "hint":
            "Use pwd.",
        "accepted_commands": [
            "pwd"
        ],
        "explanation":
            "pwd shows your current directory."
    }


@app.route("/")
def home():

    return jsonify({
        "message": "Linux Puzzle Game API is running"
    })


@app.route(
    "/api/generate-puzzle",
    methods=["POST"]
)
def generate_puzzle():

    data = request.get_json() or {}

    category = data.get(
        "category",
        "files"
    )

    level = int(
        data.get(
            "level",
            1
        )
    )

    difficulty = data.get(
        "difficulty"
    )

    if not difficulty:
        difficulty = get_difficulty(level)

    """
    Put your OpenAI/AI generation code here
    if your project already has an AI API.

    The AI prompt should be created with:

        create_ai_prompt(
            category,
            difficulty,
            level
        )

    If AI generation fails, the fallback puzzle
    keeps the game working.
    """

    puzzle = generate_fallback_puzzle(
        category,
        difficulty,
        level
    )

    return jsonify(puzzle)


@app.route(
    "/api/check",
    methods=["POST"]
)
def check_command():

    data = request.get_json() or {}

    command = data.get(
        "command",
        ""
    ).strip()

    accepted_commands = data.get(
        "accepted_commands",
        []
    )

    normalized_command = " ".join(
        command.split()
    )

    normalized_accepted = [
        " ".join(
            item.strip().split()
        )
        for item in accepted_commands
    ]

    correct = (
        normalized_command
        in normalized_accepted
    )

    if correct:

        return jsonify({
            "correct": True,
            "output": "✓ Correct command!"
        })

    return jsonify({
        "correct": False,
        "output": "Command did not solve the challenge."
    })


if __name__ == "__main__":

    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )
