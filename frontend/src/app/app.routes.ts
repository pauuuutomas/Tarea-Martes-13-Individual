import { Routes } from '@angular/router';
import { Pantalla } from './pantalla/pantalla';
import { UsuariosLista } from './usuarios-lista/usuarios-lista';
import { UsuarioDetalle } from './usuario-detalle/usuario-detalle';

export const appRoutes: Routes = [
  {
    path: 'usuarios',
    component: UsuariosLista,
  },
  {
    path: 'usuarios/crear',
    component: Pantalla,
    data: {
      titulo: 'Crear usuario',
      descripcion: 'Pantalla para crear un usuario.',
    },
  },
  {
    path: 'usuarios/:id_usuario',
    component: UsuarioDetalle,
  },
  {
    path: 'tareas',
    component: Pantalla,
    data: {
      titulo: 'Tareas',
      descripcion: 'Pantalla para consultar el listado de tareas.',
    },
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
