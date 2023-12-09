import React from "react";

const PaginationComp = ({ currentPage, totalPageCount, handlePageChange }) => {
  const getDisplayedPageNumbers = () => {
    const pageNumbers = [];
    const totalDisplayedPages = 5;

    let startPage = Math.max(
      1,
      currentPage - Math.floor(totalDisplayedPages / 2)
    );
    let endPage = Math.min(totalPageCount, startPage + totalDisplayedPages - 1);

    if (totalPageCount > totalDisplayedPages) {
      if (currentPage <= Math.ceil(totalDisplayedPages / 2)) {
        endPage = totalDisplayedPages;
      } else if (
        currentPage >
        totalPageCount - Math.ceil(totalDisplayedPages / 2)
      ) {
        startPage = totalPageCount - totalDisplayedPages + 1;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (currentPage > 1) {
      pageNumbers.unshift("이전");
    }
    if (currentPage < totalPageCount) {
      pageNumbers.push("다음");
    }

    return pageNumbers;
  };

  return (
    <nav className="pagination">
      <ul className="pagination">
        <li
          className="page-item first-page"
          onClick={() => handlePageChange(1)}
        >
          맨앞
        </li>
        {getDisplayedPageNumbers().map((item, index) => (
          <li
            key={index}
            onClick={() => {
              if (item === "이전") {
                handlePageChange(currentPage - 1);
              } else if (item === "다음") {
                handlePageChange(currentPage + 1);
              } else {
                handlePageChange(item);
              }
            }}
            className={item === currentPage ? "active page-item" : "page-item"}
          >
            {item}
          </li>
        ))}
        <li
          className="page-item last-page"
          onClick={() => handlePageChange(totalPageCount)}
        >
          맨뒤
        </li>
      </ul>
    </nav>
  );
};

export default PaginationComp;
