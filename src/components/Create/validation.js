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
        [name]: { booleano: false, value },
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
        [name]: { booleano: false, value },
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
        [name]: { booleano: false, value: measure[name].value },
      })
    );
  }
  if (
    (name === 'weightMax' &&
      parseInt(value) < parseInt(measure.weightMin.value)) ||
    (name === 'heightMax' &&
      parseInt(value) < parseInt(measure.heightMin.value)) ||
    (name === 'weightMax' &&
      parseInt(value) === parseInt(measure.weightMin.value)) ||
    (name === 'heightMax' &&
      parseInt(value) === parseInt(measure.heightMin.value))
  ) {
    return (
      setErrors({
        ...errors,
        [name]: 'Maximum must be greater than minimum.',
      }),
      setMeasure({
        ...measure,
        [name]: { booleano: false, value: measure[name].value },
      })
    );
  }
  if (
    (name === 'weightMin' &&
      parseInt(value) > parseInt(measure.weightMax.value)) ||
    (name === 'heightMin' &&
      parseInt(value) > parseInt(measure.heightMax.value)) ||
    (name === 'weightMin' &&
      parseInt(value) === parseInt(measure.weightMax.value)) ||
    (name === 'heightMin' &&
      parseInt(value) === parseInt(measure.heightMax.value))
  ) {
    const aux = name === 'weightMin' ? 'weightMax' : 'heightMax';
    return (
      setErrors({
        ...errors,
        [aux]: `${aux} must be maximum`,
        [name]: '',
      }),
      setMeasure({
        ...measure,
        [name]: { booleano: false, value },
        [aux]: { booleano: false, value: measure[aux].value },
      })
    );
  }
  if (
    (name === 'weightMax' &&
      parseInt(value) > parseInt(measure.weightMin.value)) ||
    (name === 'heightMax' &&
      parseInt(value) > parseInt(measure.heightMin.value))
  ) {
    const aux = name === 'weightMax' ? 'weightMin' : 'heightMin';
    return (
      setErrors({
        ...errors,
        [name]: '',
        [aux]: '',
      }),
      setMeasure({
        ...measure,
        [name]: { booleano: true, value },
        [aux]: { booleano: true, value: measure[aux].value },
      })
    );
  }
  if (
    (name === 'weightMin' &&
      parseInt(value) < parseInt(measure.weightMax.value)) ||
    (name === 'heightMin' &&
      parseInt(value) < parseInt(measure.heightMax.value))
  ) {
    const aux = name === 'weightMin' ? 'weightMax' : 'heightMax';
    return (
      setErrors({
        ...errors,
        [name]: '',
        [aux]: '',
      }),
      setMeasure({
        ...measure,
        [name]: { booleano: true, value },
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
          [name]: { booleano: false, value: measure[name].value },
        }))
      : (setErrors({
          [name]: '',
        }),
        setMeasure({
          ...measure,
          [name]: { booleano: true, value },
        }));
  }
  if (name === 'life_span' && value.includes('-')) {
    const aux = value.split('-');
    var number = aux.every((valor) => {
      return !isNaN(valor);
    });
    return !number || aux.length < 1
      ? (setErrors({
          [name]: 'error',
        }),
        setMeasure({
          ...measure,
          [name]: { booleano: false, value: measure[name].value },
        }))
      : (setErrors({
          [name]: '',
        }),
        setMeasure({
          ...measure,
          [name]: { booleano: true, value },
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
            booleano: false,
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
            booleano: true,
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
        [name]: { booleano: false, value },
      })
    );
  } else {
    setErrors({
      ...errors,
      [name]: '',
    });
    setMeasure({
      ...measure,
      [name]: { booleano: true, value },
    });
  }
}
