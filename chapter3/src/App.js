import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import axios from "axios";
function App() {
  // const name_foobar = "Hello React!";

  const [name, setName] = useState("");
  const [data, setData] = useState([]);

  function onTrigger1() {
    return setName("Yes!");
  }
  function onTrigger2() {
    axios.get("http://localhost:3010/members").then((res) => {
      setData(res.data);
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{name}</p>
        {data.map((v) => (
          <div>
            {v._id} {v.name} {v.country}
          </div>
        ))}
        <button onClick={onTrigger1}>Trigger 1</button>
        <button onClick={onTrigger2}>Trigger 2</button>
      </header>
    </div>
  );
}

export default App;
