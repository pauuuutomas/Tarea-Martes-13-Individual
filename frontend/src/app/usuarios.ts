export interface Usuario {
  id_usuario: number;
  username: string;
  nombres: string;
  apellidos: string;
  fecha_nacimiento: string;
  grupos: string[];
  activo: boolean;
}

export const usuarios: Usuario[] = [
  {
    id_usuario: 1,
    username: 'usuario1',
    nombres: 'Ana',
    apellidos: 'García',
    fecha_nacimiento: '1995-04-12',
    grupos: ['user'],
    activo: true,
  },
  {
    id_usuario: 2,
    username: 'usuario2',
    nombres: 'Luis',
    apellidos: 'Pérez',
    fecha_nacimiento: '1988-09-23',
    grupos: ['admin', 'user'],
    activo: true,
  },
  {
    id_usuario: 3,
    username: 'usuario3',
    nombres: 'Marta',
    apellidos: 'López',
    fecha_nacimiento: '2001-01-08',
    grupos: ['user'],
    activo: false,
  },
];
