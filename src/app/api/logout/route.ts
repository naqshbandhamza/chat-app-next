import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
    try {
        // Forward cookie from Django backend if any
        const response = NextResponse.json({ success: true });
        response.headers.set('Set-Cookie', 'access_token=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax; Secure');
        return response;
    } catch (error: any) {
        console.error('Login error:', error);
        return NextResponse.json({ success: false, message: 'Login failed' }, { status: 401 });
    }
}
