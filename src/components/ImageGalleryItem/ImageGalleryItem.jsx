import PropTypes from 'prop-types';
import { ImageGalleryItemImg } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({
  imageSrc,
  onModalOpen,
  largeImageUrl,
  description,
}) => {
  return (
    <ImageGalleryItemImg
      src={imageSrc}
      alt={description}
      onClick={() => onModalOpen(largeImageUrl, description)}
    />
  );
};

export { ImageGalleryItem };

ImageGalleryItem.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onModalOpen: PropTypes.func.isRequired,
  largeImageUrl: PropTypes.string.isRequired,
};
