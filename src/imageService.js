import axios from 'axios';

export const fetchImages = async topic => {
  const response = await axios.get(`https://api.unsplash.com/search/photos`, {
    params: {
      client_id: 'CcDn3vQvUoDUocIcHEm7UUPlG03xSG4EfZsxFm86iCI',
      query: topic,
      orientation: 'landscape',
    },
  });

  return response.data.results;
};
