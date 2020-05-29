import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles({
    main: {
        width: "100%"
    },
    profileHeader: {
        height: "50px",
        borderRadius: "2px",
        backgroundColor: "rgb(26, 26, 26)",
        '& p': {
            color: "white",
            textAlign: "center",
            lineHeight: "50px",
            fontSize: "0.88rem",
            fontWeight: "700",
        },
        '& span': {
            cursor: "pointer"
        },
        '& span:hover': {
            opacity: 0.5
        }
    },
    profileInfoForm: {
        width: "100%",
        maxWidth: "350px",
        margin: "1rem auto"
    },
    passwordChangeForm: {
        width: "100%",
        maxWidth: "350px",
        margin: "1rem auto"
    },
    saveSuccess: {
        marginTop: "1rem",
        color: "green",
        textAlign: "center",
        fontSize: "0.95rem",
        display: "none"
    },
    errorMessage: {
        marginTop: "1rem",
        color: "red",
        textAlign: "center",
        fontSize: "0.95rem",
    },
    orderBookCoverBlock: {
        width: "93px"
    },
    orderBookCover: {
        width: "100%",
        height:"auto"
    },
    orderBookInfoText: {
        fontSize: "1rem"
    },
})

export default useStyles;