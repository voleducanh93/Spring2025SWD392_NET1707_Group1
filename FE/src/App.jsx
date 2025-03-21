// import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { router } from "./routers/Routers";
import { SpeedInsights } from '@vercel/speed-insights/react';

function App() {
  return (
    <div><SpeedInsights />
    <RouterProvider router={router} fallbackElement={<></>}/></div>
    
  );
}

export default App;
