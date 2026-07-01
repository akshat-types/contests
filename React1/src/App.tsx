import { APITester } from "./APITester";
import "./index.css";
import logo from "./logo.svg";
import reactLogo from "./react.svg";
import Navbar from "./components/Navbar";
import { useState } from "react";

export function App() {
      let [count,setCount] = useState(0);
      function increment(){
        setCount(c => c+1);
      };
      function decrement(){
        setCount(c => c-1);
      };


  return (
    <div className="app">
      {count}
      <button onClick={increment}>Increase Count</button>
      <button onClick={decrement}>Decrease Count</button>
    </div>
  );
}

export default App;
