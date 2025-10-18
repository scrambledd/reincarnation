import { Card } from './Card';  

type CardData = {
  frontImage: string;
  backImage: string;
}

type DisplayedCardsProps = {
  cards: CardData[];
  flipped: boolean[];
  selectedCardIndex: number | null;
  onSelect: (index: number | null) => void;
}


export function DisplayedCards({cards, flipped, selectedCardIndex, onSelect}: DisplayedCardsProps) {
  
  return (
    <div className="cards-container">
      {cards.map((card, i) => {
        return (
          <Card
          key={i}
          frontImage={card.frontImage}
          backImage={card.backImage}
          isFlipped={flipped[i]} 
          isSelected={selectedCardIndex === i}
          onClick={() => onSelect(i)}
          />
        );
      })}
      
    </div>
  );
}