import React, { useRef, useState, useEffect } from "react";
import useStyles from "./styles";
import { connect } from "react-redux";
import { getShoppingCart, removeFromShoppingCart } from "../../actions/shoppingCart";
import { Button } from "@material-ui/core";

const ShoppingCartMain = (props) => {
    const classes = useStyles();

    useEffect(() => {
        props.getShoppingCart();
    }, [props.items.join(',')])

    const handleRemoveItem = (itemId) => {
        props.removeFromShoppingCart(itemId);
    }

    return (
        <div className='container-fluid'>
            <div className='row'>
                {props.items.map(item => {
                    return (
                        <div className={`${classes.itemBlock} col-12 col-xl-3 col-lg-4 col-md-6 card` }>
                            <div className={classes.bookCoverBlock}>
                                <img
                                src={item.book.image}
                                className={classes.bookCover}
                                />
                            </div>
                            <div className={`${classes.bookInfoBlock} mt-2`}>
                                <p className={classes.bookTitle}>{item.book.title}</p>
                                <p className={classes.bookAuthor}>{item.book.author}</p>
                                <div className='d-flex justify-content-between'>
                                    <p className={classes.bookAmount}>{item.amount} шт.</p>
                                    <p className={classes.bookPrice}>{item.amount * item.book.price}$</p>
                                </div>
                                <Button 
                                variant='contained' 
                                color='default' 
                                className={classes.cancelButton}
                                onClick={() => handleRemoveItem(item.id)}
                                >
                                    Удалить
                                </Button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    items: state.shoppingCart.items
})


export default connect(mapStateToProps, { getShoppingCart, removeFromShoppingCart } )(ShoppingCartMain);
