import React from "react";

const SearchBox = ({ value, onSearch }) => {
    return (
        <input
            type="search"
            name="query"
            className="form-control my-3"
            placeholder="Search..."
            value={value}
            onChange={e => onSearch(e.currentTarget.value)}
        />
    );
};

export default SearchBox;
