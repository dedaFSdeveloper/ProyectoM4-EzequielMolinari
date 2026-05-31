import { describe, it, expect } from 'vitest'
import { isValidEmail, isValidPassword } from '../src/utils/validators'

describe('isValidEmail', () => {
  it('retorna true con un email valido', () => {
    expect(isValidEmail('test@test.com')).toBe(true)
  })

  it('retorna false si no tiene @', () => {
    expect(isValidEmail('testtest.com')).toBe(false)
  })

  it('retorna false si esta vacio', () => {
    expect(isValidEmail('')).toBe(false)
  })
})

describe('isValidPassword', () => {
  it('retorna true con contraseña de 6 caracteres', () => {
    expect(isValidPassword('123456')).toBe(true)
  })

  it('retorna false con menos de 6 caracteres', () => {
    expect(isValidPassword('123')).toBe(false)
  })

  it('retorna false si esta vacia', () => {
    expect(isValidPassword('')).toBe(false)
  })
})