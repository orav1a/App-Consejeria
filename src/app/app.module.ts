import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire/compat';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SpinnerPageModule } from './shared/spinner/spinner.module';
import { FirestoreModule } from '@angular/fire/firestore';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { TimeElapsedPipe } from './time-elapsed.pipe';
import { BarcodeScannerLivestreamModule } from "ngx-barcode-scanner";




@NgModule({
  declarations: [AppComponent, TimeElapsedPipe,],
  imports: [BrowserModule,
    BarcodeScannerLivestreamModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FirestoreModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    SpinnerPageModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),],
  providers: [

    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy, }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
