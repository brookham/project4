import { createClient } from "@/utils/supabase/server"
import { put } from "@vercel/blob"

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

  const fileName = `${id}/image.webp`

  const { url } = await put(fileName, image, {access: 'public', allowOverwrite: true})

  return Response.json({imageUrl: url})

}