import ReactModal from 'react-modal';

import css from './ImageModal.module.css';

ReactModal.setAppElement('#root');

export default function ImageModal({ isOpen, onRequestClose, imageData }) {
  if (!imageData) return null;

  // Destructuring imageDate
  const {
    likes,
    urls,
    alt_description,
    user = {},
    location = {},
    created_at,
    description,
  } = imageData;

  const formattedDate = created_at
    ? new Date(created_at).toLocaleDateString()
    : 'Unknown date';

  return (
    <ReactModal
      key={imageData?.id || 'modal'}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          zIndex: 1000,
          backdropFilter: 'blur(5px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        content: {
          position: 'relative',
          top: 'auto',
          left: 'auto',
          right: 'auto',
          bottom: 'auto',
          maxWidth: '95vw',
          maxHeight: '95vh',
          width: 'auto',
          height: 'auto',
          margin: 0,
          padding: 0,
          border: 'none',
          background: 'transparent',
          overflow: 'hidden',
          borderRadius: '12px',
        },
      }}
    >
      <div className={css.imageWrapper}>
        {/* Image */}
        <img
          src={urls.regular}
          alt={alt_description || 'Image'}
          className={css.image}
        />

        {/* About author */}
        <div className={css.authorInfo}>
          {/* userInfo */}
          <div className={css.authorDetails}>
            {user.profile_image && (
              <img
                src={user.profile_image.medium}
                alt={user.name || 'Author'}
                className={css.authorImage}
              />
            )}
            <div>
              {/* Username */}
              <div className={css.authorName}>
                {user.name || 'Unknown author'}
              </div>
              {/* Instagram or Twitter */}
              {user.username && (
                <div className={css.authorUsername}>@{user.username}</div>
              )}
              {/* Location */}
              {user.location && (
                <div className={css.authorLocation}>{`${user.location}`}</div>
              )}
            </div>
          </div>

          {/* Likes */}
          <div className={css.likes}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="rgba(255,255,255,0.8)"
              width="18px"
              height="18px"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <span>{likes || '0'}</span>
          </div>
        </div>
        <div className={css.publishedContainer}>
          <h3 className={css.publishedTitle}>Published</h3>
          <p className={css.publishedDate}>{formattedDate}</p>
        </div>
      </div>
    </ReactModal>
  );
}
