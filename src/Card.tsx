const Card = ({ card, onClick }) => {
  return (
    <div className="card" onClick={() => onClick(card)}>
      {card.isEmojiUp ? card.image : "X"}
    </div>
  );
};

export default Card;
