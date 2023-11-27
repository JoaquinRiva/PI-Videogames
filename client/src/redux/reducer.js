import {
    GET_VIDEOGAMES,
    GET_VIDEOGAMES_BY_NAME,
    GET_ALL_GENRES,
    GET_VIDEOGAMES_FROM_DB,
    ORDER,
    FILTER_ALPHABETICALLY,
    FILTER_BY_GENRES,
    RESET_FILTER
  } from "./action-types";
  
  const initialState = {
    videogames: [],
    allVideogames: [],
    videogamesOrigin: "All",
    allGenres: [],
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_VIDEOGAMES:
        return {
          ...state,
          videogames: action.payload,
          allVideogames: action.payload,
        };
      case GET_VIDEOGAMES_BY_NAME:
        return {
          ...state,
          videogames: action.payload,
        };
  
      case GET_ALL_GENRES:
        return {
          ...state,
          allGenres: action.payload,
        };
  
      case ORDER:
        let orderedVideogames;
        if (action.payload === "upwards") {
          orderedVideogames = state.videogames.sort((a, b) => (a.id > b.id ? 1 : -1));
        }
  
        if (action.payload === "downwards") {
          orderedVideogames = state.videogames.sort((a, b) => (b.id > a.id ? 1 : -1));
        }
        // Handle other cases for ordering if needed
  
        return {
          ...state,
          videogames: [...orderedVideogames],
        };
  
      case FILTER_ALPHABETICALLY:
        let filteredVideogames;
        if (action.payload === "abc") {
          filteredVideogames = state.videogames
            .slice()
            .sort((a, b) => a.name.localeCompare(b.name));
        } else if (action.payload === "xyz") {
          filteredVideogames = state.videogames
            .slice()
            .sort((a, b) => b.name.localeCompare(a.name));
        }
        
  
        return {
          ...state,
          videogames: filteredVideogames,
        };
  
        case FILTER_BY_GENRES:
            const genreToFilter = action.payload;
            let filteredVideogamesByGenre;
          
            if (genreToFilter === "All") {
              filteredVideogamesByGenre = state.allVideogames;
            } else {
              filteredVideogamesByGenre = state.allVideogames.filter((videogame) =>
                videogame.genres.includes(genreToFilter)
              );
            }
          
            return {
              ...state,
              videogames: filteredVideogamesByGenre,
            };
          
  
      case GET_VIDEOGAMES_FROM_DB:
        const newVideogamesOrigin = action.payload;
        const filteredVideogamesOrigin = state.allVideogames.filter((videogame) => {
          return newVideogamesOrigin === "api" ? !videogame.createdAtDatabase : videogame.createdAtDatabase;
        });
  
        return {
          ...state,
          videogames: filteredVideogamesOrigin,
          videogamesOrigin: newVideogamesOrigin,
        };
  
      case RESET_FILTER:
        return {
          ...state,
          videogames: [...state.allVideogames],
        };
  
      default:
        return state;
    }
  };
  
  export default reducer;
  