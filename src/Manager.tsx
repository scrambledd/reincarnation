import { useState, useRef } from "react"
import { cards as cardData } from "./data/cards"
import { ReincarnateButton } from "./components/ReincarnateButton"
import { DisplayedCards } from "./components/DisplayedCards"

function Manager() {
  const [cards, setCards] = useState(cardData.slice(0, 3));
  const [flipped, setFlipped] = useState([false, false, false]);
  const [isReincarnating, setIsReincarnating] = useState(false);
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);
  const [hasReincarnated, setHasReincarnated] = useState(false);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const getNewCards = () => {
    const newCards = [];
    const usedIndices = new Set();
    const excludedCardNames = new Set();

    while (newCards.length < 3) {
      const randIndex = Math.floor(Math.random() * cardData.length);
      const selectedCard = cardData[randIndex];
      const cardName = selectedCard.frontImage.replace("/images", "").replace(".png", "");

      if (!usedIndices.has(randIndex) && !excludedCardNames.has(cardName)) {
        usedIndices.add(randIndex);
        newCards.push(selectedCard);
        excludedCardNames.add(selectedCard.oppositeCard);
      }
    }

    return newCards;
  }

  const scrollToCard = (index: number) => {
    // Only scroll on mobile
    if (window.innerWidth > 480) return;

    const cardElement = cardRefs.current[index];
    if (cardElement) {
      cardElement.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  const flipCardsSequentially = async () => {
    for (let i = 0; i < 3; i++) {
      // Stop execution for 1.2 seconds
      // setTimeout alone doesn't work because it's non-blocking
      await new Promise((res) => setTimeout(res, 1200));
      // Pass function (current state) to setFlipped to get the latest state
      // React state updates are asynchronous, using 'prev' avoids race conditions
      // Because of the await, react doesn't batch state updates here
      setFlipped((prev) => {
        // Create a copy of the previous state (react state is immutable)
        const updated = [...prev];
        updated[i] = true;
        return updated;
      });
      scrollToCard(i);
    }
  }

  const reincarnate = async () => {
    if (isReincarnating) return;

    setHasReincarnated(true);
    setIsReincarnating(true);
    setSelectedCardIndex(null);
    setFlipped([false, false, false]);

    // Since react batches setFlipped and setCards, add a delay to force re-render
    // so that the cards flip back before changing them
    await new Promise((res) => setTimeout(res, 500));

    const newCards = getNewCards();
    setCards(newCards);

    await flipCardsSequentially();
    setIsReincarnating(false);
  };

  return (
    <>
      <DisplayedCards
        cards={cards}
        flipped={flipped}
        selectedCardIndex={selectedCardIndex}
        onSelect={!isReincarnating && hasReincarnated ? setSelectedCardIndex : () => { }}
        cardRefs={cardRefs}
        isReincarnating={isReincarnating} />

      <ReincarnateButton
        onClick={reincarnate}
        disabled={isReincarnating} />

      {selectedCardIndex !== null && (
        <div className="card-description-desktop">
          <h3>{cards[selectedCardIndex].type}</h3>
          <p>{cards[selectedCardIndex].description}</p>
        </div>
      )}
    </>
  );
}


export default Manager