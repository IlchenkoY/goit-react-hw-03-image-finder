import PropTypes from 'prop-types';
import { Button } from './Button.styled';

const LoadMoreBtn = ({ onClick }) => {
  return (
    <Button type="button" onClick={onClick}>
      Load more
    </Button>
  );
};

export { LoadMoreBtn };

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
