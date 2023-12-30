import { useState, useEffect } from "react";
import randomEmoji from "generate-random-emoji";
import Card from "./Card";
import { CardType } from './GameTypes';

const UNIQUE_EMOJI_COUNT = 4;

type Emoji = {
  category: string,
  code: string,
  image: string,
  name: string
};

const shuffleCards = (cards: object[]) => {
  let cardHolder;

  for (let i = 0; i < cards.length; i++) {
    const currentLength = cards.length - i;
    const randomIndex = i + Math.floor(Math.random() * currentLength);
    cardHolder = cards[i];
    cards[i] = cards[randomIndex];
    cards[randomIndex] = cardHolder;
  }

  return cards;
};

const getCards = (): CardType[] => {
  const uniqueEmojis = randomEmoji.generateEmojis(UNIQUE_EMOJI_COUNT);
  const cards = uniqueEmojis.flatMap((emoji: Emoji) => [
    { ...emoji, id: crypto.randomUUID(), isEmojiUp: false },
    { ...emoji, id: crypto.randomUUID(), isEmojiUp: false },
  ]);
  shuffleCards(cards);
  return cards;
};

function App() {
  const [cards, setCards] = useState(() => getCards());
  const [firstCard, setFirstCard] = useState<CardType | null>();
  const [secondCard, setSecondCard] = useState<CardType | null>();
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    if (firstCard && secondCard) {
      if (firstCard.image !== secondCard.image) {
        setTimeout(() => {
          setCards((cards) => {
            const newCards = cards.map((card) => {
              return card.id === firstCard.id || card.id === secondCard.id
                ? { ...card, isEmojiUp: false }
                : card;
            });

            return newCards;
          });
          setFirstCard(null);
          setSecondCard(null);
        }, 2000);
      } else {
        setFirstCard(null);
        setSecondCard(null);
        setIsGameOver(cards.every(({ isEmojiUp }) => isEmojiUp));
      }
    }
  }, [firstCard, secondCard, cards]);

  const startNewGame = () => {
    setCards(getCards());
    setIsGameOver(false);
  };

  const handleCardClick = (clickedCard: CardType) => {
    if (clickedCard.isEmojiUp) return;
    if (firstCard && secondCard) return;

    setCards((cards) => {
      const newCards = cards.map((card) => {
        return card.id === clickedCard.id ? { ...card, isEmojiUp: true } : card;
      });
      return newCards;
    });

    if (!firstCard) {
      setFirstCard(clickedCard);
    } else {
      setSecondCard(clickedCard);
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
        {isGameOver ? (
          <button className="new-game" onClick={startNewGame}>
            Start new game!
          </button>
        ) : null}
      </main>
    </>
  );
}

export default App;
