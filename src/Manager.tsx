import { useState } from "react"
import { cards as cardData } from "./data/cards"
import { ReincarnateButton } from "./ReincarnateButton"
import { DisplayedCards } from "./DisplayedCards"

// keep state in the lowest common ancestor of all components that need it

function Manager() {
  const [cards, setCards] = useState(cardData.slice(0, 3));
  const [flipped, setFlipped] = useState([false, false, false]);
  const [isReincarnating, setIsReincarnating] = useState(false);
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);
  const [hasReincarnated, setHasReincarnated] = useState(false);
  
  const reincarnate = async () => {
    if (isReincarnating) return;

    setHasReincarnated(true);
    setIsReincarnating(true);
    
    setFlipped([false, false, false]);
    // since react batches setFlipped and setCards, add a delay to force re-render
    // so that the cards flip back before changing them 
    await new Promise((res) => setTimeout(res, 500));

    const newCards = [];
    const usedIndices = new Set();
    const excludedCardNames = new Set();
    
    while (newCards.length < 3) {
      const randIndex = Math.floor(Math.random() * cardData.length);
      const selectedCard = cardData[randIndex];
      const cardName = selectedCard.frontImage.replace("/", "").replace(".png", ""); 
      
      if (!usedIndices.has(randIndex) && !excludedCardNames.has(cardName)) {
        usedIndices.add(randIndex);
        newCards.push(selectedCard);
        excludedCardNames.add(selectedCard.oppositeCard);
      }

}

    setCards(newCards);
    setSelectedCardIndex(null);

    for (let i = 0; i < 3; i++) {
      // stop execution for 1 second
      // promise resolves with undefined
      // setTimeout alone doesn't work because it's non-blocking
      await new Promise((res) => setTimeout(res, 1000));
      // pass function (current state) to setFlipped to get the latest state
      // react state updates are asynchronous, using 'prev' avoids race conditions
      // because of the await, react does not batch the state updates here
      // react re-renders between iterations
      setFlipped((prev) => {
        // create a copy of the previous state (react state is immutable)
        const updated = [...prev];
        updated[i] = true;
        return updated;
      });
    }

    setIsReincarnating(false); 
  
  };

  return (
    <>
      <DisplayedCards
      cards={cards}
      flipped={flipped}
      selectedCardIndex={selectedCardIndex}
      onSelect={!isReincarnating && hasReincarnated ? setSelectedCardIndex : () => {}} />

      <ReincarnateButton
      onClick={reincarnate}
      disabled={isReincarnating} />

      {selectedCardIndex !== null && (
        <div className="card-description-desktop">
          <p>{cards[selectedCardIndex].description}</p>
        </div>
      )}
    </>
  );
}


export default Manager