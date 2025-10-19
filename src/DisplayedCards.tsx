import { Card } from './Card';

type CardData = {
  frontImage: string;
  backImage: string;
  description: string;
}

type DisplayedCardsProps = {
  cards: CardData[];
  flipped: boolean[];
  selectedCardIndex: number | null;
  onSelect: (index: number | null) => void;
}


export function DisplayedCards({ cards, flipped, selectedCardIndex, onSelect }: DisplayedCardsProps) {

  return (
      <div className="cards-container">
        {cards.map((card, i) => {
          return (
            <div key={i} className="card-wrapper">
              <Card
                frontImage={card.frontImage}
                backImage={card.backImage}
                isFlipped={flipped[i]}
                isSelected={selectedCardIndex === i}
                onClick={() => onSelect(i)}
              />
              {selectedCardIndex === i && (
                <div className="card-description card-description-mobile">
                  <p>{card.description}</p>
                </div>
              )}
            </div>

          );
        })}
      </div>
  );
}