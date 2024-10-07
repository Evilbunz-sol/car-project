import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Error, HomeLayout, About, Landing, CarDetails } from "./page"
import { ErrorElement } from "./components"

// Loaders
import { loader as carDetailsLoader } from "./page/CarDetails"

// Actions


// Redux Toolkit
import { store } from "./store"

// React Query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5
    }
  }
})

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
        errorElement: <ErrorElement />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "cars/:id",
        element: <CarDetails />,
        errorElement: <ErrorElement />,
        loader: carDetailsLoader(queryClient),
      },
    ]
  },
  // {
  //   path: "/login",
  //   element: <Login />,
  //   errorElement: <Error />,
  //   action: loginAction(store),
  // },
  // {
  //   path: "/register",
  //   element: <Register />,
  //   errorElement: <Error />,
  //   action: registerAction,
  // },
])

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App









  

  
