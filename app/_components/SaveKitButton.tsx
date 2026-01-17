type SaveKitButtonProps = {
  onSaveKitClick: () => void;
};
export default function SaveKitButton({ onSaveKitClick }: SaveKitButtonProps) {
  return (
    <button className="save-kit-button bg-card-base border border-border-soft hover:bg-card-hover hover:border-accent-amber/30 text-base font-bold px-5 py-2 rounded-lg cursor-pointer shadow-card btn-primary text-text-primary transition-all duration-200 ease-smooth" onClick={onSaveKitClick}>
      Save Kit
    </button>
  );
}