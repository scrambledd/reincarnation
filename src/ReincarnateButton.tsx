import './ReincarnateButton.css'


 type ReincarnateButtonProps = {
    onClick: () => void;
    disabled?: boolean; 
  }

export function ReincarnateButton({onClick, disabled}: ReincarnateButtonProps) {

 

  return (
    <div className="button-container">
      <button 
      onClick={onClick} 
      disabled={disabled} 
      className="reincarnate-button">
      {disabled ? "Reincarnating..." : "Reincarnate"}
    </button>
    </div>
    
  );
}