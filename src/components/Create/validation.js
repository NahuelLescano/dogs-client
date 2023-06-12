export default function validation({
  weightMin,
  weightMax,
  heightMin,
  heightMax,
  name,
  life_span,
  image,
  temperament,
}) {
  console.log(temperament);
  const regexName = /^([a-zA-Z\s]+)$/i;
  const regexImage = /^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg)\??.*$/i;
  const errors = {};

  // name validations.
  if (!name) {
    errors.name = 'Must provide a name.';
  } else if (!regexName.test(name)) {
    errors.name = 'It cannot have special characters or numbers.';
  } else if (name.length > 20) {
    errors.name = 'Name is too long.';
  }

  // weight validations.
  if (!weightMin) {
    errors.weightMin = 'Enter a minimum weight.';
  } else if (isNaN(parseInt(weightMin))) {
    errors.weightMin = 'Only numbers.';
  } else if (parseInt(weightMin) < 1) {
    errors.weightMin = 'Enter a positive number.';
  }
  if (!weightMax) {
    errors.weightMax = 'Enter a maximum weight.';
  } else if (isNaN(parseInt(weightMax))) {
    errors.weightMax = 'Only numbers.';
  } else if (parseInt(weightMin) >= parseInt(weightMax)) {
    errors.weightMax = 'Maximum weight must be greater than minimum one.';
  }

  // height validations.
  if (!heightMin) {
    errors.heightMin = 'Enter a minimum height.';
  } else if (isNaN(parseInt(heightMin))) {
    errors.heightMin = 'Only numbers.';
  } else if (parseInt(heightMin) < 1) {
    errors.heightMin = 'Enter a positive number.';
  }
  if (!heightMax) {
    errors.heightMax = 'Enter a maximum height.';
  } else if (isNaN(parseInt(heightMax))) {
    errors.heightMax = 'Only numbers.';
  } else if (parseInt(heightMin) >= parseInt(heightMax)) {
    errors.heightMax = 'Maximum height must be greater the minimum one.';
  }

  // life span validations.
  if (!life_span) {
    errors.life_span = 'Must provide a number.';
  } else if (isNaN(parseInt(life_span))) {
    errors.life_span = 'Only numbers.';
  }

  // Temperament validation.
  if (temperament.length < 2) {
    errors.temperament = 'Choose at least 2 temperaments';
  }

  // Image validations.
  if (!image) {
    errors.image = 'Must provide an image url.';
  } else if (!regexImage.test(image)) {
    errors.image = 'Must provide a valide image url.';
  }

  return errors;
}
