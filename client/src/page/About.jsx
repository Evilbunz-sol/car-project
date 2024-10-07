export const About = () => {
  return (
    <>
      <div className="flex flex-wrap gap-2 sm:gap-x-6 items-center justify-center">
        <h1 className="text-4xl font-bold leading-none tracking-tight sm:text-6xl"> Welcome To </h1>
        <div className="stats bg-primary shadow">
          <div className="stat">
            <div className="stat-title text-primary-content text-4xl font-bold tracking-widest">
              CarMatch
            </div>
          </div>
        </div>
      </div>
      <p className="mt-6 text-lg leading-8 max-w-2xl mx-auto">
          CarMatch, your trusted companion on the journey to finding your perfect car. 
          We understand that buying a car—especially for the first time—can be overwhelming with so many options 
          and considerations. That's why we're here to simplify the process and make your car-buying experience 
          enjoyable and stress-free.
      </p>
    </>
  )
}