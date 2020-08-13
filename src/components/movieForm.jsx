import React from 'react';
import Joi from "joi-browser";
import Form from './common/form';
import { getGenres } from './../services/fakeGenreService';

class MovieForm extends Form {
    state = {
        data: {
            title: "",
            genre: "",
            numberInStock: "",
            dailyRentalRate: "",
        },
        errors: {},
        genres: [],
    };

    componentDidMount() {

        // console.log(this.props.match.params.id);
        const genres = [{ _id: "", name: "Select" }, ...getGenres()];
        this.setState({ genres });

    }

    schema = {
        title: Joi.string().required().label("Title"),
        genre: Joi.string().required().label("Genre"),
        numberInStock: Joi.number().min(0).required().label("Number in Stock"),
        dailyRentalRate: Joi.number().min(0).max(10).required().label("Rate"),
    };

    doSubmit = () => {
        
        // call the server
        console.log("submitted");

    }

    render() { 
        
        return ( 
            <div>
                <h1>Movie Form {this.props.match.params.id}</h1> 
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('title', 'Title')}
                    {this.renderSelect('genre', 'Genre', this.state.genres)}
                    {this.renderInput('numberInStock', 'Number in Stock')}
                    {this.renderInput('dailyRentalRate', 'Rate')}
                    {this.renderButton('Save')}
                </form>
            </div>
        );
    }
}

export default MovieForm;