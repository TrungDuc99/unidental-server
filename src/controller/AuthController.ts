import { Request, Response } from 'express'
import { UserModel } from '../models'
const jwt = require('jsonwebtoken')
require('dotenv').config()
const bcrypt = require('bcrypt')
const secretKey: any = process.env.TOKEN_SECRET_KEY

const secretKeyID: any = process.env.TOKEN_SECRET_KEY_ID_COCIAL

export default class AuthCallback {
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body
      const user = await UserModel.findOne({ email: email }) // find the user by email

      if (!user) {
        return res.status(401).send({ message: 'Invalid username or password' }) // return the error message when the user does not exist
      }
      // Kiểm tra password
      const isPasswordValid = await bcrypt.compare(password, user.password)

      if (!isPasswordValid) {
        return res.status(401).send({ message: 'Invalid username or password' })
      }
      // Tạo JWT token và trả về cho client
      const token = jwt.sign(
        {
          user: {
            uid: user._id,
            email: user.email,
            name: user.name,
            phone: user.phone,
            address: user.address,
          },
        },
        secretKey
        // {
        //   expiresIn: '30s', // expires in 30 days
        // }
      )
      return res.status(200).send({ token })
    } catch (err) {
      res.status(500).json({ error: err })
    }
  }
  static async loginBySocial(req: Request, res: Response) {
    try {
      const { id, data } = req.body

      const user = await UserModel.findOne({ id: id })
      if (user) {
        const token = jwt.sign(
          {
            user: {
              uid: user._id,
              id: user.id,
              avatarUrl: user.avatarUrl,
              email: user.email,
              name: user.name,
              phone: user.phone,
              address: user.address,
            },
          },
          secretKey
        )
        return res.status(200).send({ token, newUser: false })
      } else {
        const { email, id, name, avatarUrl } = data

        const payload = await UserModel.create({
          email,
          name,
          id,
          avatarUrl,
        })
        const token = jwt.sign(
          {
            user: {
              ...data,
            },
          },
          secretKey
        )
        return res.status(200).send({ token, newUser: true, data: payload })
      }
    } catch (err) {
      res.status(500).json({ error: err })
    }
  }
  static async register(req: Request, res: Response) {
    try {
      const { email, id, name, password, phone, address, avatarUrl } = req.body
      const hashedPassword = await bcrypt.hash(password, 10)
      const payload = await UserModel.create({
        email,
        name,
        id,
        password: hashedPassword,
        phone,
        avatarUrl,
        address,
      })

      return res.json({ success: true, data: payload })
    } catch (err) {
      res.status(500).json({ error: err })
    }
  }
  static async registerBySocial(req: Request, res: Response) {
    try {
      const { email, id, name, birthday, avatarUrl } = req.body

      const payload = await UserModel.create({
        email,
        name,
        id,
        birthday,
        avatarUrl,
      })

      return res.json({ success: true, data: payload })
    } catch (err) {
      res.status(500).json({ error: err })
    }
  }
  static async logout(req: Request, res: Response) {
    try {
      const { name, description, image, id } = req.body

      const payload = await UserModel.create({
        name,
        id,
        description,
        image,
      })
      return res.json({ success: true, data: payload })
    } catch (err) {
      res.status(500).json({ error: err })
    }
  }
  static async me(req: any, res: Response) {
    try {
      const userID = req.user.user._id // Lấy id của user.
      const id = req.user.user.id
      let payload

      if (userID) {
        payload = await UserModel.findOne({ _id: userID })
      } else if (id) {
        payload = await UserModel.findOne({ id: id })
      }

      if (!payload) {
        return res.status(404).send({ message: 'User not found' })
      }

      return res.send(payload)
    } catch (err) {
      res.status(500).json({ error: err })
    }
  }
}
