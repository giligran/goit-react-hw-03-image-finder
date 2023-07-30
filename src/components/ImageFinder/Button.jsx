import PropTypes from 'prop-types';
import { LoadMoreBtn, ButtonWrapper } from './ImageFinder.styled';

function Button({ onLoadMore }) {
  return (
    <ButtonWrapper>
      <LoadMoreBtn type="click" onClick={() => onLoadMore()}>
        Load more
      </LoadMoreBtn>
    </ButtonWrapper>
  );
}

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};

export default Button;
