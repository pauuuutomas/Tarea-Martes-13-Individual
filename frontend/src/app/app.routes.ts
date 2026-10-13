import { Routes } from '@angular/router';
import { Pantalla } from './pantalla/pantalla';

export const appRoutes: Routes = [
  {
    path: 'usuarios',
    component: Pantalla,
    data: {
      titulo: 'Usuarios',
      descripcion: 'Pantalla para consultar el listado de usuarios.',
    },
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
    component: Pantalla,
    data: {
      titulo: 'Detalle de usuario',
      descripcion: 'Pantalla para consultar el detalle de un usuario.',
    },
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
