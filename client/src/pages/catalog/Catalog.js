import React from 'react';
import { connect } from "react-redux";
import getProfile from "../../actions/profiles";
import Dashboard from "../../components/Dashboard/Dashboard";

export const Catalog = (props) => {
    return (
        <>
            <Dashboard currentGenreId={props.match.params.genre}/>
        </>
    );
}

const mapStateToProps = (state) => ({
    profiles: state.profiles.profiles
})

export default connect(mapStateToProps, { getProfile })(Catalog);