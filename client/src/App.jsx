import './App.css'
import Detail from './views/Detail';
import Home from './views/Home';
import Landing from './views/Landing';
import Form from './views/Form';
import {Routes, Route} from "react-router-dom";

function App() {


  return (
    <main>
    <Routes>
    <Route path="/" element={<Landing />} />
    <Route path="/home" element={<Home />} />
    <Route path="/detail/:id" element={<Detail />} />
    <Route path="/form" element={<Form />} />
    </Routes>
    </main>
  )
}

export default App
