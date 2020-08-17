import { useState, useEffect } from "react";

const useForm = (callback) => {
  const [heroesForm, setHeroesForm] = useState({ A: null, B: null });
  const [errors, setErrors] = useState({ A: false, B: false });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasErrors, setHasErrors] = useState(false);

  useEffect(() => {
    if (hasErrors) {
      setIsSubmitting(false);
      setErrors({
        A: !heroesForm.A,
        B: !heroesForm.B,
      });
    }
  }, [heroesForm]);

  useEffect(() => {
    if (isSubmitting && Object.values(errors).every((value) => !value)) {
      callback();
    }

    setHasErrors(Object.values(errors).some((value) => value));
  }, [errors]);

  function handleChange(value, key) {
    setHeroesForm({
      ...heroesForm,
      [key]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setErrors({
      A: !heroesForm.A,
      B: !heroesForm.B,
    });
  }

  function handleReset() {
    setHeroesForm({
      A: null,
      B: null,
    });
  }

  return {
    heroesForm,
    errors,
    hasErrors,
    handleChange,
    handleSubmit,
    handleReset,
  };
};

export default useForm;
