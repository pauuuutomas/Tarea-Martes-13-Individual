import { Injectable } from '@angular/core';

export interface Usuario {
  id_usuario: number;
  username: string;
  nombres: string;
  apellidos: string;
  fecha_nacimiento: string;
  nombre_completo: string;
  grupos: string[];
  activo: boolean;
}

export type NuevoUsuario = Omit<Usuario, 'id_usuario' | 'nombre_completo'>;
export type CambiosUsuario = Partial<Omit<Usuario, 'id_usuario' | 'nombre_completo'>>;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private usuarios: Usuario[] = [
    {
      id_usuario: 1,
      username: 'usuario1',
      nombres: 'Ana',
      apellidos: 'García',
      fecha_nacimiento: '1995-04-12',
      nombre_completo: 'Ana García',
      grupos: ['user'],
      activo: true,
    },
    {
      id_usuario: 2,
      username: 'usuario2',
      nombres: 'Luis',
      apellidos: 'Pérez',
      fecha_nacimiento: '1988-09-23',
      nombre_completo: 'Luis Pérez',
      grupos: ['admin', 'user'],
      activo: true,
    },
    {
      id_usuario: 3,
      username: 'usuario3',
      nombres: 'Marta',
      apellidos: 'López',
      fecha_nacimiento: '2001-01-08',
      nombre_completo: 'Marta López',
      grupos: ['user'],
      activo: false,
    },
  ];

  obtenerTodos(): Usuario[] {
    return this.usuarios;
  }

  obtenerPorId(idUsuario: number): Usuario | undefined {
    return this.usuarios.find((usuario) => usuario.id_usuario === idUsuario);
  }

  crear(datos: NuevoUsuario): Usuario {
    const idUsuario =
      Math.max(0, ...this.usuarios.map((usuario) => usuario.id_usuario)) + 1;
    const usuario: Usuario = {
      ...datos,
      id_usuario: idUsuario,
      nombre_completo: `${datos.nombres} ${datos.apellidos}`,
      grupos: [...datos.grupos],
    };

    this.usuarios.push(usuario);
    return usuario;
  }

  actualizar(idUsuario: number, cambios: CambiosUsuario): Usuario | undefined {
    const usuario = this.obtenerPorId(idUsuario);
    if (!usuario) {
      return undefined;
    }

    Object.assign(usuario, cambios);
    usuario.nombre_completo = `${usuario.nombres} ${usuario.apellidos}`;
    return usuario;
  }

  eliminar(idUsuario: number): boolean {
    const indice = this.usuarios.findIndex(
      (usuario) => usuario.id_usuario === idUsuario,
    );
    if (indice === -1) {
      return false;
    }

    this.usuarios.splice(indice, 1);
    return true;
  }
}
