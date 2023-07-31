import React from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Searchbar, ImageGallery, Button, Loader } from './ImageFinder';
import { getImages } from './api/api';
export default class App extends React.Component {
  state = {
    hits: [],
    page: 1,
    searchQuery: '',
    isLoading: false,
    showLoadMoreBtn: false,
    error: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state;
    if (prevState.searchQuery !== searchQuery || page !== prevState.page) {
      this.fetchImages();
    }
  }

  fetchImages = async () => {
    const { searchQuery, page } = this.state;

    this.setState({
      isLoading: true,
    });

    try {
      const response = await getImages(searchQuery, page);
      const totalPages = Math.ceil(response.totalHits / 12);
      if (response.hits.length === 0) {
        Notify.warning(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }

      this.setState(({ hits }) => ({
        hits: [...hits, ...response.hits],
        page,
        totalPages,
      }));

      if (page === 1) {
        Notify.success(`Hooray! We found ${response.totalHits} images.`);
      }

      if (page >= totalPages) {
        Notify.warning(
          "We're sorry, but you've reached the end of search results."
        );
      }
    } catch (error) {
      this.setState({
        error,
      });
      Notify.failure(`Oops, something went wrong: ${error.message}`);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSubmit = data => {
    this.setState({
      hits: [],
      searchQuery: data.queryValue,
      page: 1,
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { hits, isLoading, totalPages, page } = this.state;
    const isNotEmpty = hits.length !== 0;
    const isNotEndList = page < totalPages;
    return (
      <>
        <Searchbar onSubmit={this.handleSubmit} />
        {hits.length > 0 ? <ImageGallery images={hits} /> : null}
        {isLoading ? (
          <Loader />
        ) : (
          isNotEmpty &&
          isNotEndList && <Button onLoadMore={this.handleLoadMore} />
        )}
      </>
    );
  }
}
