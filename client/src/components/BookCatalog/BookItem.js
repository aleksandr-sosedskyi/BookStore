import React from "react";
import useStyles from "./styles";
import { Button } from "@material-ui/core";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { Link } from "react-router-dom";
import { CATALOG } from "../../constants/routes";

const BookItem = (props) => {
    const book = props.book;
    const classes = useStyles();

    return (
        <div className={classes.bookBlock + " p-3 col-12 col-md-6 col-lg-3   col-xl-3"}>
            <div>
                <div className={classes.bookCoverBlock + " pb-2"}>
                    <img 
                    className={classes.media} 
                    src={`${book.image}`} 
                    />
                </div>
                <div className={classes.description}>
                    <p className={classes.title}>{book.title}</p>
                    <p className={classes.author}>{book.author}</p>
                    <div className="d-flex justify-content-between mt-4">
                        <p className={classes.price}>{book.price}$</p>
                        <Button 
                        style={{height: "45px"}}
                        >
                            <AddShoppingCartIcon style={{color: "green"}} />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookItem;