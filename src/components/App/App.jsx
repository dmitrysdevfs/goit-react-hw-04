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
  const [serchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);

  const handleSubmit = topic => {
    setSearchTerm(topic);
    setPage(1);
    setImages([]);
  };

  const handleLoadMoreClick = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    if (serchTerm === '') {
      return;
    }

    async function getData() {
      try {
        setError(false);
        setLoading(true);
        const data = await fetchImages(serchTerm, page);
        setImages(prevImages => {
          return [...prevImages, ...data];
        });
      } catch {
        setError(true);
        toast.error('Please reload there was an error!');
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [page, serchTerm]);

  return (
    <div className={css.container}>
      <SearchBar onSubmit={handleSubmit} />
      {error && <ErrorMessage />}
      {images.length > 0 && <ImageGallery items={images} />}
      {loading && <Loader />}
      {images.length > 0 && !loading && (
        <LoadMoreBtn onClick={handleLoadMoreClick} />
      )}
      <Toaster position="top-right" />
    </div>
  );
}
