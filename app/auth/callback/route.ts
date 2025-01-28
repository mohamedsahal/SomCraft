import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  // Simply redirect to origin after sign in process
  return NextResponse.redirect(requestUrl.origin)
}