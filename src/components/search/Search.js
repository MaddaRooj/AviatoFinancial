import React, { Component } from "react";
import { Link } from "react-router-dom";
import ProgressBar from "react-bootstrap/ProgressBar";
import { FaInfoCircle } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import './Search.css'

class SearchResults extends Component {
  render() {
    if(this.props.searchResults) {
      return (
        <section className="searchResults">
          <h1 className="d-flex justify-content-center">Search Results</h1>
          {this.props.searchResults.map(result => (
            <div key={result.id} className="d-flex justify-content-center mt-5">
              <div className="card-body-search">
                <div>
                  <h5 style={{fontFamily: 'EB Garamond, serif', fontSize: '1.2rem'}} className="d-flex justify-content-end">Budget End: <span className="ml-1" style={{ fontSize: '1.3rem' }}>{result.dateEnd}</span></h5>
                </div>
                <div className="d-flex flex-column align-items-center">
                  <h5 style={{ fontSize: "2rem", fontFamily: "Nanum Myeongjo, serif" }} className="card-title">
                    {result.name}
                  </h5>
                  <ProgressBar
                    animated
                    now={(result.amtRemaining / result.amtStart) * 100}
                    label={`${Math.round(
                      (result.amtRemaining / result.amtStart) * 100
                    )}%`}
                    variant="success"
                    className="progressBar m-3"
                  />
                </div>
                <div className="btnDiv d-flex flex-row-reverse">
                  <Link
                    title="Details"
                    className="btn btn-sm btn-outline-primary mr-2"
                    to={`/budgets/${result.id}`}
                  >
                    <FaInfoCircle size="14px" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </section>
      );
    }
  }
}

export default SearchResults;