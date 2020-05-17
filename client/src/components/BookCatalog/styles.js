import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    media: {
        width: "100%",
        maxWidth:"160px",
        height: "220px",
        display: "block",
        margin: "0 auto",
        borderRadius: "4px"
    },
    bookCoverBlock: {
        width: "100%",
        borderBottom: "1px solid #ddd",
    },
    bookBlock : {
        border: "1px solid #ccc",
        '&:hover': {
            transform: 'scale(0.98)'
        }
    },
    description: {
        fontFamily: "Arial, sans-serif",
        marginTop: "1rem",
    },
    descriptionP: {
        margin: 0
    },
    title: {
        margin: "-10px 0 0 0",
        fontSize: "1.1rem",
        fontWeight: "600"
    },
    author: {
        margin: 0,
        fontSize: "0.95rem",
        opacity:"0.6",
        fontWeight: "600"
    },
    price: {
        height:"45px",
        lineHeight: "45px",
        fontSize: "1.4rem",
        fontWeight: "600",
        color: "#qqq",
        margin: "0"
    },
    views: {
        fontSize: "0.7rem",
        margin: "0",
        opacity: "0.6"
    },
    bookLink: {
        color: "#333",
        textDecoration: "none",
        '&:hover': {
            color: "#333",
            textDecoration: "none"
        }
    }
})

export default useStyles;