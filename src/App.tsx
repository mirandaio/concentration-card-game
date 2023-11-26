import { useState } from 'react';
import randomEmoji from 'generate-random-emoji';
import Card from './Card';

const UNIQUE_EMOJI_COUNT = 4

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

const getCards = (uniqueEmojis: object[]) => {
  const emojiCards = [...uniqueEmojis, ...uniqueEmojis];
  shuffleCards(emojiCards);
  return emojiCards;
}

function App() {
  const [uniqueEmojis, setUniqueEmojis] = useState(() => randomEmoji.generateEmojis(UNIQUE_EMOJI_COUNT));

  const startNewGame = () => {
    setUniqueEmojis(randomEmoji.generateEmojis(UNIQUE_EMOJI_COUNT));
  };

  const cards = getCards(uniqueEmojis);

  return (
    <>
      <h1>Concentration Card Game</h1>
      <main>
        <div className="card-container">
          {cards.map((card, i) => {
            return <Card key={i} card={card}/>
          })}
        </div>
        <button className="new-game" onClick={startNewGame}>Start new game!</button>
      </main>
    </>
  )
}

export default App
