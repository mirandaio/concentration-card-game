const Card = ({ card, onClick }) => {
  return (
    <div className="card" onClick={() => onClick(card)}>
      {card.isFaceUp ? card.image : "X"}
    </div>
  );
};

export default Card;
