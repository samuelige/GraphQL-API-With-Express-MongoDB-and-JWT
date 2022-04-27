import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

interface Token {
    _id: string
}

const secret = process.env.SECRET as string

const hashPassword = async (password: string) => {
    const salt = process.env.SALT_ROUNDS as string
    return bcrypt.hash(password, parseInt(salt))
};

const comparePasswords = (plainText: string, hash: string) => {
    return bcrypt.compare(plainText, hash)
}

const createJwtToken = (details: Token) => {
    return jwt.sign(details, secret, { expiresIn: '4h' })
}


export { hashPassword, comparePasswords, createJwtToken }