import "./Card.css";

const Card = ({title, info, spanX, spanY}) => {
    return (
        <div style={{ gridColumn: `span ${spanX}`, gridRow: `span ${spanY}` }}className="card">
            <h2>{title}</h2>
            <p>{info}</p>
        </div>
    );
};

export default Card;