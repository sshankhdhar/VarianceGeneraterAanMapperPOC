import { Component  } from '@angular/core';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';
import { mergeMap } from 'rxjs/operators';
// import { AdalService } from 'adal-angular4';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  screenHeight: any;
  screenWidth: any;
 // tslint:disable-next-line:variable-name
 private _opened = true;
 title = 'VRWebPortal';
isAuthenticated: any;

constructor(private adal: MsAdalAngular6Service) {
  this.isAuthenticated = this.adal.isAuthenticated;
  // this.adal.acquireToken(resource).pipe(
  //   mergeMap((token: string) => {
  //       const authorizedRequest = req.clone({
  //           headers: req.headers.set('Authorization', `Bearer ${token}`),
  //       });
  //       return next.handle(authorizedRequest);
// }));
}


//  @HostListener('window:resize', ['$event'])
//  getScreenSize(event?) {
//        this.screenHeight = window.innerHeight;
//        this.screenWidth = window.innerWidth;
//        console.log(this.screenHeight, this.screenWidth);
//        console.log(document.getElementsByClassName('getScroll'));
//        Array.from(document.getElementsByClassName('getScroll')).forEach(element => {
//         console.log(element.className);
//      });
//  }
}
