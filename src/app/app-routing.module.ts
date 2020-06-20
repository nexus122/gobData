import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../app/components/home/home.component';
import { AboutComponent } from '../app/components/about/about.component';
import { DatosComponent } from './components/datos/datos.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent}, // Ruta del home ( pagina principal ).
  { path: 'about', component: AboutComponent }, // Ruta del about ( instrucciones de uso ).
  { path: 'datos/:keyword', component: DatosComponent },// Pagina de datos, el :keywoard es el "termino de busqueda" se pasa por la url.
  { path: '**', redirectTo: 'home' } // Si escribes cualquier otra cosa que no se entienda te lleva al home.
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
