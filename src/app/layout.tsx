import { createClient } from "@/utils/supabase/server";
import type { Metadata } from "next";
import { ProfileProvider } from "@/context/profileContext";
import { Profile, profileSelectString } from "@/types/profile";
export const metadata: Metadata = {
  title: "Project 4",
  description: "Brook Hamilton2",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {




  return (
    <html lang="en">
      <ProfileProvider profile={await getProfile()}>
        <body>{children}</body>
      </ProfileProvider>
    </html>
  );
}

async function getProfile(): Promise<Profile | undefined> {

  const supabase = await createClient()

  const user = await supabase.auth.getUser()

  if (!user){
    return undefined
  }

  const data = await supabase
    .from('profiles')
    .select(profileSelectString)
    .eq('id', user.data.user?.id)

  console.log(data.data)

  let profile: Profile | undefined = undefined

  if (data.data && data.data.length > 0) {
    profile = data.data[0]
  }

  console.log(profile)

  return profile

}
