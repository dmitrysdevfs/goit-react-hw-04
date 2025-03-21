import css from './LoadMoreBtn.module.css';

export default function LoadMoreBtn({ onClick }) {
  return (
    <div>
      <button onClick={onClick} className={css.button}>
        Load more
      </button>
    </div>
  );
}
