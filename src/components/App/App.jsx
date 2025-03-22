import { useState, useEffect, useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import ImageGallery from '../ImageGallery/ImageGallery';
import SearchBar from '../SearchBar/SearchBar';
import { fetchImages } from '../../imageService';
import Loader from '../Loader';

import css from './App.module.css';
import ErrorMessage from '../ErrorMessage';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import ImageModal from '../ImageModal/ImageModal';

export default function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = image => {
    setSelectedImage(image);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setSelectedImage(null);
  };

  const prevImagesLengthRef = useRef(0);

  const loadMoreBtnRef = useRef(null);

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
    prevImagesLengthRef.current = images.length;
    setPage(page + 1);
  };

  useEffect(() => {
    if (!loading && images.length > prevImagesLengthRef.current && page > 1) {
      if (loadMoreBtnRef.current) {
        loadMoreBtnRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    }
  }, [loading, images, page]);

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
      {images.length > 0 && (
        <ImageGallery items={images} onClick={handleImageClick} />
      )}
      {loading && <Loader />}
      {images.length > 0 && !loading && page < totalPages && (
        <LoadMoreBtn ref={loadMoreBtnRef} onClick={handleLoadMoreClick} />
      )}
      <Toaster position="top-right" />

      <ImageModal
        isOpen={isOpen}
        onRequestClose={handleCloseModal}
        imageData={selectedImage}
      />
    </div>
  );
}
