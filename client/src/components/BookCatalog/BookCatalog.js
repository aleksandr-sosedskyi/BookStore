import React, { useEffect, useState } from "react";
import BookItem from "./BookItem";
import { connect } from "react-redux";
import { getBooks } from "../../actions/books";

const BookCatalog = (props) => {
    const [genreId, setGenreId] = useState(props.currentGenreId);

    if (genreId != props.currentGenreId){
        props.getBooks(props.currentGenreId);
        setGenreId(props.currentGenreId);
    }

    useEffect(() => {
        props.getBooks(props.currentGenreId);
    }, props.books);

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