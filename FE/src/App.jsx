// import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { router } from "./routers/Routers";
import { Provider } from "react-redux";
import { store } from "./app/store";

function App() {
  return (
  <Provider store={store}>
    <RouterProvider router={router} fallbackElement={<></>}/>
  </Provider>
  );
}

export default App;
