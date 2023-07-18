import bcrypt from 'bcrypt'
import { COOKIE_NAME } from '~env';
import { validateJWT } from './jwt';
import { db } from './db'

export const hashPassword = (password) => bcrypt.hash(password, 10)

export const comparePasswords = (plainTextPassword, hashedPassword) => bcrypt.compare(plainTextPassword, hashedPassword)

export const getUserFromCookie = async (cookies) => {
  const jwt = cookies.get(COOKIE_NAME)

  const {id} = await validateJWT(jwt.value)

  const user = await db.user.findUnique({
    where: {
      id
    }
  })

  return user
}