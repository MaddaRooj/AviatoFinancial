import React, { Component } from "react";

class SearchResults extends Component {
  render() {
    if(this.props.searchResults) {
      return (
        <section className="searchResults">
          {this.props.searchResults.map(result => (
            <div key={result.id} className="result_card">
              <h2 className="mt-5">{result.name}</h2>
              <button>detail</button>
            </div>
          ))}
        </section>
      );
    }
  }
}

export default SearchResults;