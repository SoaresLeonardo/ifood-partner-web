import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons";

export const StarRate = ({ rating }: { rating: number }) => {
  const roundedRating = Math.round(rating);

  const stars = [];

  for (let i = 0; i < 5; i++) {
    if (i < roundedRating) {
      stars.push(<StarFilledIcon key={i} />); // Estrela preenchida
    } else {
      stars.push(<StarIcon key={i} />); // Estrela vazia
    }
  }

  return <div className="flex items-center absolute right-3">{stars}</div>;
};
