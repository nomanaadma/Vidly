import React, { Component } from "react";
import Like from "./common/like";
import ListGroup from "./listGroup";
import Pagination from "./common/pagination";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import { paginate } from "../utils/paginate";

class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        pageSize: 4,
        currentPage: 1,
    };

    componentDidMount() {
        const genres = [{ _id: 'all', name: 'All Genres'}, ...getGenres() ];
        console.log(genres);
        this.setState({ movies: getMovies(), genres });
    }

    handleDelete = movie => {
        const movies = this.state.movies.filter(m => m._id !== movie._id);
        this.setState({ movies });
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

    render() {
        const { length: count } = this.state.movies;
        const {
            pageSize,
            currentPage,
            selectedGenre,
            movies: allMovies,
        } = this.state;

        if (count === 0) return <p>There are no movies in the database.</p>;

        const filtered = selectedGenre && selectedGenre._id != 'all'
            ? allMovies.filter(m => m.genre._id === selectedGenre._id)
            : allMovies;
        const movies = paginate(filtered, currentPage, pageSize);

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
                        <p>Showing {filtered.length} movies in the database.</p>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Genre</th>
                                    <th>Stock</th>
                                    <th>Rate</th>
                                    <th />
                                    <th />
                                </tr>
                            </thead>
                            <tbody>
                                {movies.map(movie => (
                                    <tr key={movie._id}>
                                        <td>{movie.title}</td>
                                        <td>{movie.genre.name}</td>
                                        <td>{movie.numberInStock}</td>
                                        <td>{movie.dailyRentalRate}</td>
                                        <td>
                                            {
                                                <Like
                                                    liked={movie.liked}
                                                    onLike={() =>
                                                        this.handleLike(movie)
                                                    }
                                                />
                                            }
                                        </td>
                                        <td>
                                            <button
                                                onClick={() =>
                                                    this.handleDelete(movie)
                                                }
                                                className="btn btn-danger btn-small"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Pagination
                            itemsCount={filtered.length}
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
