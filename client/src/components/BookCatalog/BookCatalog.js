import React, { useEffect } from "react";
import BookItem from "./BookItem";
import { connect } from "react-redux";
import { getBooks } from "../../actions/books";

const BookCatalog = (props) => {
    useEffect(() => {
        props.getBooks();
    },props.books);

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