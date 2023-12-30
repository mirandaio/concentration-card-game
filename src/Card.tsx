import { CardType } from './GameTypes';

const Card = ({ card, onClick } : { card: CardType, onClick: Function}) => {
  return (
    <div className="card" onClick={() => onClick(card)}>
      {card.isEmojiUp ? card.image : "X"}
    </div>
  );
};

export default Card;
