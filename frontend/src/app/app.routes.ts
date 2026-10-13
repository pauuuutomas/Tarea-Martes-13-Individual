import { Routes } from '@angular/router';
import { Pantalla } from './pantalla/pantalla';
import { UsuariosLista } from './usuarios-lista/usuarios-lista';
import { UsuarioCrear } from './usuario-crear/usuario-crear';
import { TareasLista } from './tareas/tareas-lista/tareas-lista';

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
    component: Pantalla,
    data: {
      titulo: 'Crear tarea',
      descripcion: 'Pantalla para crear una tarea.',
    },
  },
  {
    path: 'tareas/:id_tarea',
    component: Pantalla,
    data: {
      titulo: 'Detalle de tarea',
      descripcion: 'Pantalla para consultar el detalle de una tarea.',
    },
  },
  { path: '', redirectTo: 'usuarios', pathMatch: 'full' },
  { path: '**', redirectTo: 'usuarios' },
];
