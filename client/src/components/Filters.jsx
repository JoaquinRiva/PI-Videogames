import { useDispatch, useSelector } from "react-redux";
import { orderCards, filterByGenres, filterAlphabetically, filterVideogamesFromDb, resetFilter} from "../redux/actions"
function Filters() {
    const dispatch = useDispatch()
    const allGenres = useSelector(state=> state.allGenres)

    const handleOrder = (event)=>{
        dispatch(orderCards(event.target.value))
    }

    const handlefilterByGenres = (event)=>{
        console.log(event.target.value)
        dispatch(filterByGenres(event.target.value))
    }

    const handleAlphabeticalFilter = (event) => {
        const filterValue = event.target.value; 
        dispatch(filterAlphabetically(filterValue));
      };

    const handleFilterDb = (event)=>{
      console.log(event.target.value)
      dispatch(filterVideogamesFromDb(event.target.value))
    }
    const handleResetFilter = ()=>{
      dispatch(resetFilter())
  }
  return (
    <div>
      <select onChange={handleFilterDb}>
        <option value="api">API</option>
        <option value="db">Juegos creados</option>
      </select>

      <select onChange={handleAlphabeticalFilter}>
        <option value="abc">A-Z</option>
        <option value="xyz">Z-A</option>
      </select>

      <select onChange={handleOrder}>
        <option value="upwards">De arriba para abajo</option>
        <option value="downwards">De abajo para arriba</option>

      </select>

      <select onChange={handlefilterByGenres}>
                <option value="All">All</option>
           {allGenres.map((temperament, index)=>{
            return <option key={index} value={index}>{temperament}</option>
           })}
           </select>
           <button onClick={handleResetFilter}>reset filters</button>

    </div>
  );
}

export default Filters;