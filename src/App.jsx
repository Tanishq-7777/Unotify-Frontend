import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landing from "./componenets/Landing";
import Body from "./componenets/Body";
import axios from "axios";
import useProfile from "./store/User";
import { useEffect, useState } from "react";
import YtNote from "./componenets/YtNote";
import Debounced from "./componenets/Debounced";
import Jobs from "./componenets/Jobs";
import Premium from "./componenets/Premium";
import { BASE_URL } from "./constants";

const App = () => {
  const setData = useProfile((state) => state.setData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await axios.get(BASE_URL + "/profile", {
          withCredentials: true,
        });
        setData(res.data.data);
      } catch {
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    getProfile();
  }, []);

  if (loading) return <h1>Render COld Start (Satrting Backend Server.....)</h1>;

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Body />,
      children: [
        { path: "/", element: <Landing /> },
        { path: "/ytnote", element: <YtNote /> },
        { path: "/jobsearch", element: <Debounced /> },
        { path: "/jobsearch/jobs", element: <Jobs /> },
        { path: "/premium", element: <Premium /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
