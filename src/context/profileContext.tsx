'use client'

import { createContext, useContext } from "react"

import { Profile } from "@/types/profile"


type ProfileProps = {
  profile: Profile | undefined
}

const ProfileContext = createContext<ProfileProps | undefined>(undefined)

export function ProfileProvider(props: {profile: Profile | undefined, children: React.ReactNode}){

  return (
    <ProfileContext.Provider value={{profile: props.profile}}>
      {props.children}
    </ProfileContext.Provider>
  )
}

export function useProfile(){
  const context = useContext(ProfileContext)
  if (!context){
    throw new Error("useProfile must be used within ProfileProvider")
  }
  return context
}