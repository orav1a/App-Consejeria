import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: 'login',
        loadChildren: () => import('../login/login.module').then(m => m.LoginPageModule)
      },
      {
        path: 'registrar-usuario',
        loadChildren: () => import('../registrar-usuario/registrar-usuario.module').then(m => m.RegistrarUsuarioPageModule)
      },
      {
        path: 'spinner',
        loadChildren: () => import('../shared/spinner/spinner.module').then(m => m.SpinnerPageModule)
      },
      {
        path: 'recuperar-password',
        loadChildren: () => import('../recuperar-password/recuperar-password.module').then(m => m.RecuperarPasswordPageModule)
      },
      {
        path: 'verificar-correo',
        loadChildren: () => import('../verificar-correo/verificar-correo.module').then(m => m.VerificarCorreoPageModule)
      },
      {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule { }
