// import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { router } from "./routers/Routers";

function App() {
  return <RouterProvider router={router} fallbackElement={<></>} />;
}

export default App;
