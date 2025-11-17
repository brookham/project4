'use client'

import { useProfile } from "@/contexts/profileContext"
import { Box, ImageList, ImageListItem, Button, Avatar } from "@mui/material"
import { upload } from "@vercel/blob/client"
import { useEffect, useState } from "react"

export default function Home() {

  const { profile, updateProfile } = useProfile()

  if (!profile) return <></>

  const [image, setImage] = useState<File | undefined>(undefined)
  const [imageUrl, setImageUrl] = useState<string>(profile.avatar_url ?? "")

  async function handleSave() {
    if (profile) {
      updateProfile(profile, image)
    }
  }

  useEffect(() => {
    if (image) {

      const preview = URL.createObjectURL(image)
      setImageUrl(preview)
      return () => URL.revokeObjectURL(preview)
    }
  }, [image])

  return (
    <Box>
      <Button onClick={handleSave} variant="contained" component="label">
        <input type="file" hidden accept="image/*" onChange={(e => setImage(e.target.files?.[0]))} />
        Upload Image
      </Button>
      <img height={250} src={imageUrl} />
    </Box>
  )
}