'use client'

import { useProfile } from "@/context/profileContext"
import { Box, TextField } from "@mui/material"
import { useState } from "react"

export default function Home(){

  const { profile } = useProfile()

  if (!profile){
    return <></>
  }

  const [userName, setUserName] = useState<string>(profile.username ?? "")

  return (
    <Box>
      <TextField
        value={userName}
        onChange={e => setUserName(e.target.value)}
      />
    </Box>
  )
}