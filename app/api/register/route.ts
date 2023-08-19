import connectMongoDb from '@/lib/mongodb'
import user_model from '@/models/user_model'
import { sign } from 'jsonwebtoken'
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
export async function POST(req: any) {
  const { userName, password, email } = await req.json()

  console.log(userName)
  const userExists = await user_model.findOne({ email: email })
  if (userExists) {
    return NextResponse.json({ msg: 'User Already Exists' }, { status: 403 })
  }
  const cryptedPass = await bcrypt.hash(password, 10)
  let user = await user_model.create({ userName, password: cryptedPass, email })
  user.password = 'null'
  const secret = process.env.JWT_STRING || ''
  const token = sign(
    {
      user,
    },
    secret,
    { expiresIn: '1hr' },
  )

  return NextResponse.json({ msg: 'User Created', token }, { status: 200 })
}
