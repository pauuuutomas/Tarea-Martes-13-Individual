export interface Usuario {
  id_usuario: number;
  username: string;
  nombres: string;
  apellidos: string;
  grupos: string[];
  activo: boolean;
}

export const usuarios: Usuario[] = [
  {
    id_usuario: 1,
    username: 'usuario1',
    nombres: 'Ana',
    apellidos: 'García',
    grupos: ['user'],
    activo: true,
  },
  {
    id_usuario: 2,
    username: 'usuario2',
    nombres: 'Luis',
    apellidos: 'Pérez',
    grupos: ['admin', 'user'],
    activo: true,
  },
  {
    id_usuario: 3,
    username: 'usuario3',
    nombres: 'Marta',
    apellidos: 'López',
    grupos: ['user'],
    activo: false,
  },
];
