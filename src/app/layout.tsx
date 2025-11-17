import { createClient } from "@/utils/supabase/server";
import type { Metadata } from "next";
import { ProfileProvider } from "@/contexts/profileContext";
import { ImageInfo, profileSelectString } from "@/types/imageInfo";

export const metadata: Metadata = {
  title: "Project 4",
  description: "Brook Hamiltons Project 4",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {



  return (
    <html lang="en">
      <ProfileProvider profile={await getProfile()}>
        <body>
          {children}
        </body>
      </ProfileProvider>
    </html>
  );
}

async function getProfile(): Promise<ImageInfo | undefined> {
  const supabase = await createClient()

  const user = await supabase.auth.getUser()

  if (!user || !user.data.user){
    return undefined
  }

  const data = await supabase
    .from('profiles')
    .select(profileSelectString)
    .eq('id', user.data.user?.id)

  console.log(data.data)

  let profile: ImageInfo | undefined = undefined

  if (data.data && data.data.length > 0) {
    profile = data.data[0]
  }

  if (profile) {
    profile.username = user.data.user.email ?? null
  }

  console.log(profile)

  return profile
}