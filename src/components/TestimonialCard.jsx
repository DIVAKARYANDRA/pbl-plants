import { StarRating } from "./UI";

export default function TestimonialCard({ testimonial }) {
  return (
    <div className="card-surface rounded-xl2 p-6 sm:p-7 flex flex-col gap-4 h-full">
      <StarRating rating={testimonial.rating} />
      <p className="font-display text-lg text-forest-800 leading-relaxed">&ldquo;{testimonial.text}&rdquo;</p>
      <div className="flex items-center gap-3 mt-auto pt-2">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-11 h-11 rounded-full object-cover border-2 border-gold-400"
        />
        <div>
          <p className="font-semibold text-forest-800 text-sm">{testimonial.name}</p>
          <p className="text-xs text-forest-700/50">{testimonial.location}</p>
        </div>
      </div>
    </div>
  );
}
