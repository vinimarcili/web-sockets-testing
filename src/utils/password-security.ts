import { randomBytes, scryptSync } from "crypto"

export function hashPassword(password: string) {
  const sal = randomBytes(16).toString('hex')

  const hash = scryptSync(password, sal, 64).toString('hex')

  return `${sal}:${hash}`
}