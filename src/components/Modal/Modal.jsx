import { Component } from 'react';
import PropTypes from 'prop-types';
import { ModalEl, Overlay } from './Modal.styled';

class Modal extends Component {
  static propTypes = {
    description: PropTypes.string.isRequired,
    largeImageUrl: PropTypes.string.isRequired,
    onModalClose: PropTypes.func.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    console.log(e.code);
    if (e.code === 'Escape') {
      this.props.onModalClose();
    }
    if (e.code === 'ArrowRight') {
    }
  };

  handleOverlayClick = ({ target, currentTarget }) => {
    if (target === currentTarget) {
      this.props.onModalClose();
    }
  };

  render() {
    const { largeImageUrl, description } = this.props;

    return (
      <Overlay onClick={this.handleOverlayClick}>
        <ModalEl>
          <img src={largeImageUrl} alt={description} />
        </ModalEl>
      </Overlay>
    );
  }
}

export { Modal };
