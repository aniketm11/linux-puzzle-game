import { useEffect, useRef, useState } from "react";

type TerminalProps = {
  output: string[];
  onSubmit: (command: string) => void;
  disabled?: boolean;
};

function Terminal({
  output,
  onSubmit,
  disabled = false
}: TerminalProps) {

  const [command, setCommand] =
    useState("");

  const inputRef =
    useRef<HTMLInputElement>(null);

  useEffect(() => {

    inputRef.current?.focus();

  }, []);

  const submit = (
    event: React.FormEvent
  ) => {

    event.preventDefault();

    if (!command.trim()) return;

    onSubmit(command);

    setCommand("");

  };

  return (
    <div className="terminal-card">

      <div className="terminal-toolbar">

        <div className="mac-dots">

          <span />
          <span />
          <span />

        </div>

        <div className="terminal-title">

          <span>〉_</span>
          Linux Quest Terminal

        </div>

        <div className="terminal-actions">

          <button
            onClick={() => onSubmit("clear")}
          >
            Clear
          </button>

          <button>
            ⛶
          </button>

        </div>

      </div>

      <div className="terminal-screen">

        {output.map((line, index) => {

          const isCommand =
            line.startsWith(
              "player@linux:~$"
            );

          return (
            <div
              key={index}
              className={
                isCommand
                  ? "terminal-command"
                  : "terminal-output"
              }
            >
              {line}
            </div>
          );

        })}

        <form onSubmit={submit}>

          <span className="terminal-prompt">
            player@linux:~$
          </span>

          <input
            ref={inputRef}
            value={command}
            disabled={disabled}
            onChange={event =>
              setCommand(
                event.target.value
              )
            }
            autoComplete="off"
            spellCheck={false}
            placeholder="Type a Linux command..."
          />

        </form>

      </div>

    </div>
  );
}

export default Terminal;
