type CategoriesProps = {
  onSelect: (category: string) => void;
  onHome: () => void;
};

const categories = [
  {
    id: "files",
    icon: "📁",
    title: "File Management",
    description:
      "Navigate, search and manipulate files like a Linux pro.",
    commands: "ls · cd · find · cat",
    color: "pink"
  },
  {
    id: "permissions",
    icon: "🔐",
    title: "Permissions",
    description:
      "Understand Linux permissions and control file access.",
    commands: "chmod · chown · ls -l",
    color: "purple"
  },
  {
    id: "processes",
    icon: "⚙️",
    title: "Processes",
    description:
      "Inspect and understand processes running on Linux.",
    commands: "ps · top · kill",
    color: "blue"
  },
  {
    id: "networking",
    icon: "🌐",
    title: "Networking",
    description:
      "Practice essential Linux networking commands.",
    commands: "ping · ip · curl",
    color: "orange"
  },
  {
    id: "users",
    icon: "👤",
    title: "Users & Groups",
    description:
      "Learn how Linux users and groups work.",
    commands: "whoami · id",
    color: "green"
  },
  {
    id: "shell",
    icon: "⌘",
    title: "Shell Scripting",
    description:
      "Build confidence with Bash and command-line automation.",
    commands: "echo · variables · bash",
    color: "pink"
  }
];

function Categories({
  onSelect,
  onHome
}: CategoriesProps) {
  return (
    <main className="categories">

      <header className="simple-header">

        <button
          className="back-home"
          onClick={onHome}
        >
          ← Linux Quest
        </button>

        <div className="header-center">
          Choose your challenge
        </div>

        <div className="level-pill">
          Level 1
        </div>

      </header>

      <section className="categories-hero">

        <div className="eyebrow">
          <span className="status-dot" />
          SELECT A CATEGORY
        </div>

        <h1>
          What do you want
          <br />
          <span>to master?</span>
        </h1>

        <p>
          Pick a topic and AI will create a fresh Linux
          challenge for you.
        </p>

      </section>

      <section className="category-grid">

        {categories.map((category) => (
          <button
            key={category.id}
            className={`category-large ${category.color}`}
            onClick={() => onSelect(category.id)}
          >

            <div className="category-top">

              <div className="category-icon">
                {category.icon}
              </div>

              <span className="arrow-circle">
                →
              </span>

            </div>

            <div className="category-info">

              <h2>
                {category.title}
              </h2>

              <p>
                {category.description}
              </p>

              <code>
                {category.commands}
              </code>

            </div>

          </button>
        ))}

      </section>

    </main>
  );
}

export default Categories;
