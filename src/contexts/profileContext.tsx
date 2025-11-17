'use client'

import { createContext, useContext } from "react"

import { ImageInfo } from "@/types/imageInfo"

import { useRouter } from "next/navigation"


//data structure
type ProfileProps = {
  profile: ImageInfo | undefined,
  updateProfile: (profile: ImageInfo, image: File | undefined) => void,
  signout: () => void
}

//create context
const ProfileContext = createContext<ProfileProps | undefined>(undefined)


//provider
export function ProfileProvider(props: { profile: ImageInfo | undefined, children: React.ReactNode }) {

    const router = useRouter()


  async function updateProfile(profile: ImageInfo, image: File | undefined) {

    let imageUrl: string | null = null
    if (image) {
      const formData = new FormData()
      formData.append("id", profile.id)
      formData.append("image", image)
      const res = await fetch("/api/image",
        {
          method: "POST",
          body: formData
        }
      )
      const data = await res.json()
      imageUrl = data.imageUrl ?? null
    }
    return imageUrl
  }

  async function signout(){
    await fetch("api/signout")
    router.push("/login")
  }

  

  return (
    <ProfileContext.Provider value={{ profile: props.profile, updateProfile, signout }}>
      {props.children}
    </ProfileContext.Provider>
  )
}
//use
export function useProfile() {
  const context = useContext(ProfileContext)

  if (!context) {
    throw new Error("useProfile must be used within ProfileProvider")
  }

  return context

}