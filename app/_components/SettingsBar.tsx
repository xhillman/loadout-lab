export default function SettingsBar() {
  return (
    <div className="settings-bar flex items-center justify-center gap-4 pb-4 shadow-lg/50">
      <p>72 Hrs</p>
      <label htmlFor="budget">Budget</label>
      <input type="number" defaultValue={300} id="budget" className="w-16" />
      <label htmlFor="weight">Weight</label>
      <input type="number" defaultValue={25} id="weight" className="w-16" />
    </div>
  );
}