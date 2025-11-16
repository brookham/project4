'use client'
import { useProfile } from "@/contexts/profileContext";

export default function Home() {

  const { profile } = useProfile()
  return (
    <main>
      <div>
        {
          profile ? `Hello, ${profile.username}` : "Hello World"
        }
      </div>
    </main>
  );
}
