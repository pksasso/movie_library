import React, { useState, createContext } from 'react';

export const MovieContext = createContext(null);

export const MovieProvider = ({ children }) => {
    const [selected, setSelected] = useState('popular')
    //const [movieList, setMovieList] = useState(["lista"]);
    const [genreId, setGenreId] = useState('')

    return (
        <MovieContext.Provider value={{ selected, setSelected, genreId, setGenreId }}>
            {children}
        </MovieContext.Provider>);
}
