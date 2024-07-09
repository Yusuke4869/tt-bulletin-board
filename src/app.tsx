import "destyle.css";
import { StrictMode } from "react";
import "~/styles/global.scss";

import Router from "./routes";

const App = () => (
  <StrictMode>
    <Router />
  </StrictMode>
);

export default App;
