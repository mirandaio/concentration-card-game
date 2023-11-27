const Card = ({ card, onClick, index }) => {
  return <div className="card" onClick={() => onClick(index)}>{card.isFaceUp ? card.image : "X"}</div>;
};

 export default Card;
