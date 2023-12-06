const Rating = ({ rate }) => {
    const totalStars = 5;
    let stars = [];
    for (let i = 1; i <= totalStars; i++) {
        stars.push(
            <span key={i} className="star">
                {i <= rate ? '★' : '☆'}
            </span>
        );
    }
    return <div className="rating">{stars}</div>;
};

export default Rating;
