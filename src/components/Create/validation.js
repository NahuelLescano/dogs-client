export default function validation({
    weightMin,
    weightMax,
    heightMin,
    heightMax,
    name,
    life_span,
    image,
    temperaments,
}) {
  const regexName = /^([a-zA-Z ]+)$/i;
  const regexImage = /^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg)\??.*$/i;
  const errors = {};

  if (name === '') {
    errors.name = 'Provide the necessary info.';
  } else if (!regexName.test(name)) {
    errors.name = 'It cannot have special characters or numbers.';
  }

  if (
    isNaN(weightMin) ||
    isNaN(weightMax) ||
    isNaN(heightMin) ||
    isNaN(heightMax)
  ) {
    errors.weightMin = 'Only numbers.';
    errors.weightMax = 'Only numbers.';
    errors.heightMin = 'Only numbers.';
    errors.heightMax = 'Only numbers.';
  }

  if (
    parseInt(weightMax) < parseInt(weightMin) ||
    parseInt(heightMax) < parseInt(heightMin)
  ) {
    errors.weightMax = 'Maximum must be greater than minimum.';
    errors.heightMax = 'Maximum must be greater than minimum.';
  }

  if (
    parseInt(weightMin) > parseInt(weightMax) ||
    parseInt(heightMin) > parseInt(heightMax)
  ) {
    errors.weightMin = '';
    errors.weightMax = 'weightMax must be maximum';
    errors.heightMin = '';
    errors.heightMax = 'heightMax must be maximum';
  }

  if (
    parseInt(weightMax) > parseInt(weightMin) ||
    parseInt(heightMax) > parseInt(heightMin)
  ) {
    errors.weightMin = '';
    errors.weightMax = '';
    errors.heightMin = '';
    errors.heightMax = '';
  }

  if (life_span === '') {
    errors.life_span = 'Provide the necessary info.';
  } else if (!life_span.includes('-')) {
    if (isNaN(life_span)) {
      errors.life_span = 'error';
    } else {
      errors.life_span = '';
    }
  } else {
    const aux = life_span.split('-');
    const number = aux.every((value) => {
      return !isNaN(value);
    });
    if (!number || aux.length < 1) {
      errors.life_span = 'error';
    } else {
      errors.life_span = '';
    }
  }

  if (temperaments.length < 1) {
    errors.temperaments = 'Choose at least 2 temperaments';
  } else {
    errors.temperaments = '';
  }

  if (image === '' || !regexImage.test(image)) {
    errors.image = 'error';
  } else {
    errors.image = '';
  }

  return errors;
}
