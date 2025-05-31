import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/integrations/supabase/client";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(request: NextRequest) {
  const { firstName, lastName, nationalId, Category } = await request.json();

  if (!firstName || !lastName || !nationalId || !Category) {
    return NextResponse.json({ success: false, message: "خطای سرور", error: "Invalid token" }, { status: 500 });
  }

  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ success: false, message: "خطای سرور", error: "Invalid token" }, { status: 500 });
  }

  const secret = new TextEncoder().encode(JWT_SECRET);
  const { payload } = await jwtVerify(token, secret)

  const { data, error } = await supabase.rpc("register_wholesaler", {
    p_user_id: payload.id,
    p_first_name: firstName,
    p_last_name: lastName,
    p_national_code: nationalId,
    p_mobile: payload.phone,
    p_service_categories: Category,
    p_level_1_auth: 1,
  });

  if (error) {
    console.log('this is error', error);
    
    return NextResponse.json({ success: false, message: "خطای سرور", error: error.message }, { status: 500 });
  }

  if (data) {
    return NextResponse.json({ success: true, message: "اطلاعات ثبت شد", data: data }, { status: 200 });
  }

  console.log(firstName, lastName, nationalId, Category);
  return NextResponse.json({ message: "Data received" });
}
