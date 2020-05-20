import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles({
    itemBlock: {
    },
    bookCoverBlock: {
        width: "100%",
        borderBottom: "1px solid #ddd",
        marginTop: "1rem",
        paddingBottom: "1rem"
    },
    bookCover: {
        width: "100%",
        maxWidth:"150px",
        height: "210px",
        display: "block",
        margin: "0 auto",
        borderRadius: "4px"
    },
    bookTitle: {
        fontSize: "1.15rem",
        fontWeight: "700",
        marginBottom: "0",
        textAlign: "center"
    },
    bookAuthor: {
        fontSize: "0.9rem",
        fontWeight: "700",
        opacity: "0.75",
        textAlign: "center"
    },
    bookAmount: {
        fontSize: "1.3rem",
    },
    bookPrice: {
        fontSize: "1.3rem",
    },
    cancelButton: {
        width: "100%",
        marginBottom: "1rem"
    },
    orderError: {
        textAlign: "center",
        color: "red",
        fontSize: "0.7rem",
        marginTop: "5px"
    },
    successIcon : {
        fontSize: "3.4rem",
        color: "green",
        display: "block",
        margin: "0 auto"
    }
})

export default useStyles;