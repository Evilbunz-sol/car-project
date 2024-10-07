import { useState } from "react";
import { customFetch } from "../utils";
import { setRecommendations } from "../features/car/carSlice";
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";

const url = "/recommend";

export const RecommendationForm = () => {
  const [userInput, setUserInput] = useState("")
  const dispatch = useDispatch()

  const mutation = useMutation({
    mutationFn: (input) => customFetch.post(url, { userInput: input }),
    onSuccess: (data) => {
      dispatch(setRecommendations(data.data.recommendations));
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInput) {mutation.mutate(userInput)}
  }


  return (
    <form onSubmit={handleSubmit}
      className="flex flex-col justify-center items-center w-full h-full"
    >
      <div className="form-control w-full">
        <textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          className=" textarea h-[12rem] lg:h-[24rem] w-full p-4 rounded-box resize-none bg-neutral"
          placeholder="e.g., I need a family-friendly SUV with good fuel efficiency, under $30,000"
          name="userInput"
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary mt-8"
        disabled={mutation.isLoading}
      >
        {mutation.isLoading ? "Getting Recommendations..." : "Get Recommendations"}
      </button>
    </form>
  )
}



