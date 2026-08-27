import re


CATEGORIES = {
    "files": {
        "name": "File Management",
        "description": "Practice ls, cd, pwd, cat, mkdir, touch, cp, mv and find."
    },
    "permissions": {
        "name": "Permissions",
        "description": "Practice chmod, file permissions and ls -l."
    },
    "processes": {
        "name": "Processes",
        "description": "Practice ps, top, kill and process management."
    },
    "networking": {
        "name": "Networking",
        "description": "Practice ping, curl, ip and basic networking commands."
    },
    "users": {
        "name": "Users & Groups",
        "description": "Practice id, whoami and basic Linux users/groups."
    },
    "shell": {
        "name": "Shell Scripting",
        "description": "Practice Bash commands and simple shell scripts."
    }
}


def normalize_command(command):
    """Normalize a command for simple comparison."""
    command = command.strip().lower()
    command = re.sub(r"\s+", " ", command)
    return command


def check_solution(user_command, accepted_commands):
    """Check whether the user's command matches one of the accepted commands."""
    normalized = normalize_command(user_command)

    for accepted in accepted_commands:
        if normalized == normalize_command(accepted):
            return True

    return False


def get_command_output(command):
    """
    Simulated Linux terminal output.

    This does NOT execute commands on the real machine.
    """

    command = normalize_command(command)

    outputs = {
        "pwd": "/home/player",

        "ls": "documents  scripts  notes.txt",

        "ls -l": (
            "total 12\n"
            "-rw-r--r-- 1 player player 120 notes.txt\n"
            "-rw-r--r-- 1 player player 240 backup.sh"
        ),

        "whoami": "player",

        "id": "uid=1000(player) gid=1000(player) groups=1000(player)",

        "ps": (
            "PID   CMD\n"
            "101   nginx\n"
            "205   python\n"
            "312   bash"
        ),

        "ip addr": (
            "lo: 127.0.0.1\n"
            "eth0: 192.168.1.20"
        ),

        "ping localhost": (
            "PING localhost (127.0.0.1)\n"
            "64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.025 ms"
        ),

        "cat notes.txt": "Linux practice notes",

        "cat secret.txt": "ACCESS GRANTED",

        "find . -name secret.txt": "./documents/secret.txt",

        "chmod +x backup.sh": "",

        "chmod u+x backup.sh": "",

        "mkdir test": "",

        "touch test.txt": ""
    }

    if command in outputs:
        return outputs[command]

    if command.startswith("echo "):
        return command[5:]

    if command == "clear":
        return "__CLEAR__"

    return f"bash: {command}: simulated command not found"
