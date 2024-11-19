import { NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
    console.log("middle ware is running");
    console.log(request);
    
    return NextResponse.next();
}

export const config = {
    matcher: ["/VerificationCode"]
}