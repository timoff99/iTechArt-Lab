import React from "react";

import ReactPaginate from "react-paginate";

import styled from "styled-components";
import theme from "../../../theme";
import { Box } from "../../helpers/Box";

const PaginationWrapper = styled(Box)`
  .pagination {
    display: flex;
    list-style-type: none;
  }
  li {
    margin: 5px;
    cursor: pointer;
  }
  li a {
    color: ${theme.colors.secondary.main};
  }
  .active a {
    color: ${theme.colors.primary.main};
  }
`;

export const Pagination = ({ totalPages, handlePageClick }) => {
  return (
    <PaginationWrapper>
      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        breakLabel={"..."}
        pageCount={totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </PaginationWrapper>
  );
};
