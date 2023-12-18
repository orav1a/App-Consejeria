import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  dataUser: any;
  rkArray: any = [];


  constructor(

    private afAuth: AngularFireAuth,
    private router: Router) { }

  ngOnInit(): void {
    this.afAuth.currentUser.then(user => {
      if (user && user.emailVerified) {
        this.dataUser = user;
        console.log(this.dataUser);

        // localStorage.setItem('user',this.)
      } else {
        this.router.navigate(['/login']);
      }

      localStorage.setItem('user', this.dataUser.email)



    })
  }
}
