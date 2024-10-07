import { Link } from "react-router-dom";
import { formatPrice } from "../utils";

export const CarList = ({ cars }) => {
  return (
    <div className="pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {cars.map((car) => {
        const { id, image_urls, make, model, year, base_msrp } = car;
        const dollarsAmount = formatPrice(base_msrp);

        return (
          <div key={id} className="card w-full shadow-xl hover:shadow-2xl transition duration-300">
            <figure className="px-4 pt-4">
              <img
                src={image_urls[0]}
                alt={`${make} ${model}`}
                className="rounded-xl h-64 md:h-48 w-full object-cover"
              />
            </figure>

            <div className="card-body">
              <h2 className="card-title tracking-wider capitalize"> {year} {make} {model} </h2>
              <p className="text-secondary font-medium">{dollarsAmount}</p>

              <div className="card-actions justify-start mt-2">
                <Link to={`/cars/${id}`} className="btn btn-primary">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
