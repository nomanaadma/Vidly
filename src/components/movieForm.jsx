import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getGenres } from "./../services/fakeGenreService";
import { getMovie, saveMovie } from "../services/fakeMovieService";

class MovieForm extends Form {
    state = {
        data: {
            title: "",
            genreId: "",
            numberInStock: "",
            dailyRentalRate: "",
        },
        errors: {},
        genres: [],
    };

    schema = {
        _id: Joi.string(),
        title: Joi.string().required().label("Title"),
        genreId: Joi.string().required().label("Genre"),
        numberInStock: Joi.number().min(0).max(100).required().label("Number in Stock"),
        dailyRentalRate: Joi.number().min(0).max(10).required().label("Rate"),
    };

    componentDidMount() {
        this.setState({ genres: getGenres() });

        const { match, history } = this.props;

        if(match.params.id === "new") return;

        const movie = getMovie(match.params.id);
        if (!movie) history.replace("/not-found");

        this.setState({ data: this.mapToViewModel(movie) });
    }

    mapToViewModel(movie) {
        return {
            _id: movie?._id || '',
            title: movie?.title || '',
            genreId: movie?.genre?._id || '',
            numberInStock: movie?.numberInStock || '',
            dailyRentalRate: movie?.dailyRentalRate || '',
        }
    }

    doSubmit = () => {
        console.log('working');
        saveMovie(this.state.data);
        this.props.history.push('/');
    };

    render() {
        return (
            <div>
                <h1>Movie Form {this.props.match.params.id}</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("title", "Title")}
                    {this.renderSelect("genreId", "Genre", this.state.genres)}
                    {this.renderInput("numberInStock", "Number in Stock")}
                    {this.renderInput("dailyRentalRate", "Rate")}
                    {this.renderButton("Save")}
                </form>
            </div>
        );
    }
}

export default MovieForm;
