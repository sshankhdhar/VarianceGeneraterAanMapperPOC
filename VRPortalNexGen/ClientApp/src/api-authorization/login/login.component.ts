import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // private timeout: any;
  constructor(private router: Router, private adal: MsAdalAngular6Service, private _zone: NgZone) { }

  ngOnInit() {

    setTimeout(() => {
      this._zone.run(
        () => this.router.navigate(['/'])
      );
    }, 200);
  }

  // ngOnDestroy(): void {
  //   if (this.timeout) {
  //       clearTimeout(this.timeout);
  //   }
}
