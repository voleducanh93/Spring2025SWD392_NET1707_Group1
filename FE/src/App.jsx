import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import Routers from "./routers/Routers";
function App() {
  return (
    <Provider>
      <RouterProvider router={<Routers />} fallbackElement={<></>} />
    </Provider>
  );
}

export default App;
