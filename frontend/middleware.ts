import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    
    // const isAuthenticated = request.cookies.get('auth-token');

    // Acceso provisional a todas las rutas hasta configurar cookies.
    const isAuthenticated = true

    const protectedRoutes = ['/salas', '/apuestas', '/estadisticas', '/mi-cuenta'];

    // Verificar si la URL es una ruta protegida y si el usuario no está autenticado.
    if (protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route)) && !isAuthenticated) {

        // Redirigir al usuario no autenticado a la página de inicio de sesión.
        return NextResponse.redirect(new URL('/', request.url));
    }

    // Permitir el acceso si está autenticado o la ruta no es protegida.
    return NextResponse.next();
}

// Aplicar el middleware a todas las rutas.
export const config = {
    matcher: ['/salas/:path*', '/apuestas/:path*', '/estadisticas/:path*', '/mi-cuenta/:path*'],
};
