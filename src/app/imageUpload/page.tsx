'use client'

import { useProfile } from "@/contexts/profileContext"
import { Box, Button, Chip } from "@mui/material"
import { useEffect, useState } from "react"
import Image from "next/image"

export default function ImageUplaod() {

  const { profile, updateProfile } = useProfile()

  if (!profile) return <></>

  const [images, setImages] = useState<any[]>([])

  const [image, setImage] = useState<File | undefined>(undefined)
  const [imageUrl, setImageUrl] = useState<string>(profile.avatar_url ?? "")



  async function getImages() {
    const res = await fetch("/api/image")
    const items = await res.json()
    setImages(items.images)
  }

  async function deleteImages(item: any) {
    const pathname = item.pathname
    await fetch("/api/image", {
      method: "DELETE",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pathname, userId: profile?.id })
    })
    await getImages()
  }

  async function handleSave() {
    if (profile) {
      await updateProfile(profile, image)

    }
    await getImages()
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
      <Button variant="contained" component="label">
        <input type="file" hidden accept="image/*" onChange={(e => setImage(e.target.files?.[0]))} />
        Upload Image
      </Button>
      <Button onClick={handleSave} variant="contained">
        Save Images
      </Button>
      <Box sx={{
        display: "flex",
        flexWrap: "wrap"
      }}
      >
        {images.map((image, i) => {
          const src = image.url
          if (!src) return null

          return (
            <Box key={i}
              sx={{
                position: 'relative',
                height: 150,
                m: 1,

              }}
            >
              <Image
                src={src}
                alt={src}

                height={150}
                width={200}
                style={{ objectFit: "cover" }}
              />
              <Chip onDelete={() => deleteImages(image)} />
            </Box>
          )
        })}


      </Box>
    </Box>
  )

}