'use client'

import { createContext, useContext } from "react"

import { Profile } from "@/types/profile"


//data structure
type ProfileProps = {
  profile: Profile | undefined,
  updateProfile: (profile: Profile, image: File | undefined) => void
}

//create context
const ProfileContext = createContext<ProfileProps | undefined>(undefined)


//provider
export function ProfileProvider(props: { profile: Profile | undefined, children: React.ReactNode }) {

  async function updateProfile(profile: Profile, image: File | undefined) {

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

  return (
    <ProfileContext.Provider value={{ profile: props.profile, updateProfile }}>
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