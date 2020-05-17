import React from "react";
import useStyles from "./styles";
import { Button } from "@material-ui/core";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { Link } from "react-router-dom";
import { DETAIL_BOOK } from "../../constants/routes";

const BookItem = (props) => {
    const book = props.book;
    const classes = useStyles();

    return (
        <div className={classes.bookBlock + " p-3 col-12 col-md-6 col-lg-3   col-xl-3"}>
            <div>
                <div className={classes.bookCoverBlock + " pb-2"}>
                    <Link className={classes.bookLink} to={`${DETAIL_BOOK}/${book.id}`}>
                        <img 
                        className={classes.media} 
                        src={`${book.image}`} 
                        />
                    </Link>
                </div>
                <div className={classes.description}>
                    <Link className={classes.bookLink} to={`${DETAIL_BOOK}/${book.id}`}>
                        <p className={classes.title}>{book.title}</p>
                    </Link>
                    <p className={classes.author}>{book.author}</p>
                    <div className="d-flex justify-content-between mt-4">
                        <p className={classes.price}>{book.price}$</p>
                        <Link className={classes.bookLink} to={`${DETAIL_BOOK}/${book.id}`}>
                            <Button 
                            style={{height: "45px"}}
                            >
                                <AddShoppingCartIcon style={{color: "green"}} />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookItem;