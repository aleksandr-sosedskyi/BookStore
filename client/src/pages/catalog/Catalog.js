import React, { useEffect } from 'react';
import Navbar from "../../components/Navbar/Navbar";
import { connect } from "react-redux";
import getProfile from "../../actions/profiles";


export const Catalog = (props) => {
    return (
        <Navbar />
    );
}

const mapStateToProps = (state) => ({
    profiles: state.profiles.profiles
})

export default connect(mapStateToProps, { getProfile })(Catalog);