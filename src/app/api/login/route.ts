import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password } = body;

    const loginRes: any = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/chat/login/`, // e.g. Django endpoint
      { username, password },
      { withCredentials: true }
    );

    //console.log(loginRes)

    // Forward cookie from Django backend if any
    const response = NextResponse.json({ success: true, data: { user_id: loginRes.data.user_id, username: loginRes.data.username } });
    const cookieHeader = loginRes.headers['set-cookie'];

    if (cookieHeader) {
      response.headers.set('Set-Cookie', cookieHeader.toString());
    }

    return response;
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json({ success: false, message: 'Login failed' }, { status: 401 });
  }
}
