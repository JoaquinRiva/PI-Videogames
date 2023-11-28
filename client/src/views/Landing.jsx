import { Link } from "react-router-dom";
import "./Landing.css"

function Landing () {
    return(
        <div>
            <h1>Games🎮</h1>
            <Link to="/home">Home</Link>
            
            <div>
                <a href="https://github.com/JoaquinRiva" target="_blank" rel="noopener noreferrer">
                    <button className="button">BOTON</button>
                </a>
            </div>
        </div>
    )
}

export default Landing;