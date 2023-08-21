const StarRating = ({ individualRating }) => {
    const maxRating = 5;

    return (
        <div className="rating">
            {Array.from({ length: maxRating }, (_, index) => (
                <input
                    key={index}
                    type="radio"
                    name="dynamic-rating"
                    className={`mask mask-star-2 ${index < individualRating ? 'bg-orange-400' : 'bg-gray-300'
                        }`}
                    checked={index = individualRating}
                />
            ))}
        </div>
    );
};

export default StarRating;
