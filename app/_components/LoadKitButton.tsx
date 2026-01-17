type LoadKitButtonProps = {
  onLoadKitClick: () => void;
};

export default function LoadKitButton({ onLoadKitClick }: LoadKitButtonProps) {
  return (
    <button className="load-kit-button bg-accent-amber/15 border border-accent-amber/30 hover:bg-accent-amber/25 hover:border-accent-amber/50 text-base font-bold px-5 py-2 rounded-lg cursor-pointer shadow-card btn-primary text-accent-amber transition-all duration-200 ease-smooth" onClick={onLoadKitClick}>
      Load Kit
    </button>
  );
}