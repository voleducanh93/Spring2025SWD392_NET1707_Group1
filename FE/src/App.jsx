// import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { router } from "./routers/Routers";

function App() {
  return (
    <div>
    <RouterProvider router={router} fallbackElement={<></>}/></div>
    
  );
}

export default App;
