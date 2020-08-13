import React, { Component } from "react";
import MoviesTable from "./moviesTable";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import { paginate } from "../utils/paginate";
import { Link } from 'react-router-dom';
import _ from 'lodash';

// TODO: when we are on third page and press delete it shows empty data

class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        pageSize: 4,
        currentPage: 1,
        itemsOnCurrentPage: 0,
        sortColumn: { path: 'title', 'order': 'asc' }
    };

    componentDidMount() {
        const genres = [{ _id: "all", name: "All Genres" }, ...getGenres()];
        this.setState({ movies: getMovies(), genres });
    }

    handleDelete = movie => {
        const movies = this.state.movies.filter(m => m._id !== movie._id);
        this.setState({ movies });
    };

    handleSort = sortColumn => {
        this.setState({ sortColumn });
    };

    handleLike = movie => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = { ...movie };
        movies[index].liked = !movies[index].liked;
        this.setState({ movies });
    };

    handlePageChange = page => {
        this.setState({ currentPage: page });
    };

    handleGenreSelect = genre => {
        this.setState({ selectedGenre: genre, currentPage: 1 });
    };

    getPagedData = () => {

        const {
            pageSize,
            currentPage,
            sortColumn,
            selectedGenre,
            movies: allMovies,
        } = this.state;


        const filtered =
        selectedGenre && selectedGenre._id !== "all"
            ? allMovies.filter(m => m.genre._id === selectedGenre._id)
            : allMovies;

        const sorterd = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
        const movies = paginate(sorterd, currentPage, pageSize);

        return {
            totalCount: filtered.length,
            data: movies
        }
    }

    render() {
        const { length: count } = this.state.movies;
        const {
            pageSize,
            currentPage,
            sortColumn,
        } = this.state;

        if (count === 0) return <p>There are no movies in the database.</p>;

        const {totalCount, data: movies} = this.getPagedData();

        return (
            <React.Fragment>
                <div className="row">
                    <div className="col">
                        <ListGroup
                            items={this.state.genres}
                            textProperty="name"
                            valueProperty="_id"
                            selectedItem={this.state.selectedGenre}
                            onItemSelect={this.handleGenreSelect}
                        />
                    </div>
                    <div className="col-9">
                        <Link to="/movies/new" className="btn btn-primary mb-2">
                            New Movie
                        </Link>
                        <p>Showing {totalCount} movies in the database.</p>
                        <MoviesTable
                            movies={movies}
                            sortColumn={sortColumn}
                            onLike={this.handleLike}
                            onDelete={this.handleDelete}
                            onSort={this.handleSort}
                        />
                        <Pagination
                            itemsCount={totalCount}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={this.handlePageChange}
                        />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Movies;
