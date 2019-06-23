import React, {useEffect, useState} from 'react';
import './App.css';
import axios from './axios';

function App() {
    const [data, setData] = useState("");

    useEffect(() => {
        console.log("hi");
        (async () => {
            try {
                let { data }  = await axios.get("/test");
                console.log("data",data);
                setData(data);
            } catch(err) {
                console.log("err", err);
            }
        })();
    });

  return (
    <div className="App">
      <header className="App-header">
      Hi there
        <p> {data} </p>
      </header>
    </div>
  );
}

export default App;
