import { useState } from "react";
import useKitStore from "../_hooks/useKitStore";
import { Kit } from "../_types";

type SaveKitModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  kit: Kit;
};
export default function SaveKitModal({ isOpen, closeModal, kit }: SaveKitModalProps) {

  const {saveKit} = useKitStore();

  const [kitName, setKitName] = useState("");

  if (!isOpen) return null;

  return (
    <div className="save-kit-modal modal rounded-lg p-4 bg-card-base border border-border-soft shadow-card fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
      <h1>Save Kit Modal</h1>

        <div className="form-group">
          <label htmlFor="kit-name">Kit Name</label>
          <input type="text" id="kit-name" name="kit-name" className="w-full p-2 border border-border-soft rounded-lg" onChange={(e) => setKitName(e.target.value)}/>
        </div>

      <div className="form-group">
        <button type="submit" className="save-button bg-card-base border border-border-soft hover:bg-card-hover hover:border-accent-amber/30 text-base font-bold px-5 py-2 rounded-lg cursor-pointer shadow-card btn-primary text-text-primary transition-all duration-200 ease-smooth" onClick={() => { 
          saveKit(kit, kitName); 
          closeModal();
        }}>
          Save
        </button>
      </div>
      <button className="close-button bg-card-base border border-border-soft hover:bg-card-hover hover:border-accent-amber/30 text-base font-bold px-5 py-2 rounded-lg cursor-pointer shadow-card btn-primary text-text-primary transition-all duration-200 ease-smooth" onClick={closeModal}>
        Close
      </button>
    </div>
  );
}