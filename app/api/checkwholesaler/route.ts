import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/integrations/supabase/client";

export async function POST(req: NextRequest) {
    const { wholesalerId } = await req.json();

    const { data, error } = await supabase.rpc("wholesaler_exist", {
        p_user_id: wholesalerId,
      });
    
    console.log(data);
    
    if (error) {
        return NextResponse.json({ success: false, message: "خطای سرور", error: error.message }, { status: 500 });
    }

    if (data.exists) {
        return NextResponse.json({ success: true, message: "وکشر ثبت شده است", data: data }, { status: 200 });
    } else {
        return NextResponse.json({ success: false, message: "وکشر ثبت نشده است" });
    }
}