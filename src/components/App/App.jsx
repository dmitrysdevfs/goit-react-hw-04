import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import ImageGallery from '../ImageGallery/ImageGallery';
import SearchBar from '../SearchBar/SearchBar';
import { fetchImages } from '../../imageService';
import Loader from '../Loader';

import css from './App.module.css';
import ErrorMessage from '../ErrorMessage';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';

export default function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const handleSubmit = topic => {
    if (topic === searchTerm) {
      return;
    }
    setSearchTerm(topic);
    setPage(1);
    setImages([]);
    setTotalPages(0);
  };

  const handleLoadMoreClick = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    if (searchTerm === '') {
      return;
    }

    async function getData() {
      try {
        setError(false);
        setLoading(true);

        const response = await fetchImages(searchTerm, page);

        const { results, total_pages } = response;

        if (!results || results.length === 0) {
          toast.info('No results found for your search. Try a different term.');
          setLoading(false);
          return;
        }

        setTotalPages(total_pages || 0);

        setImages(prevImages => {
          return page === 1 ? [...results] : [...prevImages, ...results];
        });
      } catch {
        setError(true);
        toast.error('An error occurred. Please try reloading the page.');
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [page, searchTerm]);

  return (
    <div className={css.container}>
      <SearchBar onSubmit={handleSubmit} />
      {error && <ErrorMessage />}
      {images.length > 0 && <ImageGallery items={images} />}
      {loading && <Loader />}
      {images.length > 0 && !loading && page < totalPages && (
        <LoadMoreBtn onClick={handleLoadMoreClick} />
      )}
      <Toaster position="top-right" />
    </div>
  );
}
