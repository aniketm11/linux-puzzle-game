type CategoryCardProps = {
  name: string;
  description: string;
  icon: string;
  onClick: () => void;
};

function CategoryCard({
  name,
  description,
  icon,
  onClick
}: CategoryCardProps) {
  return (
    <button className="category-card" onClick={onClick}>
      <div className="category-icon">{icon}</div>

      <h3>{name}</h3>

      <p>{description}</p>

      <span className="play-link">
        Play Challenge →
      </span>
    </button>
  );
}

export default CategoryCard;
