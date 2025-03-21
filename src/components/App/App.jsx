import { useState, useEffect } from 'react';
import ImageGallery from '../ImageGallery/ImageGallery';
import SearchBar from '../SearchBar/SearchBar';
import { fetchImages } from '../../imageService';

import css from './App.module.css';

export default function App() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // async function getImages() {
    //   try {
    //     const data = await fetchImages();
    //     console.log(data);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
    // getImages();
  }, []);

  const handleSubmit = async topic => {
    try {
      const data = await fetchImages(topic);
      setImages(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={css.container}>
      <SearchBar onSubmit={handleSubmit} />
      <ImageGallery items={images} />
    </div>
  );
}
