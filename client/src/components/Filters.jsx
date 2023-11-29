import { useDispatch, useSelector } from "react-redux";
import { orderCards, filterByGenres, filterAlphabetically, filterVideogamesFromDb, resetFilter } from "../redux/actions";
import "./Filters.css"

function Filters() {
  const dispatch = useDispatch();
  const allGenres = useSelector((state) => state.allGenres);

  const handleOrder = (event) => {
    dispatch(orderCards(event.target.value));
  };

  const handlefilterByGenres = (event) => {
    dispatch(filterByGenres(event.target.value));
  };

  const handleAlphabeticalFilter = (event) => {
    const filterValue = event.target.value;
    dispatch(filterAlphabetically(filterValue));
  };

  const handleFilterDb = (event) => {
    dispatch(filterVideogamesFromDb(event.target.value));
  };

  const handleResetFilter = () => {
    dispatch(resetFilter());
  };

  return (
    <div className="divFilters">
      <select className="select" onChange={handleFilterDb}>
        <option className="option"  value="api">API</option>
        <option className="option"  value="db">Juegos creados</option>
      </select>

      <select className="select" onChange={handleAlphabeticalFilter}>
        <option className="option" value="abc">A-Z</option>
        <option className="option" value="xyz">Z-A</option>
      </select>

      <select className="select" onChange={handleOrder}>
        <option className="option" value="upwards">De arriba para abajo</option>
        <option className="option" value="downwards">De abajo para arriba</option>
        <option className="option" value="ratingAsc">Por Rating Ascendente</option>
        <option className="option" value="ratingDesc">Por Rating Descendente</option>
      </select>

      <select className="select" onChange={handlefilterByGenres}>
        <option className="option" value="All">All</option>
        {allGenres.map((genre, index) => {
          return <option className="option" key={index} value={index}>{genre}</option>;
        })}
      </select>
      
      <button className="select" onClick={handleResetFilter}>Reset de filtros</button>
    </div>
  );
}

export default Filters;
