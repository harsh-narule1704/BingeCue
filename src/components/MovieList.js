import React from 'react'
import MovieCard from './MovieCard';

const MovieList = ({ title, movies }) => {
  
    console.log(movies);

    return (
    <div className='px-6'>
        <h1 className='text-3xl py-4 text-white'>{title}</h1>

        <div
            className='flex overflow-x-scroll hide-scrollbar'
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
            <div className='flex'>
                {Array.isArray(movies) && movies.length > 0 && movies.map(movie => (
                    <MovieCard key={movie.id} posterPath={movie.poster_path}/>
                ))}
            </div>
        </div>
        <style>{`
            .hide-scrollbar::-webkit-scrollbar { display: none; }
            .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
    </div>
  )
}

export default MovieList;
