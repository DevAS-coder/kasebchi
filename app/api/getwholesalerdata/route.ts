import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/integrations/supabase/client";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET(request: NextRequest) {

    const token = request.cookies.get("token")?.value;

    if (!token) {
        return NextResponse.json({ success: false, message: "خطای سرور", error: "Invalid token" }, { status: 500 });
    }

    const secret = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    console.log('data : ' ,payload.id);
    
    const { data, error } = await supabase.rpc('get_wholesaler_info', {
        p_user_id: payload.id
    });
    

    if (error) {
        return NextResponse.json({ success: false, message: "خطای سرور", error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: data.wholesaler }, { status: 200 });
}
