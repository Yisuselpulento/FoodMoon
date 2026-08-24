// Resuelve la imagen de un producto:
// - productos base: nombre de archivo -> /images/<nombre>.webp
// - productos creados en el admin: data URL (subida) o URL http -> se usa tal cual
// - sin imagen -> logo por defecto (evita imagenes rotas)
export const productImg = (imagen) => {
  if (!imagen) return '/logo.svg'
  return imagen.startsWith('data:') || imagen.startsWith('http')
    ? imagen
    : `/images/${imagen}.webp`
}
