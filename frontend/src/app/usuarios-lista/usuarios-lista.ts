import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UsuarioService } from '../usuarios/usuario.service';

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
              <th>Acciones</th>
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
                <td class="acciones">
                  <a [routerLink]="['/usuarios', usuario.id_usuario]">Editar</a>
                  <button type="button" (click)="eliminarUsuario(usuario.id_usuario)">
                    Eliminar
                  </button>
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

    .acciones {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .acciones button {
      padding: 0;
      border: 0;
      background: none;
      color: #1d4ed8;
      font: inherit;
      text-decoration: underline;
      cursor: pointer;
    }

    th {
      background: #f3f4f6;
    }
  `,
})
export class UsuariosLista {
  private readonly usuarioService = inject(UsuarioService);
  protected usuarios = this.usuarioService.obtenerTodos();

  protected eliminarUsuario(idUsuario: number): void {
    const confirmar = window.confirm('¿Querés eliminar este usuario?');
    if (!confirmar) {
      return;
    }

    this.usuarioService.eliminar(idUsuario);
    this.usuarios = this.usuarioService.obtenerTodos();
  }
}
