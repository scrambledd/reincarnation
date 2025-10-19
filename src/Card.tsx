import './Card.css';

type CardProps = {
  frontImage: string;
  backImage: string;
  isFlipped: boolean;
  isSelected: boolean;
  onClick: () => void;
  isReincarnating: boolean;
}

export function Card({ frontImage, backImage, isFlipped, isSelected, onClick, isReincarnating }: CardProps) {

  return (
    <div className={`card ${isFlipped ? "flipped" : ""}
    ${isSelected ? "selected" : ""} 
    ${isReincarnating ? "reincarnating" : ""}`}
    onClick={onClick}
      style={{ cursor: isFlipped ? 'pointer' : 'default' }}
    >
      <div className="card-inner">
        <div className="card-front">
          <img src={backImage} alt="Card back" />
        </div>
        <div className="card-back">
          <img src={frontImage} alt="Card front" />
        </div>
      </div>
    </div>
  );
}
