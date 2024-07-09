import { StrictMode } from "react";
import "~/styles/global.css";

import Router from "./routes";

const App = () => (
  <StrictMode>
    <Router />
  </StrictMode>
);

export default App;
