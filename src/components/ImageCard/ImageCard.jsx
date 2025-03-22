import css from './ImageCard.module.css';

export default function ImageCard({ item, onClick }) {
  return (
    <div className={css.wrapper}>
      <img
        onClick={onClick}
        src={item.urls.small}
        alt={item.alt_description}
        className={css.img}
      />
    </div>
  );
}
