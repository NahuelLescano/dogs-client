const regexName = /^([a-zA-Z ]+)$/i;
const regexImage = /^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg)\??.*$/i;

export default function validation({
  weightMin,
  weightMax,
  heightMin,
  heightMax,
  name,
  lifeSpan,
  image,
  temperament,
}) {
  weightMin = parseInt(weightMin);
  weightMax = parseInt(weightMin);
  heightMin = parseInt(heightMin);
  heightMax = parseInt(heightMax);

  const errors = {};
  if (isNaN(weightMin) && isNaN(weightMax)) {
    errors.weight = 'Debe completar el campo "peso"';
  }
  if (weightMin > weightMax) {
    errors.weight = 'Peso mínimo no puede ser mayor al peso máximo';
  }
  if (isNaN(heightMin) && isNaN(heightMax)) {
    errors.height = 'Debe completar el campo "altura"';
  }
  if (heightMin > heightMax) {
    errors.height = 'Altura máxima no puede ser menor a altura mínima';
  }
  if (!name || !regexName.test(name)) {
    errors.name = '"nombre" no puede tener caracteres especiales o números';
  }
  if (!lifeSpan) {
    errors.lifeSpan = 'Por favor, complete este campo';
  }
  if (!image || !regexImage.test(image)) {
    errors.image = 'Por favor, verifique la URL de la imagen';
  }
  if (!temperament) {
    errors.temperament = 'Por favor, elija al menos un temperamento';
  }

  return errors;
}
