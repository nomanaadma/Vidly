import React, { Component } from "react";
import Like from "./common/like";
import TableHeader from "./common/tableHeader";
import TableBody from "./common/tableBody";

class MoviesTable extends Component {
    columns = [
        { path: "title", label: "Title" },
        { path: "genre.name", label: "Genre" },
        { path: "numberInStock", label: "Stock" },
        { path: "dailyRentalRate", label: "Rate" },
        { 
            key: "like", 
            content: movie => <Like liked={movie.liked} onLike={() => this.props.onLike(movie)} /> },
        { 
            key: "delete",
            content: movie => (
                <button
                    onClick={() => this.props.onDelete(movie)}
                    className="btn btn-danger btn-small"
                >
                    Delete
                </button>
            )
        },

    ];

    render() {
        const { movies, onSort, sortColumn } = this.props;

        return (
            <table className="table">
                <TableHeader
                    columns={this.columns}
                    onSort={onSort}
                    sortColumn={sortColumn}
                />
                <TableBody data={movies} columns={this.columns} />
            </table>
        );
    }
}

export default MoviesTable;
