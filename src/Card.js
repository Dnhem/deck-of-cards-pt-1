const Card = ({ src, id, alt }) => {
  return <img src={src} id={id} alt={alt} key={id} />;
};

export default Card;
