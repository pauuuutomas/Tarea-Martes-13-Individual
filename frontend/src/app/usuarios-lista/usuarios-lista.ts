import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Usuario {
  id_usuario: number;
  username: string;
  nombres: string;
  apellidos: string;
  grupos: string[];
  activo: boolean;
}

@Component({
  selector: 'app-usuarios-lista',
  imports: [RouterLink],
  template: `
    <section>
      <div class="encabezado">
        <div>
          <h1>Usuarios</h1>
          <p>Listado de usuarios de ejemplo.</p>
        </div>
        <a class="boton" routerLink="/usuarios/crear">Crear usuario</a>
      </div>

      <div class="tabla-contenedor">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre de usuario</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Grupos</th>
              <th>Estado</th>
              <th>Detalle</th>
            </tr>
          </thead>
          <tbody>
            @for (usuario of usuarios; track usuario.id_usuario) {
              <tr>
                <td>{{ usuario.id_usuario }}</td>
                <td>{{ usuario.username }}</td>
                <td>{{ usuario.nombres }}</td>
                <td>{{ usuario.apellidos }}</td>
                <td>{{ usuario.grupos.join(', ') }}</td>
                <td>{{ usuario.activo ? 'Activo' : 'Inactivo' }}</td>
                <td>
                  <a [routerLink]="['/usuarios', usuario.id_usuario]">
                    Ver detalle
                  </a>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </section>
  `,
  styles: `
    .encabezado {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    h1,
    p {
      margin: 0;
    }

    p {
      margin-top: 0.5rem;
      color: #4b5563;
    }

    .boton {
      display: inline-block;
      padding: 0.65rem 1rem;
      border-radius: 0.3rem;
      background: #1d4ed8;
      color: white;
      text-decoration: none;
    }

    .tabla-contenedor {
      overflow-x: auto;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    th,
    td {
      padding: 0.75rem;
      border-bottom: 1px solid #d1d5db;
      text-align: left;
    }

    th {
      background: #f3f4f6;
    }
  `,
})
export class UsuariosLista {
  protected readonly usuarios: Usuario[] = [
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
}
