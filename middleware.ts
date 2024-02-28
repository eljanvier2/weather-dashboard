import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    console.log("middleware");
    console.log(request);
    return NextResponse.next();
  }
