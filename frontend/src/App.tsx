import { useState } from "react";

import Home from "./pages/Home";
import Categories from "./pages/Categories";
import Game from "./pages/Game";

type Page = "home" | "categories" | "game";

function App() {
  const [page, setPage] = useState<Page>("home");
  const [category, setCategory] = useState("files");

  const selectCategory = (selectedCategory: string) => {
    setCategory(selectedCategory);
    setPage("game");
  };

  return (
    <div className="app-shell">

      {page === "home" && (
        <Home
          onStart={() => setPage("categories")}
          onCategory={() => setPage("categories")}
        />
      )}

      {page === "categories" && (
        <Categories
          onSelect={selectCategory}
          onHome={() => setPage("home")}
        />
      )}

      {page === "game" && (
        <Game
          category={category}
          onCategories={() => setPage("categories")}
        />
      )}

    </div>
  );
}

export default App;
