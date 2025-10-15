import { useState } from "react"
import { cards as cardData } from "./data/cards"
import { ReincarnateButton } from "./ReincarnateButton"
import { DisplayedCards } from "./DisplayedCards"

// keep state in the lowest common ancestor of all components that need it

function Manager() {
  const [cards, setCards] = useState(cardData.slice(0, 3));
  const [flipped, setFlipped] = useState([false, false, false]);
  const [isReincarnating, setIsReincarnating] = useState(false);

  const reincarnate = async () => {
    if (isReincarnating) return;

    setIsReincarnating(true);
    
    const newCards = Array.from({ length: 3 }, () => {
      const randIndex = Math.floor(Math.random() * cardData.length);
      return cardData[randIndex];
    });

    setCards(newCards);
    setFlipped([false, false, false]);

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
      <DisplayedCards cards={cards} flipped={flipped} />
      <ReincarnateButton onClick={reincarnate} disabled={isReincarnating} />
    </>
  );
}


export default Manager