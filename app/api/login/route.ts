import user_model from '@/models/user_model'
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import connectMongoDb from '@/lib/mongodb'

export async function POST(req: any) {
  try{
  await connectMongoDb();
  const { email, password } = await req.json()
  console.log(email,password);
  const userExists = await user_model.findOne({ email: email })

  if (!userExists) {
    return NextResponse.json({ msg: 'User dont exist' }, { status: 403 })
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    userExists.password || '',
  )

  if (!isPasswordValid) {
    return NextResponse.json({ msg: 'Invalid password' }, { status: 401 })
  }

  userExists.password = 'null'
  const secret = process.env.JWT_STRING || ''
  const token = jwt.sign({ user: userExists }, secret, { expiresIn: '1hr' })

  return NextResponse.json({ msg: 'User Loged in', token }, { status: 200 })
}
catch(error){
  return NextResponse.json({ msg: error}, { status: 500 })
}
}
