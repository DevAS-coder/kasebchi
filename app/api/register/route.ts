import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/integrations/supabase/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: NextRequest) {
  const { phoneNumber, password, role, isExisted } = await req.json();

  if (!phoneNumber || !password || !role) {
    return NextResponse.json({ success: false, message: "اطلاعات ناقص است" }, { status: 400 });
  }

  if (isExisted) {
    const encryptedPassword = await bcrypt.hash(password, 10);
    
    const { data, error } = await supabase.rpc("authenticate_user", {
      p_phone: phoneNumber,
      p_password: encryptedPassword, 
    });

    if (error) {
      console.error("خطای Supabase در لاگین:", error);
      return NextResponse.json({ success: false, message: "خطای سرور", error: error.message }, { status: 500 });
    }

    if (!data?.success) {
      return NextResponse.json({ success: false, message: "شماره یا رمز اشتباه است", detail: data }, { status: 401 });
    }

    const token = jwt.sign({ id: data.user_id }, JWT_SECRET, {
      expiresIn: "24h",
    });

    const response = NextResponse.json({ success: true, message: "ورود موفق" });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return response;
  }

  const encryptedPassword = await bcrypt.hash(password, 10);

  const { data, error } = await supabase.rpc("register_user", {
    p_phone: phoneNumber,
    p_password: encryptedPassword,
    p_role: role,
  });

  if (error) {
    console.error("خطای Supabase در ثبت‌نام:", error);
    return NextResponse.json({ success: false, message: "خطای سرور", error: error.message }, { status: 500 });
  }

  if (!data?.success) {
    return NextResponse.json({ success: false, message: "ثبت‌نام انجام نشد", detail: data }, { status: 400 });
  }

  const token = jwt.sign({ id: data.user_id }, JWT_SECRET, {
    expiresIn: "24h",
  });

  const response = NextResponse.json({ success: true, message: "ثبت‌نام موفق" });

  response.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  return response;
}
