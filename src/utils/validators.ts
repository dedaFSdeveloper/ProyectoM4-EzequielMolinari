export const isValidEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

export const isValidPassword = (password: string): boolean => {
  // minimo 6 caracteres, que es lo que pide Firebase por defecto
  return password.length >= 6
}
