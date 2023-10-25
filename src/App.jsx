import "./App.css";
import Home from "./components/Home";
import {motion as m} from "framer-motion"

function App() {
  return (
    <m.main
      animate={{
        opacity:[0,1]
      }}
      exit={{
        opacity:[1,0]
      }}
    >
      <Home />
    </m.main>
  );
}

export default App;
