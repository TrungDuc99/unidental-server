import { Request, Response } from 'express'
import { UserModel } from '../models'
require('dotenv').config()

const secretKey: any = process.env.TOKEN_SECRET_KEY

export default class UserCallback {
  static async get(req: Request, res: Response) {
    try {
      const payload = await UserModel.find().select(
        'email _id id name phone address avatarUrl created typeAccount'
      )
      return res.json({ succeeded: true, data: payload })
    } catch (err) {
      res.status(500).json({ error: err })
    }
  }
  static async searchUser(req: Request, res: Response) {
    try {
      const name = req.params.search

      const users = await UserModel.find({ name: { $regex: name, $options: 'i' } })

      return res.json({ succeeded: true, data: users })
    } catch (err) {
      res.status(500).json({ error: err })
    }
  }
  static async getOne(req: Request, res: Response) {
    try {
      const userID = req.params.id
      const payload = await UserModel.findOne({ _id: userID }).select(
        'email _id id name phone address avatarUrl created typeAccount'
      )
      return res.json({ succeeded: true, data: payload })
    } catch (err) {
      res.status(500).json({ error: err })
    }
  }
  static async create(req: Request, res: Response) {
    try {
      const { email, name, password, avatarUrl, phone, address, typeAccount } =
        req.body

      const payload = await UserModel.create({
        email,
        name,
        typeAccount,
        password,
        avatarUrl,
        phone,
        address,
      })

      return res.json({ succeeded: true, data: payload })
    } catch (err) {
      res.status(500).json({ error: err })
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params
      const { name, password, phone, address, avatarUrl, typeAccount } = req.body

      const payload = await UserModel.findOneAndUpdate(
        { id: id },
        { name, password, phone, address, avatarUrl, typeAccount }
      )

      return res.json({ succeeded: true, data: payload })
    } catch (err) {
      res.status(500).json({ error: err })
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const userID = req.params.id
      const payload = await UserModel.deleteOne({ _id: userID })
      if (payload.deletedCount === 0) {
        // Trường hợp không tìm thấy bài đăng cần xóa
        return res.status(404).json({ succeeded: false, message: 'Not found' })
      } else {
        // Trường hợp đã xóa thành công
        return res.json({ succeeded: true, message: 'Successfully deleted' })
      }
    } catch (err) {
      res.status(500).json({ error: err })
    }
  }
}
