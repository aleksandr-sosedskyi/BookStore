import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getOrders, deleteOrder } from "../../actions/orders";
import { MEDIA_URL } from '../../constants/routes';
import { Button } from "@material-ui/core";

const ProfileOrders = (props) => {
    const {classes, profile, orders} = props;

    useEffect(() => {
        props.getOrders();
    }, [props.orders.join(',')])

    const handleDeleteOrder = (id) => {
        props.deleteOrder(id);
    }

    if (!orders) return <></>
    return (
        <>
            <div className='mt-4'>
                {orders.map(order => {
                    return (
                        <>
                        <h5 style={{fontWeight: 900}} className='mt-5 mb-3'>Заказ №{order.id}</h5>
                        {order.order_book.map(book_item => {
                            var book = book_item.book_info;
                            return (
                            <div className='d-flex'>
                                <div className={classes.orderBookCoverBlock}>
                                    <img 
                                    src={`${MEDIA_URL}${book.image}`} 
                                    className={classes.orderBookCover} 
                                    />
                                </div>
                                <div className='col-md-6 col-6'>
                                    <p className={classes.orderBookInfoText}>
                                        <strong>Название: </strong> 
                                        {book.title}
                                    </p>
                                    <p className={classes.orderBookInfoText}>
                                        <strong>Автор: </strong> 
                                        {book.author}
                                    </p>
                                    <p className={classes.orderBookInfoText}>
                                        <strong>Кол-во: </strong> 
                                        {book_item.amount} шт.
                                    </p>
                                    <p className={classes.orderBookInfoText}>
                                        <strong>Сумма: </strong> 
                                        {book.price * book_item.amount}$
                                    </p>    
                                    <hr />                    
                                </div>
                            </div>
                            )
                        })}
                        <p className={classes.orderBookInfoText}>
                            <strong>Адрес: </strong> 
                            {order.address}
                        </p>
                        <p className={classes.orderBookInfoText + ' mb-2'}>
                            <strong>Оформлен: </strong> 
                            {new Date(order.created_at).toLocaleDateString()}
                        </p>
                        <p className={classes.orderBookInfoText}>
                            <strong>Сумма заказа: </strong> 
                            {order.total_price}$
                        </p>
                        <p className={classes.orderBookInfoText + ' mb-2'}>
                            <strong>Статус: </strong> 
                            {order.status}
                        </p>
                        {order.status == 'registered' && (
                            <Button 
                            color='secondary'
                            variant='contained'
                            size='small'
                            style={{opacity:0.8}}
                            onClick={() => handleDeleteOrder(order.id)}
                            >
                                Отменить заказ
                            </Button>
                        )}
                        
                    </>
                    )
                })}
            </div>
        </>
    )
}

const mapStateToProps = (state) => ({
    orders: state.orders.orders
})

export default connect(mapStateToProps, { getOrders, deleteOrder })(ProfileOrders);