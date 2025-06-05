import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET(request: NextRequest) {

  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const secret = new TextEncoder().encode(JWT_SECRET);
  const { payload } = await jwtVerify(token, secret);

  const { data, error } = await supabase.rpc("get_wholesaler_documents", {
    p_user_id: payload.id,
  });

  if (error) {
	  console.log(error);
    return NextResponse.json({ error: error?.message }, { status: 500 });
	
  }
  if (data.success === false) { 
    console.log(data);
    return NextResponse.json({ success: data.success ,data : null }, { status: 200 });
  }
  console.log(data);
  return NextResponse.json({ data: data.document_info }, { status: 200 });
}
