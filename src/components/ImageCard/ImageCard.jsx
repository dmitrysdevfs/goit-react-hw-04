import css from './ImageCard.module.css';

export default function ImageCard({ item }) {
  return (
    <div className={css.wrapper}>
      <img
        src={item.urls.small}
        alt={item.alt_description}
        className={css.img}
      />
    </div>
  );
}
