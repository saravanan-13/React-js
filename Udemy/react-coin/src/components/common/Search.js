import React, { Component } from "react";
import "./Search.css";
import { API_URL } from "../../config";
import { handleResponse } from "../../helper";
import { withRouter } from "react-router-dom";
import Loading from "./Loading";

class Search extends Component {
  state = {
    searchQuery: "",
    searchResults: [],
    loading: false
  };

  handleChange = event => {
    const searchQuery = event.target.value;
    this.setState({ searchQuery });
    if (!searchQuery) return "";
    this.setState({ loading: true });
    fetch(`${API_URL}/autocomplete?searchQuery=${searchQuery}`)
      .then(handleResponse)
      .then(data => {
        this.setState({ searchResults: data, loading: false });
      })
      .catch(error => {
        console.log(error);
      });
  };

  renderSearchResults = () => {
    const { searchResults, searchQuery, loading } = this.state;

    if (!searchQuery) return "";

    if (searchResults.length > 0) {
      return (
        <div className="Search-result-container">
          {searchResults.map(result => (
            <div
              className="Search-result"
              key={result.id}
              onClick={() => this.handleRedirect(result.id)}
            >
              {result.name} ({result.symbol})
            </div>
          ))}
        </div>
      );
    }

    if (!loading) {
      return (
        <div className="Search-result-container">
          <div className="Search-no-result">No result found!</div>
        </div>
      );
    }
  };

  handleRedirect = currencyId => {
    this.setState({ searchQuery: "", searchResults: [] });
    this.props.history.push(`/currency/${currencyId}`);
  };

  render() {
    const { loading, searchQuery } = this.state;
    return (
      <div className="Search">
        <span className="Search-icon" />
        <input
          type="text"
          className="Search-input"
          name="searchQuery"
          placeholder="Currency Name"
          value={searchQuery}
          onChange={this.handleChange}
        />
        {loading && (
          <div className="Search-loading">
            <Loading width="12px" height="12px" />
          </div>
        )}
        {this.renderSearchResults()}
      </div>
    );
  }
}

export default withRouter(Search);
