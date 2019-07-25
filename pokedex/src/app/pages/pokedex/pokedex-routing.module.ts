import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegisterComponent} from "./register/register.component";
import {PokemonViewComponent} from "./pokemon-view/pokemon-view.component";

const routes: Routes = [
  {path: '', component: RegisterComponent},
  {path: 'pokemon/:id', component: PokemonViewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PokedexRoutingModule { }
