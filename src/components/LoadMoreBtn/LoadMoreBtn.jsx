import React from 'react';
import css from './LoadMoreBtn.module.css';

const LoadMoreBtn = React.forwardRef(function LoadMoreBtn({ onClick }, ref) {
  return (
    <div>
      <button ref={ref} onClick={onClick} className={css.button}>
        Load more
      </button>
    </div>
  );
});

export default LoadMoreBtn;
