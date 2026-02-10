import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landing from "./componenets/Landing";
import Body from "./componenets/Body";
import Login from "./componenets/Login";
import Otp from "./componenets/Otp";
import axios from "axios";
import useProfile from "./store/User";
import { useEffect } from "react";
import YtNote from "./componenets/YtNote";
import Debounced from "./componenets/Debounced";
import Jobs from "./componenets/Jobs";

const App = () => {
  const userData = useProfile((state) => state.userData);
  const setData = useProfile((state) => state.setData);
  const getProfile = async () => {
    const data = await axios.get("http://localhost:9999/profile", {
      withCredentials: true,
    });
    setData(data.data.data);
  };
  useEffect(() => {
    getProfile();
  }, []);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Body />,
      children: [
        {
          path: "/",
          element: <Landing />,
        },
        {
          path: "/ytnote",
          element: <YtNote />,
        },
        {
          path: "/jobsearch",
          element: <Debounced />,
        },
        {
          path: "/jobsearch/jobs",
          element: <Jobs />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};
export default App;
