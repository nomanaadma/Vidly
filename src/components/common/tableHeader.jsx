import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

class TableHeader extends Component {
    raiseSort = path => {
        const sortColumn = { ...this.props.sortColumn };

        if (sortColumn.path === path)
            sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
        else {
            sortColumn.path = path;
            sortColumn.order = "asc";
        }

        this.props.onSort(sortColumn);
    };

    renderSortIcon = column => {
        if(column.path !== this.props.sortColumn.path) return null;
        const sortIcon = this.props.sortColumn.order === 'asc' ? faSortUp : faSortDown;
        return <FontAwesomeIcon icon={sortIcon} />
    }

    render() {
        return (
            <thead>
                <tr>
                    {this.props.columns.map(column => (
                        <th className="clickable" key={column.path || column.key} onClick={() => this.raiseSort(column.path)}>
                            {column.label} {this.renderSortIcon(column)}
                        </th>
                    ))}
                </tr>
            </thead>
        );
    }
}

export default TableHeader;
