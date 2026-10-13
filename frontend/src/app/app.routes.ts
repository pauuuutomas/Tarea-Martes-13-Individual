import { Routes } from '@angular/router';
import { Pantalla } from './pantalla/pantalla';
import { UsuariosLista } from './usuarios-lista/usuarios-lista';
import { UsuarioCrear } from './usuario-crear/usuario-crear';
import { TareasLista } from './tareas/tareas-lista/tareas-lista';
import { TareaCrear } from './tareas/tarea-crear/tarea-crear';

export const appRoutes: Routes = [
  {
    path: 'usuarios',
    component: UsuariosLista,
  },
  {
    path: 'usuarios/crear',
    component: UsuarioCrear,
  },
  {
    path: 'usuarios/:id_usuario',
    component: UsuarioCrear,
  },
  {
    path: 'tareas',
    component: TareasLista,
  },
  {
    path: 'tareas/crear',
    component: TareaCrear,
  },
  {
    path: 'tareas/:id_tarea',
    component: TareaCrear,
  },
  { path: '', redirectTo: 'usuarios', pathMatch: 'full' },
  { path: '**', redirectTo: 'usuarios' },
];
