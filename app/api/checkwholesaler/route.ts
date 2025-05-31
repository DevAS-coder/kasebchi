import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/integrations/supabase/client";

export async function POST(req: NextRequest) {
    const { wholesalerId } = await req.json();
    const { data, error } = await supabase.rpc("wholesaler_exist", {
        p_user_id: wholesalerId,
      });
    
    if (error) {
        return NextResponse.json({ success: false, message: "خطای سرور", error: error.message }, { status: 500 });
    }

    console.log('this is data', data);
    if (!data.exists) {
        return NextResponse.json({ success: false, message: "عمده فروش ثبت نشده است" });
    }

    if (data.exists) {
        return NextResponse.json({ success: true, message: "عمده فروش ثبت شده است", data: data }, { status: 200 });
    } else {
        console.log('true2');
        return NextResponse.json({ success: false, message: "عمده فروش ثبت نشده است" });
    }
}