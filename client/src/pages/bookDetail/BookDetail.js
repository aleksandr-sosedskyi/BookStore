import React from 'react';
import Dashboard from "../../components/Dashboard/Dashboard";
import BookInfo from "../../components/BookDetail/BookInfo";


const BookDetail = (props) => {
    return (
        <>
            <Dashboard mainComponent={BookInfo} currentGenreId={props.match.params.genre}/>
        </>
    );
}



export default BookDetail;