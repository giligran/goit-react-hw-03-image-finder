import React from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItemStyled, ImageGallery } from './ImageFinder.styled';
import Modal from './Modal';

class ImageGalleryItem extends React.Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
    }));
  };

  render() {
    const { showModal } = this.state;
    const { largeImageURL, previewURL, tags } = this.props.hit;
    return (
      <>
        <ImageGalleryItemStyled onClick={this.toggleModal}>
          <ImageGallery src={previewURL} alt={tags} loading="lazy" />
        </ImageGalleryItemStyled>
        {showModal && (
          <Modal
            toggleModal={this.toggleModal}
            imageURL={largeImageURL}
            tags={tags}
          />
        )}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  hit: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    previewURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    // Добавьте другие свойства изображения, если есть
  }).isRequired,
};

export default ImageGalleryItem;
