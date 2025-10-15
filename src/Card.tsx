import './Card.css';

type CardProps = {
  frontImage: string;
  backImage: string;
  flipped: boolean;
}

export function Card({ frontImage, backImage, flipped }: CardProps) {

  return (
    <div className={`card ${flipped ? "flipped" : ""}`}>
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
