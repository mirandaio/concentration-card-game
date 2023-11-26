const Card = ({ card }) => {
  return <div className="card" >{card.isFaceUp ? card.image : "X"}</div>;
};

 export default Card;
