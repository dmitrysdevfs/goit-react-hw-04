import { Formik, Form, Field } from 'formik';
import css from './SearchBar.module.css';

export default function SearchBar({ onSubmit }) {
  return (
    <header className={css.header}>
      <Formik
        initialValues={{
          topic: '',
        }}
        onSubmit={(values, actions) => {
          onSubmit(values.topic.trim());
          actions.setSubmitting(false);
        }}
      >
        <Form className={css.form}>
          <div className={css.inputWrapper}>
            <button type="submit" className={css.iconButton}>
              🔍
            </button>
            <Field
              type="text"
              name="topic"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              className={css.input}
            />
          </div>
          <button type="submit" className={css.hiddenButton}>
            Search
          </button>
        </Form>
      </Formik>
    </header>
  );
}
