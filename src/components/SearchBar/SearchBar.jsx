import PropTypes from 'prop-types';
import { SearchForm } from 'components/SearchForm/SearchForm';
import { Searchbar } from './SearchBar.styled';

const SearchBar = ({ onSubmit }) => {
  return (
    <Searchbar>
      <SearchForm onSubmit={onSubmit} />
    </Searchbar>
  );
};

export { SearchBar };

SearchBar.propTypes = {
  onSubmit: PropTypes.func,
};
