import React from "react";
import "./Pagination.css";
import PropTypes from "prop-types";

const Pagination = props => {
  const { page, totalPages, changePage } = props;
  return (
    <div className="Pagination">
      <button
        className="Pagination-button"
        onClick={() => changePage("prev")}
        disabled={page <= 1}
      >
        &larr;
      </button>
      <span className="Pagination-info">
        page <b>{page}</b> of <b>{totalPages}</b>
      </span>
      <button
        className="Pagination-button"
        onClick={() => changePage("next")}
        disabled={page >= totalPages}
      >
        &rarr;
      </button>
    </div>
  );
};

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  changePage: PropTypes.func.isRequired
};

export default Pagination;
