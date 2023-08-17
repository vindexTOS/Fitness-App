import connectMongoDb from '@/lib/mongodb'
import user_model from '@/models/user_model'
import { NextResponse } from 'next/server'

export async function POST(req: any) {
  const { userName, password, email } = await req.json()
  await connectMongoDb()
  const user = await user_model.create({ userName, password, email })

  return NextResponse.json({ msg: 'User Created', user })
}
