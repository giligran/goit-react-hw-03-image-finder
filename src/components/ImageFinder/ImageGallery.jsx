import PropTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem';
import { ImageGalleryList } from './ImageFinder.styled';

function ImageGallery({ images }) {
  return (
    <ImageGalleryList>
      {images.map(image => {
        return <ImageGalleryItem key={image.id} hit={image} />;
      })}
    </ImageGalleryList>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      // Здесь можете добавить другие свойства изображения
    })
  ).isRequired,
};

export default ImageGallery;
