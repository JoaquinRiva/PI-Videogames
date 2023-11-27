import { GET_VIDEOGAMES, GET_VIDEOGAMES_BY_NAME, GET_ALL_GENRES, GET_VIDEOGAMES_FROM_DB, POST_VIDEOGAMES, ORDER, FILTER_ALPHABETICALLY, FILTER_BY_GENRES, RESET_FILTER } from "./action-types";
import axios from 'axios'

export const getVideogames = () => async (dispatch) => {
    try {
        const response = await axios('http://localhost:3001/videogames');
        const gameData = response.data
        console.log(gameData);

        dispatch({
            type: GET_VIDEOGAMES,
            payload: gameData,
        });
    } catch (error) {
        window.alert(error);
        
    }
}

export const getVideogamesByName = (name) => async (dispatch) => {
    try {
        const response = await axios(`http://localhost:3001/videogamesName?name=${name}`);
        const data = response.data;
        console.log(data);

        dispatch({
            type: GET_VIDEOGAMES_BY_NAME,
            payload: data,
        });


    } catch (error) {
        window.alert(error);
    }
} 

export const getAllGenres = () => async (dispatch) => {
    try {
        const response = await axios('http://localhost:3001/genres');
        const genres = response.data.map((genre) => genre.name);
        console.log(genres);

        dispatch({
            type: GET_ALL_GENRES,
            payload: genres,
        })
    } catch (error) {
        window.alert(error);
    }
}

export const postVideogames = (videogame) => async (dispatch) => {
    try {
       const url = "http://localhost:3001/videogames";
    const response = await axios.post(url, videogame);
    const data = response.data;
    console.log(videogame);

    dispatch({
        type: POST_VIDEOGAMES,
        payload: data,
    }) 
    } catch (error) {
        window.alert(error);
    }
    
}

export const orderCards = (order) => {
    return {
        type: ORDER,
        payload: order
    }
}

export const filterByGenres = (genres)=>{
    return {
        type: FILTER_BY_GENRES,
        payload: genres
    }
}

export const filterAlphabetically = (filterValue) => ({
    type: FILTER_ALPHABETICALLY,
    payload: filterValue,
});

export const filterVideogamesFromDb = (filteredValue)=>({
    type: GET_VIDEOGAMES_FROM_DB,
    payload: filteredValue
})


export const resetFilter = ()=>({
  type: RESET_FILTER
})