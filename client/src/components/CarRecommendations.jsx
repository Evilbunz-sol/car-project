import { useSelector } from "react-redux"
import { SectionTitle } from "./SectionTitle"
import { CarList } from "./CarList"


export const CarRecommendations = () => {
  const cars = useSelector((state) => state.carState.cars)

  return cars.length > 0 ? (
    <div className="pt-24">
        <SectionTitle text="Your Recommendations" />
        <CarList cars={cars} />
    </div>
    ) : null
}

  

