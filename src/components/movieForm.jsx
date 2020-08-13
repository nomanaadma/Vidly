import React from 'react';
import Joi from "joi-browser";
import Form from './common/form';


class MovieForm extends Form {
    state = {
        data: {
            title: "",
            genre: "",
            numberInStock: "",
            dailyRentalRate: "",
        },
        errors: {},
    };

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
        const { match, history } = this.props;
        return ( 
            <div>
                <h1>Movie Form {match.params.id}</h1> 
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('title', 'Title')}
                    {this.renderInput('genre', 'Genre')}
                    {this.renderInput('numberInStock', 'Number in Stock')}
                    {this.renderInput('dailyRentalRate', 'Rate')}
                    {this.renderButton('Save')}
                </form>
                {/* <button className="btn btn-primary" onClick={ () => history.push('/movies') }>Save</button> */}
            </div>
        );
    }
}

export default MovieForm;