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

  const { BNCPath, FNPath, LisenscePath } =
    await request.json();

  const { data, error } = await supabase.rpc("save_wholesaler_documents ", {
    p_user_id: payload.id,
    p_national_card_front_url: `https://ugqdmysezwjwwzmjsabv.supabase.co/storage/v1/object/public/wholesaler-documents/${FNPath}`,
    p_national_card_back_url: `https://ugqdmysezwjwwzmjsabv.supabase.co/storage/v1/object/public/wholesaler-documents/${BNCPath}`,
    p_business_license_url: `https://ugqdmysezwjwwzmjsabv.supabase.co/storage/v1/object/public/wholesaler-documents/${LisenscePath}`,
  });

  if (error) {  
    console.log(error);
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }

  if (data.success === false) {
    console.log(data);
    
    return NextResponse.json(
      { success: data.success},
      { status: 500 }
    );
  }
  console.log(data);
  return NextResponse.json({ data: data.message }, { status: 200 });
}
