import { Routes } from '@angular/router';
import {Catalogo} from "./catalogo/catalogo";
export const routes: Routes = [
    {path: 'catalogo', component: Catalogo},
    {path: '', redirectTo: "catalogo", pathMatch: 'full'}
];