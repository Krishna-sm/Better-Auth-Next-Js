import { getSessionCookie } from "better-auth";
import { NextResponse } from "next/server";

export async function middleware(request){
    const cookies= getSessionCookie(request)
        // console.log("start middleware",request.nextUrl.pathname);
        
    if(!cookies){
        return NextResponse.redirect(new URL("/login",request.url))
    }
    return NextResponse.next();
}

export const config = {
    matcher:["/"]
}