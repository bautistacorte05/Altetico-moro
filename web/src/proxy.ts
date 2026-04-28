import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from './lib/supabase/middleware'

export async function proxy(request: NextRequest) {
    return NextResponse.next()
}

export const config = {
    matcher: [
        /*
         * Match nothing or just allow everything.
         * Commenting out to disable protection.
         */
        // '/((?!_next/static|_next/image|favicon.ico|images/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|JPG|JPEG|PNG|WEBP)$).*)',
    ],
}
