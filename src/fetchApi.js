import axios from 'axios';

var API_KEY = '23677415-8b63517f25821789cc6d2523e';
axios.defaults.baseURL = 'https://pixabay.com/api/';

const imagesApi = {
  fetchWithQuery(searchQuery, page) {
    const searchParams = new URLSearchParams({
      key: API_KEY,
      q: searchQuery,
      page: page,
      per_page: 12,
      orientation: 'horizontal',
      image_type: 'photo',
    });

    return axios.get(`?${searchParams}`).then(res =>
      res.data.hits.map(({ id, webformatURL, largeImageURL, tags }) => ({
        id,
        webformatURL,
        largeImageURL,
        tags,
      })),
    );
  },
};

export { imagesApi };
