import { Oval } from 'react-loader-spinner';
import { LoaderWrapper } from './ImageFinder.styled';

function Loader() {
  return (
    <LoaderWrapper>
      <Oval color="#3f51b5" secondaryColor="#3f51b5" />
    </LoaderWrapper>
  );
}

export default Loader;
