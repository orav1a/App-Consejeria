import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { LoginPageModule } from '../login/login.module';
import { UsuarioService } from '../services/usuario.service';
import { Router } from '@angular/router';
import { FirestorageService } from '../services/firestorage.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  isLoginIn: boolean = false;
  qr: any;
  dataUser!: any;
  dataEst: any = [];
  nroEstAsignado: any;
  sinNroEstAsignado: boolean = false;
  nro_est: number = 0;
  data: any;
  preferencial!: boolean;

  constructor(
    private afAuth: AngularFireAuth,
    private fireService: UsuarioService,
    private router: Router,
    private fireStorageService: FirestorageService
  ) { }

  ionViewWillEnter() {
    this.afAuth.currentUser.then((user) => {
      if (user && user.emailVerified) {
        this.dataUser = user;
        console.log("data", this.dataUser);



        // Suscribirse a dataEst para obtener los datos
        this.fireStorageService.obtenerDoc().subscribe((dataEst: any) => {
          console.log('DataEst:', dataEst); // Verifica si dataEst se carga correctamente.

          // Buscar el correo de usuario dentro de dataEst
          const userExistsInDataEst = dataEst.find((element: any) => element.email === this.dataUser.email);

          if (userExistsInDataEst) {

            // console.log(El correo del usuario está en dataEst y su nro_est asignado es ${this.nroEstAsignado}.);
          } else {
            console.log('El correo del usuario NO está en dataEst.')
          }
        });
      } else {
        this.router.navigate(['/login']);
      }

      localStorage.setItem('user', this.dataUser.email);
    });
  }

  ngOnInit() {
    console.log("USUARIO CONECTADO?", this.isLoginIn)

    this.afAuth.authState.subscribe(user => {
      if (!user) {
        this.isLoginIn = false;
      } else if (user) {
        this.isLoginIn = true;
        this.fireService.obtenerDoc().subscribe(res => {
          res.forEach(element => {
            if (element.email == user.email) {
              this.qr = element.codigoQr;
              this.nro_est = element.nro_est;
              this.preferencial = element.preferencial;
            }
          });
        })
      }
    });
  }

  logOut() {
    this.afAuth.signOut().then(() => this.router.navigate(['/loading']));
  }

}