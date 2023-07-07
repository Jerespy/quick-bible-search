import { useState, useEffect } from "react";
import './App.css'
import SearchIcon from "./search.svg"

import MovieCard from "./MovieCard";


const BIBLE_API_URL = "https://bible-api.com";

const App = () =>{
    const [chapters, setChapters] = useState([]);

    const [searchTerm, setSearchterm] = useState("");

    const searchVerse = async(bookVerse)=>  {
        try{
            const response = await fetch(`${BIBLE_API_URL}/${bookVerse}`);
            if (!response.ok) {
                if (response.status === 404) {
                  throw new Error('404 Not Found');
                } else {
                  throw new Error('An error occurred');
                }
            }

            const data = await response.json();
            setChapters(data);  
            console.log(chapters);
        }catch(error){
            alert("Wrong format entered");
            console.error('Error:', error.message);
        }
        
    }

    useEffect(()=>{
        searchVerse("john John 3:16-17");
    },[]); 

    return (
        <div className="app">
            <h1>Quick Bible Search</h1> 
            <div className="search">
                <input
                    placeholder="Book name and verse John 3:16-17" 
                    type="text"
                    value={searchTerm}
                    onChange={(e)=>{ setSearchterm(e.target.value) }}
                />

                <img 
                    src={SearchIcon}
                    alt="Search"
                    onClick={()=>{ searchVerse(searchTerm) }}
                />
            </div>  
            
            {(Object.keys(chapters).length > 0)  ?

                (<div className="mute">
                    <h2>{ chapters.reference }</h2> 
                    { 
                        chapters.verses.map((chapter)=>(
                            <div key={chapter.verse}>
                                <span className="danger">{chapter.verse}:</span> {chapter.text} 
                            </div>
                        ))
                    }
                </div>)
                :(
                    <div className="empty">
                        <h2>Bible verse not found..</h2>
                    </div>
                )
            }
            <footer id="footer">
                Designed by <a target="_blank" href="https://www.linkedin.com/in/prince-osah">Osah Prince</a>
            </footer>
            
        </div>

        
    )
}

export default App;