export default function CoverageTile({ category }: { category: string }) {
  return (
    <div className="coverage-tile flex gap-2">
      <h2>{category}</h2>
      <div className="coverage-bar">
        <div className="coverage-bar-fill" style={{ width: "0%" }}></div>
      </div>
      <p>0%</p>
    </div>
  );
}