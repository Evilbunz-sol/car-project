import { useLoaderData, Link } from "react-router-dom"
import { customFetch, formatPrice } from "../utils"

const singleCarQuery = (id) => {
  return {
    queryKey: ["singleCar", id],
    queryFn: () => customFetch(`/cars/${id}`)
  }
}

export const loader = (queryClient) => async({params}) => {
  const response = await queryClient.ensureQueryData(singleCarQuery(params.id))
  const car = response.data.car
  return {car}
}

export const CarDetails = () => {
  const { car } = useLoaderData()
  const dollarsAmount = formatPrice(car.base_msrp)

  return (
    <section>
      {/* BREADCRUMB */}
      <div className="text-md breadcrumbs">
        <ul>
          <li> <Link to='/'> Home </Link> </li>
        </ul>
      </div>

      {/* CAR Details */}
      <div className='mt-6 grid gap-y-8 lg:grid-cols-2  lg:gap-x-16'>
        {/* IMAGE */}
        <img 
          src={car.image_urls[0]} 
          alt={`${car.make} ${car.model}`} 
          className="w-96 h-96 object-cover rounded-lg lg:w-full"
        />

        {/* CAR INFO */}
        <div>
          <h1 className="capitalize text-3xl font-bold"> {car.make} {car.model} ({car.year}) </h1>
          <p className="mt-3 text-xl"> {dollarsAmount} </p>
          {/* <h4 className="text-xl text-neutral-content font-bold mt-2"> {company} </h4> */}
          <p className="mt-6 leading-8"> Body Type: {car.body_type} </p>
          <p className="mt-6 leading-8"> Trim: {car.trim} </p>
          <p className="mt-6 leading-8"> Description: {car.trim_description} </p>
        </div>
      </div>
    </section>
  )
}