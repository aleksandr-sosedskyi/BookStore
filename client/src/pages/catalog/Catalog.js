import React from 'react';
import Dashboard from "../../components/Dashboard/Dashboard";
import BookCatalog from "../../components/BookCatalog/BookCatalog";

export const Catalog = (props) => {
    return (
        <>
            <Dashboard mainComponent={BookCatalog} currentGenreId={props.match.params.genre}/>
        </>
    );
}



export default Catalog;