import React, { useEffect, useState } from 'react';
import axios from "./axios";
import './App.css';

export function App() {
    const [data, setData] = useState("");

    useEffect(() => {
        (async () => {
            try {
                let { data }  = await axios.get("/api/test");
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