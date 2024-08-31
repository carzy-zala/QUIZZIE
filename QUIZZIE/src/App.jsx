import {  RouterProvider } from "react-router-dom";

import {router} from "./Routes/index"

function App() {
  return <RouterProvider router={router} />;
}

export default App;
