import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import catImage from "../../static/images/cat.jpg"
import useStyles from "./styles"
import { getBook } from '../../actions/books';
import { connect } from 'react-redux';
import { MEDIA_URL } from "../../constants/routes";

const BookInfo = (props) => {
    const classes = useStyles();
    const { bookId, book } = props;

    useEffect(() => {
        props.getBook(bookId)
    }, props.book)

    if (Object.keys(props.book).length){
        return (
            <div className='container-fluid' style={{fontFamily: "Arial, sans-serif"}}>
                <div className='row'>
                    <div className={`${classes.bookCover} col-md-5`}>
                        <img 
                        className={classes.bookImg}
                        src={`${MEDIA_URL}${book.image}`}
                        />
                        <div className={classes.buttonDiv}>
                            <Button 
                            color="primary" 
                            variant='contained' 
                            className={classes.orderButton}
                            >
                                Добавить в корзину
                            </Button>
                        </div>
    
                    </div>
                    <div className={`${classes.bookInfo} col-md-7`}>
                        <h3 className='text-center mt-0'>Информация о книге</h3>
                        <p className={classes.infoP}><strong>Автор:</strong> {book.author}</p>
                        <p className={classes.infoP}><strong>Название:</strong> {book.title}</p>
                        <p className={classes.infoP}><strong>Жанр:</strong> {book.genre}</p>
                        <p className={classes.infoP}><strong>Год:</strong> {book.year}</p>
                        <p className={classes.infoP}><strong>Страниц:</strong> {book.pages}</p>
                        <p className={classes.infoP}><strong>В наличии: </strong>{book.in_stock}</p>
                        <p className={classes.infoP}><strong>Цена:</strong> {book.price}$</p>
                        <p className={classes.infoP}>
                            <strong>Описание: </strong> 
                            {book.description}
                        </p>
                    </div>
                </div>
                <h3 className='text-center my-5'>Отзывы</h3>
                <div className={`${classes.commentsContainer}`}>
                    {book.comments && book.comments.map(comment => {
                        return (
                            <div className={classes.commentDiv}> 
                                <img
                                src={catImage}
                                className={`${classes.commentAvatar} d-block`}
                                />
                                <div className='pl-3'>
                                    <p className={classes.commentAuthorName}>
                                        {comment.profile.first_name} {comment.profile.last_name}
                                    </p>
                                    <p className={classes.commentText}>
                                        {comment.text}
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                    
                </div>
            </div>
        )
    }
    else{
        return (
            <>
            </>
        )
    }

}

const mapStateToProps = (state) => ({
    book: state.books.pickedBook
})

export default connect(mapStateToProps, {getBook})(BookInfo);