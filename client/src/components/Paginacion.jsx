import { useState } from "react"

export const Paginacion = ({pagina, setPagina, maximo}) => {
    const [input, setInput] = useState(1)

    const nextPage = () => {
        setInput (parseInt(input) + 1);
        setPagina (parseInt(pagina) + 1);
    }

    const prevPage = () => {
      const newPage = parseInt(input) - 1;
      if (newPage > 0) {
        setInput(newPage);
        setPagina(newPage);
      } else {
        setInput(1); // Establecer el input en 1 si la página es menor a 1
        setPagina(1); // Establecer la página en 1
      }
    };
    

    const onKeyDown = (e) => {
      if (e.keyCode === 13) {
        let newPage = parseInt(e.target.value);
        if (newPage < 1 || isNaN(newPage)) {
          newPage = 1;
        } else if (newPage > Math.ceil(maximo)) {
          newPage = Math.ceil(maximo);
        }
        setPagina(newPage);
        setInput(newPage);
      }
    };
    
    

      const onChange = e => {
        setInput (e.target.value);
      };

    return(
        <div className="divContenedor">
            <button disabled={pagina === 1 || pagina < 1} onClick={prevPage}>
            <svg width="50px" height="50px" viewBox="-3 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
<g id="icomoon-ignore">
</g>
<path d="M13.114 2.887c-7.243 0-13.114 5.871-13.114 13.113s5.871 13.113 13.114 13.113c7.242 0 13.112-5.871 13.112-13.113s-5.87-13.113-13.112-13.113zM13.114 28.064c-6.653 0-12.065-5.412-12.065-12.064s5.412-12.063 12.065-12.063c6.652 0 12.063 5.412 12.063 12.063s-5.411 12.064-12.063 12.064z" fill="#000000">
</path>
<path d="M12.318 10.363l-0.742-0.742-6.379 6.379 6.379 6.379 0.742-0.742-5.113-5.113h12.726v-1.049h-12.726z" fill="#000000">
</path>
</svg>
            </button>
            <input
            className="input"
            onChange={e => onChange (e)}
            onKeyDown={e => onKeyDown (e)} 
            name="page" autoComplete="off" 
            value={input} />
            <p className="parrafo">Paginas: {Math.ceil(maximo)}</p>
            
            <button disabled={pagina === Math.ceil (maximo) || pagina > Math.ceil (maximo)} onClick={nextPage}>
            <svg width="50px" height="50px" viewBox="-3 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
<g id="icomoon-ignore">
</g>
<path d="M13.11 29.113c7.243 0 13.113-5.871 13.113-13.113s-5.87-13.113-13.113-13.113c-7.242 0-13.113 5.871-13.113 13.113s5.871 13.113 13.113 13.113zM13.11 3.936c6.652 0 12.064 5.412 12.064 12.064s-5.412 12.064-12.064 12.064c-6.653 0-12.064-5.412-12.064-12.064s5.411-12.064 12.064-12.064z" fill="#000000">

</path>
<path d="M13.906 21.637l0.742 0.742 6.378-6.379-6.378-6.379-0.742 0.742 5.112 5.112h-12.727v1.049h12.727z" fill="#000000">

</path>
</svg>
            </button>

        </div>
    )
}