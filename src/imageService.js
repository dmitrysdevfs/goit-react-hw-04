import axios from 'axios';

export const fetchImages = async (topic, currentPage) => {
  const response = await axios.get(`https://api.unsplash.com/search/photos`, {
    params: {
      client_id: 'CcDn3vQvUoDUocIcHEm7UUPlG03xSG4EfZsxFm86iCI',
      query: topic,
      orientation: 'landscape',
      per_page: 12,
      page: currentPage,
    },
  });

  return {
    results: response.data.results,
    total_pages: response.data.total_pages,
  };
};
