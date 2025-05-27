import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/integrations/supabase/client";

export async function POST(req: NextRequest) {
  const { phoneNumber } = await req.json();

  if (!phoneNumber) {
    return NextResponse.json({ error: "شماره وارد نشده" }, { status: 400 });
  }

  const { data } = await supabase.rpc("check_phone_exists", {
    p_phone: phoneNumber,
  });

  if (data) {
	return NextResponse.json({ message: true});
  }

  return NextResponse.json({ message: false });
}
