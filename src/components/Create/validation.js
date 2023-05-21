const regexName = /^([a-zA-Z ]+)$/i;
const regexImage = /^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg)\??.*$/i;

export default function validation({
  weight,
  height,
  name,
  lifeSpan,
  image,
  temperament,
}) {
  const errors = {};
  if (!weight || !weight.min || !weight.max) {
    errors.weight = 'Debe completar el campo "peso"';
  }
  if (parseInt(weight.min) > parseInt(weight.max)) {
    errors.weight = 'Peso mínimo no puede ser mayor al peso máximo';
  }
  if (!height || !height.min || !height.max) {
    errors.height = 'Debe completar el campo "altura"';
  }
  if (parseInt(height.min) > parseInt(height.max)) {
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
