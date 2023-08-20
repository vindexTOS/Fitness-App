import user_info from '@/models/user_info'
import user_model from '@/models/user_model'
import dbConnect from '@/lib/mongodb'

import { NextRequest, NextResponse } from 'next/server'
export async function POST(req: NextRequest) {
  const {
    weight,
    height,
    age,
    gender,
    activities,
    goal,
    units,
    user_id,
  } = await req.json()

  try {
    await dbConnect()

    const isUserExist = await user_model.findById(user_id)

    if (!isUserExist) {
      return NextResponse.json({ msg: 'User Does not exist' }, { status: 403 })
    }

    if (!weight || !height || !age || !user_id || !gender || !goal) {
      return NextResponse.json(
        { msg: 'Fill up all the inputs' },
        { status: 400 },
      )
    }
    await user_info.create({
      weight,
      height,
      age,
      gender,
      activities,
      goal,
      units,
      user_id,
    })

    return NextResponse.json({ msg: 'User Info Created' }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ msg: error }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  const user_id = req.nextUrl.searchParams.get('user_id')

  try {
    await dbConnect()
    const userInfo = await user_info.find({ user_id })
    if (!userInfo) {
      return NextResponse.json({ msg: 'User Does not exist' }, { status: 403 })
    }

    return NextResponse.json({ userInfo }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ msg: error }, { status: 500 })
  }
}
