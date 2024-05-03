
import React, {useState} from "react"
import '../App.css'
import Table from "./SongsTable.jsx"
//import "./Home.css"

function Songs() {
    const [characters, setCharacters] = useState([
        {
          name: "Charlie",
          job: "Janitor"
        },
        {
          name: "Mac",
          job: "Bouncer"
        },
        {
          name: "Dee",
          job: "Aspring actress"
        },
        {
          name: "Dennis",
          job: "Bartender"
        }
    ]);

    return (
        <>
            <div className="App">
                Check out this table!
                <Table 
                    characterData={characters} 
                />
            </div> 
        </>

    )
}

export default Songs;