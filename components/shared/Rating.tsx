import { FC, useEffect, useState } from "react";

interface RatingProps {
	rating: number;
}

export const Rating: FC<RatingProps> = ({ rating }) => {
	const [stars, setStars] = useState<JSX.Element[]>([]);

	useEffect(() => {
		for (let i = 0; i <= 5; i++) {
			if (i == rating + 1) {
				setStars((stars) => [
					...stars,
					<input key={i} type="radio" name={`rating-${i}`} className="mask mask-star" checked />,
				]);

				continue;
			}

			setStars((stars) => [
				...stars,
				<input key={i} type="radio" name={`rating-${i}`} className="mask mask-star" />,
			]);
		}
	}, [rating]);

	return <div className="rating">{stars.map((star) => star)}</div>;
};
