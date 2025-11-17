import { createClient } from "@/utils/supabase/server"
import { list, put, del } from "@vercel/blob"

export async function POST(request: Request){
  const supabase = await createClient()

  const user = await supabase.auth.getUser()

  if (!user || !user.data.user){
    return Response.json({message: "must be logged in"})
  }

  const formData = await request.formData()
  const image = formData.get('image') as Blob
  const id = formData.get('id')

  if(id !== user.data.user.id){
    return Response.json({message: "invalid user id"})
  }

  const userFolder = `${user.data.user.id}/`

  const existingFiles = await list({prefix: userFolder})


  const filename = `${userFolder}image-${Date.now()}.webp`

  const { url } = await put(filename, image, {access: 'public'})

  return Response.json({imageUrl: url})

}

export async function GET(request: Request) {
  const supabase = await createClient() 
  const user = await supabase.auth.getUser()
  if (!user?.data?.user) return Response.json({ message: 'unauthenticated' }, { status: 401 })

  const userFolder = `${user.data.user.id}/`
  const existingFiles = await list({ prefix: userFolder })
  
  const images = existingFiles.blobs.map(blob => ({
        url: blob.url,
        pathname: blob.pathname
    }))
  return Response.json({images})

}

export async function DELETE(request: Request) {
  const body = await request.json()
  let pathname: string | undefined = body?.pathname
  if (!pathname) return Response.json({ success: false, message: 'missing pathname' })
  await del(pathname)
  return Response.json({ success: true })
}