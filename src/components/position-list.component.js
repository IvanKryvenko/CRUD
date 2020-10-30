import React, { useState, useEffect } from "react";
import PositionDataService from "../services/position.service";
import { Link } from "react-router-dom";

export default function PositionList() {
    
    let [positions, setPosition] = useState([]);
    let [currentPosition, setCurrentPosition] = useState(null);
    let [currentIndex, setIndex] = useState(-1);

    useEffect(() => {
        retrievePositions();
    });

    function retrievePositions() {
        PositionDataService.getAll()
            .then(res => {
                positions = setPosition(res.data);
                console.log(res.data);
            })
            .catch(e => {
                console.log(e);
            })
    }

    function refreshList() {
        retrievePositions();
        currentPosition = setCurrentPosition(null);
        currentIndex = setIndex(-1);
    }
    
    function setActivePosition(position, index) {
        currentPosition = setCurrentPosition(position);
        currentIndex = setIndex(index);
    }

    function removeAllPositions() {
        PositionDataService.deleteAll()
            .then(res => {
                console.log(res.data);
                refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    }

    return (
        <div className="list row">
        <div className="col-md-6">
          <h4>Tutorials List</h4>

          <ul className="list-group">
            {positions &&
              positions.map((position, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => setActivePosition(position, index)}
                  key={index}
                >
                  {position.title}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={() => removeAllPositions()}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentPosition ? (
            <div>
              <h4>Tutorial</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentPosition.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentPosition.description}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentPosition.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/tutorials/" + currentPosition.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Position...</p>
            </div>
          )}
        </div>
      </div>
    )
}