'use client'

import { createContext, useContext } from "react"

import { Profile } from "@/types/profile"


//data structure
type ProfileProps = {
  profile: Profile | undefined,
  updateProfile: (profile: Profile, images?: File[]) => Promise<string[] | null>
}

//create context
const ProfileContext = createContext<ProfileProps | undefined>(undefined)


//provider
export function ProfileProvider(props: { profile: Profile | undefined, children: React.ReactNode }) {

  async function updateProfile(profile: Profile, images?: File[]) {
    const uploaded: string[] = []

    if (!images || images.length === 0) {
      return null
    }

    for (const image of images) {
      try {
        const formData = new FormData()
        formData.append("id", profile.id)
        formData.append("image", image)

        const res = await fetch("/api/image", {
          method: "POST",
          body: formData,
        })

        if (!res.ok) continue

        const data = await res.json()
        const url: string | null = data?.imageUrl ?? null
        if (url) uploaded.push(url)
      } catch (err) {
        // ignore and continue uploading remaining files
        continue
      }
    }

    return uploaded.length > 0 ? uploaded : null
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