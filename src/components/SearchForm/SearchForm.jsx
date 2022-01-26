import { Component } from 'react';
import PropTypes from 'prop-types';
import { FcSearch } from 'react-icons/fc';
import { toast } from 'react-toastify';
import { Form, SearchButton, SearchInput } from './SearchForm.styled';

class SearchForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    searchQuery: '',
  };

  handleNameChange = e => {
    this.setState({ searchQuery: e.currentTarget.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.searchQuery.trim() === '') {
      return toast.warn('🦄 Enter valid query!');
    }

    this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: '' });
  };

  render() {
    return (
      <>
        <Form onSubmit={this.handleSubmit}>
          <SearchButton type="submit">
            <FcSearch style={{ marginTop: 4, width: 25, height: 25 }} />
          </SearchButton>

          <SearchInput
            type="text"
            name="searchQuery"
            autocomplete="off"
            placeholder="Search images and photos"
            value={this.state.searchQuery}
            onChange={this.handleNameChange}
          />
        </Form>
      </>
    );
  }
}

export { SearchForm };
