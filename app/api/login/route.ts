import user_model from '@/models/user_model'
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dbConnect from '@/lib/mongodb'
import dbDisconnect from '@/lib/mongodbDisconnect'
export async function POST(req: any) {
  const { email, password } = await req.json()
  try {
    await dbConnect()

    const userExists = await user_model.findOne({ email: email })

    if (!userExists) {
      await dbDisconnect()

      return NextResponse.json({ msg: 'User dont exist' }, { status: 403 })
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      userExists.password || '',
    )

    if (!isPasswordValid) {
      await dbDisconnect()
      return NextResponse.json({ msg: 'Invalid password' }, { status: 401 })
    }

    userExists.password = 'null'
    const secret = process.env.JWT_STRING || ''
    const token = jwt.sign({ user: userExists }, secret, { expiresIn: '1hr' })
    await dbDisconnect()
    return NextResponse.json({ msg: 'User Loged in', token }, { status: 200 })
  } catch (error) {
    await dbDisconnect()
    return NextResponse.json({ msg: error }, { status: 500 })
  }
}
