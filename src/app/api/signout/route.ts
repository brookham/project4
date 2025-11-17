import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request){
  const supabase = await createClient()

  const { error }= await supabase.auth.signOut()

  if (error){
    return NextResponse.json({message: "Failed to Sign Out"})
  }

  return NextResponse.json({message: "Sign Out Succesfull"})
}