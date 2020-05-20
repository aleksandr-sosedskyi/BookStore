import React, { useRef, useState, useEffect } from "react";
import useStyles from "./styles";
import { connect } from "react-redux";
import { getShoppingCart, 
    removeFromShoppingCart, 
    clearShopingCart } from "../../actions/shoppingCart";
import { Button, TextField } from "@material-ui/core";
import { createOrder } from "../../actions/orders";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';


const ShoppingCartMain = (props) => {
    const classes = useStyles();
    const [orderErrorExists, setOrderErrorExists] = useState(false);
    const [orderErrorText, setOrderErrorText] = useState('');
    const [orderSuccess, setOrderSuccess] = useState(false);

    useEffect(() => {
        props.getShoppingCart();
    }, [props.items.join(',')])

    const handleRemoveItem = (itemId) => {
        props.removeFromShoppingCart(itemId);
    }

    const orderTotalPrice = () => {
        var sum = 0;
        for(let i of props.items) {
            sum += i.book.price * i.amount
        }
        return sum;
    }

    const handleSuccessOrder = () => {
        props.clearShopingCart();
        setOrderSuccess(true);
    }

    const handleFailOrder = (errorText) => {
        setOrderErrorText(errorText);
        setOrderErrorExists(true);
    }

    const handleCreateOrder = (event) => {
        event.preventDefault();
        const address = event.target.elements.address.value;
        if(address.length < 10){
            setOrderErrorExists(true);
            setOrderErrorText('Поле должно содержать 10 символов!');
            return;
        }
        props.createOrder(address, handleSuccessOrder, handleFailOrder);
    }

    return (
        <div className='container-fluid'>
            {!orderSuccess ? (
                <>
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
                <h3 className="text-center mt-4">Информация о заказе</h3>
                <p
                style={{fontSize:"1.1rem"}}
                className="mt-4 mb-3"
                >
                    <strong>Сумма заказа: </strong>
                    {orderTotalPrice()} $
                </p>
                <form method='POST' onSubmit={handleCreateOrder}>
                    <TextField 
                    required
                    variant='outlined'
                    fullWidth
                    label='Введите адрес доставки'
                    size='small'
                    name='address'
                    />
                    <p 
                    className={classes.orderError}
                    style={ orderErrorExists ? {} : {display: "none"}}
                    >
                        {orderErrorText}
                    </p>
                    <Button
                    variant='contained'
                    color='primary'
                    className='mt-2'
                    type='submit'
                    >
                    Заказать 
                    </Button>
                </form>
            </>
            ) : (
                <div>
                    <h3 className='text-center'>    
                        Успешно оформлен!
                    </h3>
                    <CheckCircleIcon
                    className={classes.successIcon}
                    />
                </div>
            )}
        </div>
    )
}

const mapStateToProps = (state) => ({
    items: state.shoppingCart.items
})


export default connect(
    mapStateToProps, 
    { 
        createOrder, 
        getShoppingCart, 
        removeFromShoppingCart,
        clearShopingCart
     }
)(ShoppingCartMain);
