import { NextRequest, NextResponse } from 'next/server';

import { ADMIN_URL, DASHBOARD_URL, PUBLIC_URL } from './config/url.config';
import { EnumTokens } from './services/auth/auth-token.service';
import { userService } from './services/user.service';
import { UserRole } from './types/user.types';

export async function middleware(req: NextRequest) {
  const refreshToken = req.cookies.get(EnumTokens.REFRESH_TOKEN)?.value;
  const accessToken = req.cookies.get(EnumTokens.ACCESS_TOKEN)?.value;

  const isAuthPage = req.url.includes(PUBLIC_URL.auth());
  const isAdminPage = req.url.includes(ADMIN_URL.root());
  
  if (isAuthPage) {
    if (refreshToken && accessToken) {
      return NextResponse.redirect(new URL(DASHBOARD_URL.root(), req.url));
    }
    return NextResponse.next();
  }
  if (refreshToken === undefined) {
    return NextResponse.rewrite(
      new URL(isAdminPage ? '/404' : PUBLIC_URL.auth(), req.url)
    );
  }
  try {
    const profile = await userService.getProfileMiddleware(refreshToken);

    if (profile.role === UserRole.ADMIN) {
      return NextResponse.next();
    }
    if (isAdminPage) {
      return NextResponse.rewrite(new URL('/404', req.url));
    }
    return NextResponse.next();
  } catch (error) {

    req.cookies.delete(EnumTokens.REFRESH_TOKEN);
    return NextResponse.redirect(new URL(PUBLIC_URL.auth(), req.url));
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/manage/:path*', '/auth']
};
