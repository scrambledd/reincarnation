import { Card } from './Card';  

type CardData = {
  frontImage: string;
  backImage: string;
}

type DisplayedCardsProps = {
  cards: CardData[];
  flipped: boolean[];
}


export function DisplayedCards({cards, flipped}: DisplayedCardsProps) {
  return (
    <div className="cards-container">
      {cards.map((card, i) => {
        return (
          <Card
          key={i}
          frontImage={card.frontImage}
          backImage={card.backImage}
          flipped={flipped[i]} 
          />
        );
      })}
      
    </div>
  );
}