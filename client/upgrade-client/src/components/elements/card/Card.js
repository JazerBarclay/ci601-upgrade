import "./Card.css";

const Card = ({title, info}) => {
    return (
        <div className="card">
            <h2>{title}</h2>
            <p>{info}</p>
        </div>
    );
};

export default Card;