import PropTypes from 'prop-types';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryList, ImageGalleryListItem } from './ImageGallery.styled';

const ImageGallery = ({ data, onModalOpen }) => {
  return (
    <ImageGalleryList>
      {data.map(el => (
        <ImageGalleryListItem key={el.id}>
          <ImageGalleryItem
            description={el.tags}
            imageSrc={el.webformatURL}
            onModalOpen={onModalOpen}
            largeImageUrl={el.largeImageURL}
          />
        </ImageGalleryListItem>
      ))}
    </ImageGalleryList>
  );
};

export { ImageGallery };

ImageGallery.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
};
