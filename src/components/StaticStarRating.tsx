import { Star } from 'lucide-react'

interface StaticStarRatingProps {
  rating: number
}

export function StaticStarRating({ rating }: StaticStarRatingProps) {
  return (
    <div className="flex" aria-label={`Avaliação: ${rating} de 5 estrelas`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-5 h-5 ${
            star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  )
}

