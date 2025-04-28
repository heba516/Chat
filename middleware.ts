import { NextRequest, NextResponse } from "next/server";
import Cookies from "js-cookie";


export default async function middleware(request: NextRequest) {
    const userToken = Cookies.get('token'); 
    const userNavigateRoute = request.nextUrl.pathname;

    // if (userNavigateRoute === "/login" && userToken) {
    //     return NextResponse.redirect(new URL("/", request.nextUrl.origin));
    // }
    
    
    // if (userNavigateRoute.startsWith("/") && !userToken) {
    //     return NextResponse.redirect(new URL("/login", request.nextUrl.origin));
    // }
    
    return NextResponse.next();
}

export const config = {
  matcher: ['/', '/login'],
}