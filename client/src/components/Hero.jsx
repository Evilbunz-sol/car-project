import { RecommendationForm } from "./RecommendationForm";

export const Hero = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24 items-center">
      <div className="lg:mb-12">
        <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl">
          Find Your Perfect Car.
        </h1>

        <p className="mt-8 max-w-xl text-lg leading-8">
          We help first-time car buyers find the perfect vehicle tailored to their needs and preferences.
        </p>
      </div>

      <div>
        <RecommendationForm />
      </div>
    </div>
  );
};
