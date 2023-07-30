import axios from 'axios';

const KEY = '37225834-865f532e88eda3622dc991a4d';
const URL = 'https://pixabay.com/api/';
const PER_PAGE = 12;

export async function getImages(searchQuery, pageCount) {
  const params = {
    params: {
      key: KEY,
      q: searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: pageCount,
      per_page: PER_PAGE,
    },
  };

  const response = await axios.get(URL, params);
  const data = await response.data;
  return data;
}
