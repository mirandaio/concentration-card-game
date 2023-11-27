import { useState } from "react";
import randomEmoji from "generate-random-emoji";
import Card from "./Card";

const UNIQUE_EMOJI_COUNT = 4;

const shuffleCards = (cards: object[]) => {
  let cardHolder;

  for (let i = 0; i < cards.length; i++) {
    const currentLength = cards.length - i; // i = 1, currentLength = 7
    const randomIndex = i + Math.floor(Math.random() * currentLength);
    cardHolder = cards[i];
    cards[i] = cards[randomIndex];
    cards[randomIndex] = cardHolder;
  }

  return cards;
};

const getCards = () => {
  const uniqueEmojis = randomEmoji.generateEmojis(UNIQUE_EMOJI_COUNT);
  const cards = uniqueEmojis.flatMap((emoji) => [
    { ...emoji, id: crypto.randomUUID(), isFaceUp: false },
    { ...emoji, id: crypto.randomUUID(), isFaceUp: false },
  ]);
  shuffleCards(cards);
  return cards;
};

function App() {
  const [cards, setCards] = useState(() => getCards());
  const [currentCard, setCurrentCard] = useState();

  const startNewGame = () => {
    setCards(getCards());
  };

  const handleCardClick = (clickedCard) => {
    if (!currentCard) {
      setCurrentCard(clickedCard);
      setCards((cards) => {
        const newCards = cards.map((card) => {
          return card.id === clickedCard.id
            ? { ...card, isFaceUp: true }
            : card;
        });
        return newCards;
      });
    } else {
      setCards((cards) => {
        const newCards = cards.map((card) => {
          return card.id === clickedCard.id
            ? { ...card, isFaceUp: true }
            : card;
        });
        return newCards;
      });
      if (currentCard.image !== clickedCard.image) {
        setTimeout(() => {
          setCards((cards) => {
            const newCards = cards.map((card) => {
              return card.id === currentCard.id || card.id === clickedCard.id
                ? { ...card, isFaceUp: false }
                : card;
            });
            return newCards;
          });
          setCurrentCard(null);
        }, 2000);
      } else {
        setCurrentCard(null);
      }
    }
  };

  return (
    <>
      <h1>Concentration Card Game</h1>
      <main>
        <div className="card-container">
          {cards.map((card, i) => {
            return <Card key={i} card={card} onClick={handleCardClick} />;
          })}
        </div>
        <button className="new-game" onClick={startNewGame}>
          Start new game!
        </button>
      </main>
    </>
  );
}

export default App;
