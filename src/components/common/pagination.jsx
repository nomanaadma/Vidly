import React from "react";
import _ from "lodash";
import PropTypes from 'prop-types';

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
    const pageCount = Math.ceil(itemsCount / pageSize);
    if(pageCount === 1) return null;
    const pages = _.range(1, pageCount + 1);

    return (
        <React.Fragment>
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    {pages.map((page) => (
                        <li key={page} className={ currentPage === page ? 'page-item active' : 'page-item' } >
                            <a className="page-link" onClick={() => onPageChange(page)}>
                                {page}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </React.Fragment>
    );
};

Pagination.propTypes = {
    itemsCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired
};

export default Pagination;
