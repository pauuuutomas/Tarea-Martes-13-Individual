import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { usuarios } from '../usuarios';

@Component({
  selector: 'app-usuario-crear',
  imports: [FormsModule, RouterLink],
  template: `
    <section>
      <h1>Crear usuario</h1>

      @if (creado) {
        <p role="status">El usuario se creó correctamente.</p>
        <a class="boton" routerLink="/usuarios">Volver al listado</a>
      } @else {
        <form #formulario="ngForm" (ngSubmit)="crearUsuario(formulario)">
          <label for="username">Nombre de usuario</label>
          <input
            id="username"
            name="username"
            [(ngModel)]="username"
            required
          />

          <label for="nombres">Nombre</label>
          <input
            id="nombres"
            name="nombres"
            [(ngModel)]="nombres"
            required
          />

          <label for="apellidos">Apellido</label>
          <input
            id="apellidos"
            name="apellidos"
            [(ngModel)]="apellidos"
            required
          />

          <label for="fechaNacimiento">Fecha de nacimiento</label>
          <input
            id="fechaNacimiento"
            name="fechaNacimiento"
            type="date"
            [(ngModel)]="fechaNacimiento"
            required
          />

          <label for="grupo">Grupo</label>
          <select id="grupo" name="grupo" [(ngModel)]="grupo" required>
            <option value="user">user</option>
            <option value="admin">admin</option>
          </select>

          <div class="acciones">
            <button class="boton" type="submit">Crear usuario</button>
            <a class="boton boton-secundario" routerLink="/usuarios">
              Cancelar
            </a>
          </div>
        </form>
      }
    </section>
  `,
  styles: `
    h1 {
      margin-top: 0;
    }

    form {
      display: grid;
      max-width: 28rem;
      gap: 0.5rem;
    }

    input,
    select {
      margin-bottom: 0.75rem;
      padding: 0.55rem;
      font: inherit;
    }

    .acciones {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      margin-top: 0.5rem;
    }

    .boton {
      display: inline-block;
      padding: 0.65rem 1rem;
      border: 0;
      border-radius: 0.3rem;
      background: #1d4ed8;
      color: white;
      font: inherit;
      text-decoration: none;
      cursor: pointer;
    }

    .boton-secundario {
      background: #4b5563;
    }
  `,
})
export class UsuarioCrear {
  protected username = '';
  protected nombres = '';
  protected apellidos = '';
  protected fechaNacimiento = '';
  protected grupo: 'user' | 'admin' = 'user';
  protected creado = false;

  protected crearUsuario(formulario: NgForm): void {
    if (formulario.invalid) {
      return;
    }

    const idUsuario = Math.max(0, ...usuarios.map((usuario) => usuario.id_usuario)) + 1;

    usuarios.push({
      id_usuario: idUsuario,
      username: this.username,
      nombres: this.nombres,
      apellidos: this.apellidos,
      fecha_nacimiento: this.fechaNacimiento,
      grupos: [this.grupo],
      activo: true,
    });

    this.creado = true;
  }
}
