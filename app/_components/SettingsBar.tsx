export default function SettingsBar() {
  return (
    <div className="settings-bar flex items-center gap-4">
      <p>72 Hrs</p>
      <label htmlFor="budget">Budget</label>
      <input type="number" value={300} id="budget"/>
      <label htmlFor="weight">Weight</label>
      <input type="number" value={25} id="weight"/>
    </div>
  );
}