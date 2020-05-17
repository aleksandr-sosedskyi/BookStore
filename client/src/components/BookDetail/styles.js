import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles({
    bookCover: {
    },
    bookInfo: {
    },
    bookImg: {
        width: "80%",
        minWidth: "150px",
        maxWidth: "250px",
        height: "auto",
        display: "block",
        margin: "0 auto"
    },
    buttonDiv: {
        width: "100%"
    },
    orderButton: {
        textTransform: "none",
        display: "block",
        margin: "1rem auto"
    },
    infoP: {
        margin: "0.5rem"
    },
    commentsContainer: {

    },
    commentDiv: {
        display: "flex",
        justifyContent: 'start'
    },
    commentAvatar: {
        width: "50px",
        height: "50px",
        borderRadius: "50px"
    },
    commentAuthorName: {
        fontWeight: "700",
        marginBottom: 0
    },
    commentText: {

    }
})

export default useStyles;