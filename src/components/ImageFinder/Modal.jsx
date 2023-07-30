import React from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { Overlay, ModalContainer } from './ImageFinder.styled';

const modalRoot = document.querySelector('#modal-root');

class Modal extends React.Component {
  overlayRef = React.createRef();

  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
  }

  onKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.toggleModal();
    }
  };

  overlayClick = e => {
    if (e.target === this.overlayRef.current) {
      this.props.toggleModal();
    }
  };

  render() {
    const { imageURL, tags } = this.props;

    return createPortal(
      <Overlay ref={this.overlayRef} onClick={this.overlayClick}>
        <ModalContainer>
          <img src={imageURL} alt={tags} />
        </ModalContainer>
      </Overlay>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  imageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

export default Modal;
