import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; // Ajout de RouterModule
import { HomeComponent } from './home/home.component';
import { Puzzle1Component } from './puzzle1/puzzle1.component'; // Si tu veux accéder au puzzle

const routes: Routes = [
  { path: 'menu', component: HomeComponent },  // Suppression du '/' devant "menu"
  { path: 'puzzle1', component: Puzzle1Component }, // Ajout si nécessaire
  { path: '', redirectTo: '/menu', pathMatch: 'full' }, // Redirige vers le menu par défaut
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Ajout de forRoot(routes)
  exports: [RouterModule] // Export pour que les routes fonctionnent
})
export class AppRoutingModule { }
