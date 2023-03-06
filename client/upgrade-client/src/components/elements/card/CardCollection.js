import "./Card.css";

const CardCollection = ({ children }) => {
    return (
        <div className="cardContainer">
            {children}
        </div>
    );
};

export default CardCollection;
