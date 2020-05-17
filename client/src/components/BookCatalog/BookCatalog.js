import React, { useState } from "react";
import BookItem from "./BookItem";
import { connect } from "react-redux";
import { getBooks } from "../../actions/books";

const BookCatalog = (props) => {
    const [genreId, setGenreId] = useState(-1);
    
    if (genreId != props.currentGenreId){
        props.getBooks(props.currentGenreId);
        setGenreId(props.currentGenreId);
    }

    return (
        <div className='container-fluid'>
            <div className="row">
                {props.books.map(book => {
                    return (
                        <BookItem book={book} />
                    )
                })}
            </div>
        </div>
    );
}

const mapStateToProps = (state)  => ({
    books: state.books.books
})

export default connect(mapStateToProps, { getBooks })(BookCatalog);