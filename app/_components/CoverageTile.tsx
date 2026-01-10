export default function CoverageTile({ category }: { category: string }) {
  if (category !== "All") {
    return (
      <div className="coverage-tile flex justify-between items-center mb-2">
        <h3>{category}</h3>
        <div className="coverage-bar flex-1 bg-neutral-100/10 rounded h-4 mx-2">
          <div className="coverage-bar-fill" style={{ width: "0%" }}></div>
        </div>
        <p className="font-bold">0%</p>
      </div>
    );
  }
}
