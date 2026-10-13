import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UsuarioService } from '../usuarios/usuario.service';

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
        <form
          #formulario="ngForm"
          (ngSubmit)="crearUsuario(formulario)"
          novalidate
        >
          <label for="username">Nombre de usuario</label>
          <input
            id="username"
            name="username"
            [(ngModel)]="username"
            required
            #usernameControl="ngModel"
            [attr.aria-invalid]="usernameControl.invalid && (enviado || usernameControl.touched)"
          />
          @if (usernameControl.invalid && (enviado || usernameControl.touched)) {
            <span class="error" role="alert">El nombre de usuario es obligatorio.</span>
          }

          <label for="nombres">Nombre</label>
          <input
            id="nombres"
            name="nombres"
            [(ngModel)]="nombres"
            required
            #nombresControl="ngModel"
            [attr.aria-invalid]="nombresControl.invalid && (enviado || nombresControl.touched)"
          />
          @if (nombresControl.invalid && (enviado || nombresControl.touched)) {
            <span class="error" role="alert">El nombre es obligatorio.</span>
          }

          <label for="apellidos">Apellido</label>
          <input
            id="apellidos"
            name="apellidos"
            [(ngModel)]="apellidos"
            required
            #apellidosControl="ngModel"
            [attr.aria-invalid]="apellidosControl.invalid && (enviado || apellidosControl.touched)"
          />
          @if (apellidosControl.invalid && (enviado || apellidosControl.touched)) {
            <span class="error" role="alert">El apellido es obligatorio.</span>
          }

          <label for="fechaNacimiento">Fecha de nacimiento</label>
          <input
            id="fechaNacimiento"
            name="fechaNacimiento"
            type="date"
            [(ngModel)]="fechaNacimiento"
            required
            #fechaNacimientoControl="ngModel"
            [attr.aria-invalid]="fechaNacimientoControl.invalid && (enviado || fechaNacimientoControl.touched)"
          />

          @if (fechaNacimientoControl.invalid && (enviado || fechaNacimientoControl.touched)) {
            <span class="error" role="alert">La fecha de nacimiento es obligatoria.</span>
          }

          <fieldset
            (focusout)="gruposTocados = true"
            [attr.aria-invalid]="grupos.length === 0 && (enviado || gruposTocados)"
          >
            <legend>Grupos</legend>
            <label>
              <input
                type="checkbox"
                [checked]="grupos.includes('user')"
                (change)="cambiarGrupo('user', $event)"
              />
              user
            </label>
            <label>
              <input
                type="checkbox"
                [checked]="grupos.includes('admin')"
                (change)="cambiarGrupo('admin', $event)"
              />
              admin
            </label>
          </fieldset>
          @if (grupos.length === 0 && (enviado || gruposTocados)) {
            <span class="error" role="alert">Seleccioná al menos un grupo.</span>
          }

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

    input:not([type='checkbox']) {
      margin-bottom: 0.75rem;
      padding: 0.55rem;
      font: inherit;
    }

    fieldset {
      display: flex;
      gap: 1rem;
      margin: 0.25rem 0;
      padding: 0.75rem;
    }

    fieldset label {
      display: flex;
      align-items: center;
      gap: 0.35rem;
    }

    .error {
      margin-top: -0.5rem;
      color: #b91c1c;
      font-size: 0.9rem;
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
  private readonly usuarioService = inject(UsuarioService);
  protected username = '';
  protected nombres = '';
  protected apellidos = '';
  protected fechaNacimiento = '';
  protected grupos: string[] = [];
  protected gruposTocados = false;
  protected enviado = false;
  protected creado = false;

  protected crearUsuario(formulario: NgForm): void {
    this.enviado = true;

    if (formulario.invalid || this.grupos.length === 0) {
      formulario.form.markAllAsTouched();
      return;
    }

    this.usuarioService.crear({
      username: this.username,
      nombres: this.nombres,
      apellidos: this.apellidos,
      fecha_nacimiento: this.fechaNacimiento,
      grupos: [...this.grupos],
      activo: true,
    });

    this.creado = true;
  }

  protected cambiarGrupo(grupo: 'user' | 'admin', evento: Event): void {
    const seleccionado = (evento.target as HTMLInputElement).checked;
    this.gruposTocados = true;

    if (seleccionado && !this.grupos.includes(grupo)) {
      this.grupos = [...this.grupos, grupo];
    } else if (!seleccionado) {
      this.grupos = this.grupos.filter((grupoActual) => grupoActual !== grupo);
    }
  }
}
