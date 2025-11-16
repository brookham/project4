'use client'

import { useProfile } from "@/contexts/profileContext"
import { Box, TextField } from "@mui/material"

export default function Home(){

  const { profile } = useProfile()

  if (!profile) return <></>

  return(
    <Box>
      <TextField
      
      />
    </Box>
  )
}