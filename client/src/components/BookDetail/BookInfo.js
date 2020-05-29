import React, { useEffect, useState, useRef } from "react";
import { Button } from "@material-ui/core";
import catImage from "../../static/images/cat.jpg"
import useStyles from "./styles"
import { getBook } from '../../actions/books';
import { connect } from 'react-redux';
import { MEDIA_URL } from "../../constants/routes";
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import { postComment } from '../../actions/comments';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { addToShoppingCart } from "../../actions/shoppingCart";

const BookInfo = (props) => {
    const classes = useStyles();
    const { bookId, book, profile } = props;
    const [commentErrorHide, setCommentErrorHide] = useState(true);
    const commentBlockRef = useRef(null);
    const [amount, setAmount] = useState(1);

    const orderButtonRef = useRef(null);

    const handleSendComment = async (event) => {
        event.preventDefault();
        const value = event.target.elements.comment.value;
        if(value.length < 10){
            setCommentErrorHide(false);
        }
        else{
            setCommentErrorHide(true);
            event.target.elements.comment.value = '';
            props.postComment(value, book.id, profile.profile.id);
            commentBlockRef.current.appendChild(createCommentHtml(value));
        }
    }

    useEffect(() => {
        props.getBook(bookId)
    }, props.book)

    const createCommentHtml = (value) => {
        // Creating comment 
        var commentDiv = document.createElement('div');
        commentDiv.className = classes.commentDiv;

        var img = document.createElement('img');
        img.className=`${classes.commentAvatar} d-block`;
        img.setAttribute('src', catImage);

        var commentContent = document.createElement('div');
        commentContent.className = 'pl-3';

        var authorName = document.createElement('p');
        authorName.className = classes.commentAuthorName;
        authorName.innerHTML = props.profile.profile.first_name + ' ' + props.profile.profile.last_name;

        var commentText = document.createElement('p');
        commentText.className = classes.commentText;
        commentText.innerHTML = value;

        commentDiv.appendChild(img);
        commentContent.appendChild(authorName);
        commentContent.appendChild(commentText);
        commentDiv.appendChild(commentContent);

        return commentDiv;
    }

    const renderComment = (comment) => {
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
    }

    const changeAmount = (type) => {
        if (type === 'remove' && amount > 1){
            setAmount(amount-1);
        }
        else if(type === 'add' && amount < book.in_stock){
            setAmount(amount+1);
        }
    }

    const handleAddToShoppingCart = () => {
        props.addToShoppingCart(profile.profile.id, book.id, amount);
        orderButtonRef.current.style.backgroundColor = "#636363";
        orderButtonRef.current.innerHTML = 'Добавлено!';
        orderButtonRef.current.disabled = true;
    }

    if (Object.keys(props.book).length && props.bookId == book.id){
        return (
            <div className='container-fluid' style={{fontFamily: "Arial, sans-serif"}}>
                <div className='row'>
                    <div className={`${classes.bookCover} col-md-5`}>
                        <img 
                        className={classes.bookImg}
                        src={`${MEDIA_URL}${book.image}`}
                        />
                        <div className={classes.buttonDiv}>
                            <span className={classes.amountSpan}>
                                <RemoveIcon 
                                color='secondary' 
                                style={{cursor: "pointer"}}
                                onClick={() => changeAmount('remove')}
                                />
                                <span> {amount} </span>
                                <AddIcon 
                                style={{color: "#14D100", cursor: "pointer" }} 
                                onClick={() => changeAmount('add')}
                                />
                            </span>
                            <Button 
                            color="primary" 
                            variant='contained' 
                            className={classes.orderButton}
                            disabled={props.isAuthenticated ? false : true}
                            ref={orderButtonRef}
                            onClick={handleAddToShoppingCart}
                            >
                                Добавить в корзину
                            </Button>
                            <p 
                            className='text-center'
                            style={
                                props.isAuthenticated 
                                ? {display: "none"}
                                : {opacity:'0.8', fontSize:'0.8rem',}
                            }
                            >
                                Войдите в систему чтобы заказать!
                            </p>
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
                <h3 className='text-center mt-5 mb-3'>Отзывы</h3>
                {props.isAuthenticated && (
                    <div className={`${classes.commentForm} mb-5`}>
                        <form method="POST" autoComplete="off" onSubmit={handleSendComment}>
                            <div className='d-flex' style={{width: "100%"}}>
                                <TextField 
                                label='Комментарий'
                                name='comment'
                                id='comment'
                                variant='outlined'
                                className={classes.commentField}
                                size="small"
                                fullWidth
                                />
                                <Button 
                                type='submit' 
                                color='primary' 
                                variant='contained'
                                >
                                    <SendIcon />
                                </Button>
                            </div>
                            <p
                            className={classes.commentError}
                            style={commentErrorHide ? {display:'none'} : {}}
                            >Минимум 10 символов</p>
                        </form>
                    </div>
                )}
                <div className={`${classes.commentsContainer}`} ref={commentBlockRef}>
                    {book.comments && book.comments.map(comment => {
                        return (
                            renderComment(comment)
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
    book: state.books.pickedBook,
    isAuthenticated: state.auth.isAuthenticated,
    profile: state.auth.profile
})

export default connect(mapStateToProps, {getBook, postComment, addToShoppingCart})(BookInfo);