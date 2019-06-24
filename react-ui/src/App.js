import React, { useEffect, useState } from 'react';
import axios from "./axios";

export function App() {
    const [data, setData] = useState("");

    useEffect(() => {
        (async () => {
            try {
                let { data }  = await axios.get("/api/getInitialCookie");
                setData(data);
            } catch(err) {
                console.log("err", err);
            }
        })();
    });

    return (
      <div className="App">
        <header className="App-header">
        Inside the app
          <p> {data} </p>
        </header>
      </div>
    );


}
