import { supabase } from "@/lib/supabase";
import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const secret = new TextEncoder().encode(JWT_SECRET);
  const { payload } = await jwtVerify(token, secret);

  const { name, address, phone, website, about, logoPath } =
    await request.json();

  const { data, error } = await supabase.rpc("update_wholesaler_business_info", {
    p_user_id: payload.id,
    p_name: name,
    p_address: address,
    p_phone: phone,
    p_website: website ? website : null,
    p_about: about,
    p_logo: logoPath ? `https://ugqdmysezwjwwzmjsabv.supabase.co/storage/v1/object/public/logos/${logoPath}` : null,
  });

  if (error) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }

  if (data.success === false) {
    
    return NextResponse.json(
      { success: data.success},
      { status: 500 }
    );
  }
  return NextResponse.json({ data: data.message }, { status: 200 });
}
