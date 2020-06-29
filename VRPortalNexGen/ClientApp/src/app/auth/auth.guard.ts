// import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
// import { AdalService } from 'adal-angular4';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {
//   constructor(private adal: AdalService) {  }
//   // canActivate(
//   //   next: ActivatedRouteSnapshot,
//   //   state: RouterStateSnapshot): boolean {
//   //   console.log('AuthGuard#canActivate called');
//   //   return true;
//   // }
//   canActivate(): boolean {

//     if (this.adal.userInfo.authenticated) {
//       return true;
//     }

//     this.adal.login();

//     return false;
//   }
// }
