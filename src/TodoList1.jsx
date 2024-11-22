import React, { useState } from "react";
import "./index.css";

function TodoList1() {
  const [activity, setActivity] = useState("");
  const [listData, setListData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Set the number of items per page

  const addActivity = () => {
    if (activity.trim() !== "") {
      setListData((listData) => {
        const updatedList = [...listData, activity];
        setActivity("");
        return updatedList;
      });
    }
  };

  const removeActivity = (i) => {
    const updatedListData = listData.filter((elem, id) => id !== i);
    setListData(updatedListData);
  };

  const removeAll = () => {
    setListData([]);
  };

  // Pagination logic
  const totalPages = Math.ceil(listData.length / itemsPerPage);
  const currentItems = listData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="container">
        <h1>TodoList</h1>
        <input
          type="text"
          placeholder="Enter your Items"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
        />
        <button className="btn btn-info mx-2" onClick={addActivity}>
          Add
        </button>
        <p>Here Is your List :</p>

        {listData!=[] && currentItems.map((data, i) => {
          const actualIndex = (currentPage - 1) * itemsPerPage + i;
          return (
            <p key={actualIndex} className="d-flex justify-content-center bg-warning mt-4">
              <div style={{color:"black"}}>{data}</div>
              <button
                className="btn btn-success mx-2"
                onClick={() => removeActivity(actualIndex)}
              >
                Remove
              </button>
            </p>
          );
        })}

        {listData.length > 0 && (
          <button
            className="btn btn-danger justify-content-center"
            onClick={removeAll}
          >
            Remove All
          </button>
        )}

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="pagination-controls">
            <button
              className="btn btn-secondary mx-1"
              disabled={currentPage === 1}
              onClick={goToPreviousPage}
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, pageIndex) => (
              <button
                key={pageIndex}
                className={`btn mx-1 ${
                  currentPage === pageIndex + 1 ? "btn-primary" : "btn-light"
                }`}
                onClick={() => goToPage(pageIndex + 1)}
              >
                {pageIndex + 1}
              </button>
            ))}
            <button
              className="btn btn-secondary mx-1"
              disabled={currentPage === totalPages}
              onClick={goToNextPage}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default TodoList1;
