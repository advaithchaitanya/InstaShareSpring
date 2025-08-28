import { inject } from '@angular/core';
import { CanActivateFn,Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
export const authGuard: CanActivateFn = (route, state) => {
  
  const router = inject(Router);
   const cookieService = inject(CookieService);

  // Grab token from localStorage (or sessionStorage)
  const token = cookieService.get('jwtToken');

  if (token!=="") {
    // ✅ Token exists → allow access
    return true;
  } else {
    // 🚨 No token → redirect to login/auth component
    router.navigate(['/']);
    return false;
  }
};
