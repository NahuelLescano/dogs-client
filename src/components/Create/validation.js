const regexName = /^([a-zA-Z ]+)$/i;
const regexImage = /^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg)\??.*$/i;

export default function validation({
  name,
  value,
  errors,
  setErrors,
  measure,
  setMeasure,
}) {
  if (value === '') {
    return (
      setErrors({
        ...errors,
        [name]: 'Provide the necessary info.',
      }),
      setMeasure({
        ...measure,
        [name]: { boolean: false, value },
      })
    );
  }
  if (name === 'name' && !regexName.test(value)) {
    return (
      setErrors({
        ...errors,
        [name]: 'It cannot have especial caracters or numbers.',
      }),
      setMeasure({
        ...measure,
        [name]: { boolean: false, value },
      })
    );
  }
  if (
    (name === 'weightMin' && isNaN(value)) ||
    (name === 'weightMax' && isNaN(value)) ||
    (name === 'heightMin' && isNaN(value)) ||
    (name === 'heightMax' && isNaN(value))
  ) {
    return (
      setErrors({
        ...errors,
        [name]: 'Only numbers.',
      }),
      setMeasure({
        ...measure,
        [name]: { boolean: false, value: measure[name].value },
      })
    );
  }
  if (name === 'life_span' && !value.includes('-')) {
    return isNaN(value)
      ? (setErrors({
          [name]: 'error',
        }),
        setMeasure({
          ...measure,
          [name]: { boolean: false, value: measure[name].value },
        }))
      : (setErrors({
          [name]: '',
        }),
        setMeasure({
          ...measure,
          [name]: { boolean: true, value },
        }));
  }
  if (name === 'temperaments') {
    return measure.temperaments.value.length < 1
      ? (setErrors({
          [name]: 'Choose at least 2 temperaments',
        }),
        setMeasure({
          ...measure,
          [name]: {
            boolean: false,
            value: [...measure.temperaments.value, value],
          },
        }))
      : (setErrors({
          ...errors,
          [name]: '',
        }),
        setMeasure({
          ...measure,
          [name]: {
            boolean: true,
            value: [...measure.temperaments.value, value],
          },
        }));
  }
  if (name === 'image' && !regexImage.test(value)) {
    return (
      setErrors({
        ...errors,
        [name]: 'error',
      }),
      setMeasure({
        ...measure,
        [name]: { boolean: false, value },
      })
    );
  } else {
    setErrors({
      ...errors,
      [name]: '',
    });
    setMeasure({
      ...measure,
      [name]: { boolean: true, value },
    });
  }
}
