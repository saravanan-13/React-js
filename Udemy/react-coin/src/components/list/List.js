import React, { Component } from "react";
import { handleResponse } from "../../helper";
import { API_URL } from "../../config";
import Loading from "../common/Loading";
import Table from "./Table";
import Pagination from "./Pagination";
class List extends Component {
  state = {};
  constructor() {
    super();
    this.state = {
      loading: false,
      currencies: [],
      error: null,
      page: 1,
      totalPages: 0
    };
  }
  componentDidMount() {
    this.fetchdata();
  }
  fetchdata = () => {
    const { page } = this.state;
    this.setState({ loading: true });
    fetch(`${API_URL}/cryptocurrencies?page=${page}&perPage=20`)
      .then(handleResponse)
      .then(data => {
        const { currencies, totalPages } = data;
        this.setState({ currencies, totalPages, loading: false });
      })
      .catch(error => {
        this.setState({ error: error.errorMessage, loading: false });
      });
  };

  changePage = direction => {
    let nextPage = this.state.page;
    nextPage = direction === "prev" ? nextPage - 1 : nextPage + 1;
    this.setState({ page: nextPage }, () => {
      this.fetchdata();
    });
  };

  render() {
    const { loading, currencies, error, page, totalPages } = this.state;
    if (loading)
      return (
        <div className="loading-container">
          <Loading />
        </div>
      );
    if (error) return <div className="error">{error}</div>;
    return (
      <div>
        <Table currencies={currencies} />
        <Pagination
          page={page}
          totalPages={totalPages}
          changePage={this.changePage}
        />
      </div>
    );
  }
}

export default List;
