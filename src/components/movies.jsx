import React, { Component } from "react";
import MoviesTable from "./moviesTable";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import { paginate } from "../utils/paginate";
import { Link } from "react-router-dom";
import _ from "lodash";
import SearchBox from "./common/searchBox";

// TODO: when we are on third page and press delete it shows empty data

class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        pageSize: 4,
        currentPage: 1,
        itemsOnCurrentPage: 0,
        searchQuery: "",
        selectedGenre: "",
        sortColumn: { path: "title", order: "asc" },
    };

    async componentDidMount() {
        const { data } = await getGenres();
        const { data: movies } = await getMovies();
        const genres = [{ _id: "all", name: "All Genres" }, ...data];
        this.setState({ movies, genres });
    }

    handleDelete = async movie => {
        const orignalMovies = this.state.movies;
        const movies = this.state.movies.filter(m => m._id !== movie._id);
        this.setState({ movies });

        try {
            await deleteMovie(movie._id);
        } catch (ex) {
            if (ex.response && ex.response.status === 404)
                alert("This post has already been deleted.");
            this.setState({ movies: orignalMovies });
        }
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
        this.setState({
            selectedGenre: genre,
            searchQuery: "",
            currentPage: 1,
        });
    };

    handleSearch = query => {
        this.setState({
            searchQuery: query,
            selectedGenre: null,
            currentPage: 1,
        });
    };

    getPagedData = () => {
        const {
            pageSize,
            currentPage,
            sortColumn,
            selectedGenre,
            movies: allMovies,
            searchQuery,
        } = this.state;

        let filtered = allMovies;

        if (searchQuery) {
            filtered = allMovies.filter(m =>
                m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
            );
        } else if (selectedGenre && selectedGenre._id !== "all") {
            filtered = allMovies.filter(m => m.genre._id === selectedGenre._id);
        }

        const sorterd = _.orderBy(
            filtered,
            [sortColumn.path],
            [sortColumn.order]
        );
        const movies = paginate(sorterd, currentPage, pageSize);

        return {
            totalCount: filtered.length,
            data: movies,
        };
    };

    render() {
        const { length: count } = this.state.movies;
        const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
        const { user } = this.props;

        const { totalCount, data: movies } = this.getPagedData();

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
                        {user && (
                            <Link
                                to="/movies/new"
                                className="btn btn-primary mb-2"
                            >
                                New Movie
                            </Link>
                        )}
                        <p>Showing {totalCount} movies in the database.</p>
                        <SearchBox
                            value={searchQuery}
                            onSearch={this.handleSearch}
                        />
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
