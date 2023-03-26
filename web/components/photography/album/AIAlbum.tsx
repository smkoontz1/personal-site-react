import React, { useState, useEffect } from 'react';
import styles from '../../../styles/photo/album/AIAlbum.module.scss';

type PhotoAlbumProps = {
  images: string[];
};

const AIAlbum: React.FC<PhotoAlbumProps> = ({ images }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [maxHeight, setMaxHeight] = useState(0);

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
  };

  const handleModalPrev = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleModalNext = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const selectedImage = images[selectedImageIndex];

  useEffect(() => {
    const handleResize = () => {
      const selectedImageEl = document.querySelector(`.${styles.selectedImage} img`) as HTMLElement;
      if (selectedImageEl) {
        const selectedImageHeight = selectedImageEl.clientHeight;
        const windowHeight = window.innerHeight;
        const newMaxHeight = windowHeight - selectedImageHeight;
        setMaxHeight(newMaxHeight);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={styles.photoAlbum}>
      <div className={styles.selectedImage}>
        <img
          src={selectedImage}
          alt="Selected"
          onClick={() => setModalIsOpen(true)}
        />
      </div>
      <div className={styles.imageList} style={{ maxHeight }}>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index}`}
            className={index === selectedImageIndex ? styles.active : ''}
            onClick={() => handleImageClick(index)}
          />
        ))}
      </div>
      {modalIsOpen && (
        <div className={styles.modal}>
          <button className={`${styles.modalButton} ${styles.prev}`} onClick={handleModalPrev}>
            {'<'}
          </button>
          <img
            src={selectedImage}
            alt="Selected"
            onClick={() => setModalIsOpen(false)}
          />
          <button className={`${styles.modalButton} ${styles.next}`} onClick={handleModalNext}>
            {'>'}
          </button>
          <button className={styles.modalButtonClose} onClick={handleModalClose}>
            {'x'}
          </button>
        </div>
      )}
    </div>
  );
};

export { AIAlbum };
