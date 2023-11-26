const Card = ({ card }) => {
  return <div className="card">{card.faceUp ? card.image : "X"}</div>;
};

export default Card;
