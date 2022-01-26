import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import { SearchBar } from './components/SearchBar/SearchBar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { LoaderSpinner } from './components/Loader/Loader';
import { LoadMoreBtn } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import s from './App.module.css';

class App extends Component {
  state = {
    baseUrl: 'https://pixabay.com/api/',
    key: '23677415-8b63517f25821789cc6d2523e',
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
      this.setState({ imgesData: [] });
    }

    if (
      prevState.searchQuery !== this.state.searchQuery ||
      prevState.page !== this.state.page
    ) {
      this.setState({ status: 'pending' });

      fetch(
        `${this.state.baseUrl}?q=${this.state.searchQuery}&page=${this.state.page}&key=${this.state.key}&image_type=photo&orientation=horizontal&per_page=12`,
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          }
        })
        .then(response => {
          if (this.state.page > 1) {
            this.setState(prevState => ({
              imgesData: [...prevState.imgesData, ...response.hits],
              status: 'resolved',
            }));
            window.scrollTo({
              top: document.documentElement.scrollHeight,
              behavior: 'smooth',
            });
            return;
          }
          if (response.total === 0) {
            this.setState({ status: 'rejected' });
            return toast.warn('🦄 Enter valid query!');
          }
          this.setState({ imgesData: response.hits, status: 'resolved' });
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
            {status !== 'pending' && (
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
