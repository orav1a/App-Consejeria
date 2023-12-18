import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FirebaseCodeErrorService } from 'src/app/services/firebase-code-error.service';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.page.html',
  styleUrls: ['./registrar-usuario.page.scss'],
})

export class RegistrarUsuarioPage implements OnInit {
  registrarUsuario: FormGroup;
  loading: boolean = false;
  email: any;
  mail: any;
  uid: any;
  qr: any;

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router,
    private firebaseError: FirebaseCodeErrorService,
    private fireService: UsuarioService
  ) {
    this.registrarUsuario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repetirPassword: ['', Validators.required],
    });
  }

  ngOnInit(): void { }

  registrar() {
    const email = this.registrarUsuario.value.email;
    const password = this.registrarUsuario.value.password;
    const repetirPassowrd = this.registrarUsuario.value.repetirPassword;

    console.log(this.registrarUsuario);
    if (password !== repetirPassowrd) {
      this.toastr.error(
        'Las contraseñas ingresadas deben ser las mismas',
        'Error', {
        timeOut: 3000, // Duración de 3 segundos
        progressBar: true, // Muestra una barra de progreso
        closeButton: true, // Muestra el botón de cierre
        enableHtml: true, // Permite utilizar HTML en el mensaje
      });

      return;
    }

    this.loading = true;
    this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.verificarCorreo();
      })
      .catch((error) => {
        this.loading = false;
        this.toastr.error(this.firebaseError.codeError(error.code), 'Error', {
          timeOut: 3000, // Duración de 3 segundos
          progressBar: true, // Muestra una barra de progreso
          closeButton: true, // Muestra el botón de cierre
          enableHtml: true, // Permite utilizar HTML en el mensaje
        });
      })
  }

  verificarCorreo() {
    this.afAuth.currentUser
      .then((user) => user?.sendEmailVerification())
      .then(() => {
        this.toastr.info(
          'Le enviamos un correo electronico para su verificacion',
          'Verificar correo', {
          timeOut: 3000, // Duración de 3 segundos
          progressBar: true, // Muestra una barra de progreso
          closeButton: true, // Muestra el botón de cierre
          enableHtml: true, // Permite utilizar HTML en el mensaje
        });
        this.router.navigate(['/login']);
        this.afAuth.authState.subscribe(user => {
          this.uid = user?.uid;
          this.mail = user?.email;
          this.qr = this.uid + "//" + this.mail;
          this.fireService.createDoc({ email: this.mail, codigoQr: this.qr, nro_est: 0, id_est: "", preferencial: false })
        })
      });

  }
}
