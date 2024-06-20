import { useRef, useState, useEffect } from "react";
import "./carousel.css";

const testimonialData = [
  {
    text: "This is the best service I have ever used!",
    image:
      "https://images.pexels.com/photos/26077133/pexels-photo-26077133/free-photo-of-herd-of-antelopes-in-nature.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    text: "Amazing experience, highly recommend!",
    image:
      "https://images.pexels.com/photos/26077133/pexels-photo-26077133/free-photo-of-herd-of-antelopes-in-nature.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    text: "A wonderful journey from start to finish.",
    image:
      "https://images.pexels.com/photos/26077133/pexels-photo-26077133/free-photo-of-herd-of-antelopes-in-nature.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    text: "Exceptional quality and customer service.",
    image:
      "https://images.pexels.com/photos/26077133/pexels-photo-26077133/free-photo-of-herd-of-antelopes-in-nature.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    text: "I will definitely be coming back!",
    image:
      "https://images.pexels.com/photos/26077133/pexels-photo-26077133/free-photo-of-herd-of-antelopes-in-nature.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    text: "Top-notch service and friendly staff.",
    image:
      "https://images.pexels.com/photos/26077133/pexels-photo-26077133/free-photo-of-herd-of-antelopes-in-nature.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];

export default function Carousel() {
  const carouselRef = useRef<HTMLUListElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalCards = 6;

  const scrollToIndex = (index: number) => {
    if (carouselRef.current) {
      const card = carouselRef.current.querySelectorAll(".card")[index];
      if (card) {
        card.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
        setCurrentIndex(index);
      }
    }
  };

  useEffect(() => {
    scrollToIndex(0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="relative max-w-4xl overflow-hidden border-2 rounded-md border-red-500 py-4">
        <ul
          ref={carouselRef}
          className="flex overflow-x-auto border-2 scrollbar-hide border-blue-500"
          style={{
            scrollSnapType: "x mandatory",
            padding: "30px calc(50% - 128px)",
          }}
        >
          {testimonialData.map((testimonial, index) => (
            <li key={index}>
              <article>
                <div
                  className={`relative card h-[400px] w-[500px] rounded-xl shadow-md flex-shrink-0 mx-3.5 transition-all duration-300 ${
                    currentIndex === index ? "active" : "inactive"
                  }`}
                  style={{
                    scrollSnapAlign: "center",
                  }}
                >
                  <img
                    src={testimonial.image}
                    alt="testimonial"
                    className="absolute top-0 left-0 w-full h-full -z-10 rounded-xl"
                  />
                  <div className="w-full h-full backdrop-blur-sm flex items-center justify-center border-2 border-neutral-200 rounded-xl flex-col">
                    <h2 className="text-xl font-bold mb-2 text-white">
                      {testimonial.text}
                    </h2>
                    <p className="text-neutral-300">
                      This is a description for card {index + 1}.
                    </p>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
        <div className="flex justify-center mt-4">
          {Array.from({ length: totalCards }).map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={`h-2 w-2 rounded-full mx-1 ${
                currentIndex === index ? "bg-gray-800" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
