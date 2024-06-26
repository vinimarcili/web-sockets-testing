import { randomBytes, scryptSync, timingSafeEqual } from "crypto"
import jwt from 'jsonwebtoken'

export function hashPassword(password: string) {
  const sal = randomBytes(16).toString('hex')
  const hash = scryptSync(password, sal, 64).toString('hex')
  return `${sal}:${hash}`
}

export function validatePassword(password: string, salHash: string) {
  const [sal, hash] = salHash.split(':')
  const testingHash = scryptSync(password, sal, 64)
  const realHash = Buffer.from(hash, 'hex')
  return timingSafeEqual(testingHash, realHash)
}

export function generateJWT(username: string) {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined')
  }
  return jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' })
}