import React from "react";
import { Card, CardMedia, CardContent, CardAction} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    media: {
        width: "190px",
        height: "auto"
    }
    
})

const BookCatalog = (props) => {
    const classes = useStyles();

    return (
        <Card>
            <CardContent>
                <div className='p-0'>
                    <img 
                    className={classes.media} 
                    src="https://img.yakaboo.ua/media/catalog/product/cache/1/image/398x565/234c7c011ba026e66d29567e1be1d1f7/3/5/35_129.jpg"
                    alt="Моби Дик"
                    />
                </div>
            </CardContent>
        </Card>
    );
}

export default BookCatalog;