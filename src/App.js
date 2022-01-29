import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { SearchBar } from './components/SearchBar/SearchBar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { LoaderSpinner } from './components/Loader/Loader';
import { LoadMoreBtn } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import { imagesApi } from 'fetchApi';
import s from './App.module.css';

class App extends Component {
  state = {
    searchQuery: '',
    imgesData: [],
    page: 1,
    isModalOpen: false,
    largeImageUrl: '',
    description: '',
    status: 'idle',
  };
  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery });
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.imgesData.length > 1 &&
      prevState.searchQuery !== this.state.searchQuery
    ) {
      this.setState({ imgesData: [], page: 1 });
    }

    if (
      prevState.searchQuery !== this.state.searchQuery ||
      prevState.page !== this.state.page
    ) {
      this.setState({ status: 'pending' });

      imagesApi
        .fetchWithQuery(this.state.searchQuery, this.state.page)
        .then(response => {
          console.log(response.length);
          if (response.length === 0) {
            this.setState({ status: 'rejected' });
            return;
          }
          if (response.length < 12) {
            this.setState({
              imgesData: [...prevState.imgesData, ...response],
              status: 'rejected',
            });
            return;
          }
          if (this.state.page > 1) {
            this.setState(prevState => ({
              imgesData: [...prevState.imgesData, ...response],
              status: 'resolved',
            }));
            return;
          }
          this.setState({ imgesData: response, status: 'resolved' });
        })
        .catch(error => {
          console.log(error);
          this.setState({ status: 'rejected' });
        });
    }
  }

  handleLoadMoreBtnClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleModalOpen = (largeImageUrl, description) =>
    this.setState({
      isModalOpen: true,
      largeImageUrl,
      description,
    });

  handleModalClose = () => this.setState({ isModalOpen: false });

  render() {
    const { status, isModalOpen, largeImageUrl, description } = this.state;
    return (
      <div className={s.App}>
        <SearchBar onSubmit={this.handleFormSubmit} />
        {this.state.imgesData.length > 0 && (
          <>
            <ImageGallery
              data={this.state.imgesData}
              onModalOpen={this.handleModalOpen}
            />
            {status !== 'pending' && status !== 'rejected' && (
              <LoadMoreBtn onClick={this.handleLoadMoreBtnClick} />
            )}
          </>
        )}

        {status === 'pending' && <LoaderSpinner />}
        {isModalOpen && (
          <Modal
            largeImageUrl={largeImageUrl}
            description={description}
            onModalClose={this.handleModalClose}
          />
        )}
        <ToastContainer position="top-center" />
      </div>
    );
  }
}

export { App };
