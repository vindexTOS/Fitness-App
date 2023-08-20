import Image from 'next/image'
import { cookies } from 'next/headers'
import Link from 'next/link'
import jwt from 'jwt-decode'
export default async function Home() {
  const cookieStore = cookies()
  const name = cookieStore.get('jwt_authorization')
  

  const decoded: any = name?.value && (await jwt(name?.value || 'no user'))

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Fitness App</h1>
      {JSON.stringify(decoded)}

      <Link href="/login">login</Link>
      <Link href="/signup">register</Link>
    </main>
  )
}
