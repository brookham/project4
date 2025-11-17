'use client'
import { useProfile } from "@/contexts/profileContext";
import ImageUplaod from "./imageUpload/page";
import { Button } from "@mui/material";

export default function Home() {

  const { profile, signout } = useProfile()
  return (
    <main>
      <div>
        <Button onClick={signout}>SignOut</Button>
        {
          profile ? `Hello, ${profile.username}` : "Hello World"
        }
        <ImageUplaod/>
        
      </div>
    </main>
  );
}
