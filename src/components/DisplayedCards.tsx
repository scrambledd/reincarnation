import { Card } from './Card';
import { forwardRef } from 'react';

type CardData = {
  frontImage: string;
  backImage: string;
  description: string;
  type: string;
}

type DisplayedCardsProps = {
  cards: CardData[];
  flipped: boolean[];
  selectedCardIndex: number | null;
  onSelect: (index: number | null) => void;
  cardRefs: React.RefObject<(HTMLDivElement | null)[]>;
  isReincarnating: boolean;
}


export const DisplayedCards = forwardRef<HTMLDivElement, DisplayedCardsProps>(
  function DisplayedCards({ cards, flipped, selectedCardIndex, onSelect, cardRefs, isReincarnating }, ref) {

    return (
      <div className="cards-container" ref={ref}>
        {cards.map((card, i) => {
          return (
            <div
              key={i}
              className="card-wrapper"
              ref={(el) => {
                if (cardRefs.current) {
                  cardRefs.current[i] = el;
                }
              }}
            >
              <Card
                frontImage={card.frontImage}
                backImage={card.backImage}
                isFlipped={flipped[i]}
                isSelected={selectedCardIndex === i}
                onClick={() => onSelect(i)}
                isReincarnating={isReincarnating}
              />
              {selectedCardIndex === i && (
                <div className="card-description-mobile">
                  <h3>{cards[selectedCardIndex].type}</h3>
                  <p>{card.description}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  });