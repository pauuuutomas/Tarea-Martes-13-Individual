import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Usuario, UsuarioService } from '../usuarios/usuario.service';

@Component({
  selector: 'app-usuario-crear',
  imports: [FormsModule, RouterLink],
  template: `
    <section>
      @if (idUsuario !== undefined && !usuario) {
        <h1>Usuario no encontrado</h1>
        <p>No existe un usuario con el ID indicado.</p>
        <a class="boton" routerLink="/usuarios">Volver al listado</a>
      } @else if (guardado) {
        <p role="status">
          {{ idUsuario === undefined ? 'El usuario se creó correctamente.' : 'Los cambios se guardaron correctamente.' }}
        </p>
        <a class="boton" routerLink="/usuarios">Volver al listado</a>
      } @else {
      <h1>{{ idUsuario === undefined ? 'Crear usuario' : 'Editar usuario' }}</h1>

        <form
          #formulario="ngForm"
          (ngSubmit)="guardarUsuario(formulario)"
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
            <button class="boton" type="submit">
              {{ idUsuario === undefined ? 'Crear usuario' : 'Guardar cambios' }}
            </button>
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
  private readonly route = inject(ActivatedRoute);
  private readonly usuarioService = inject(UsuarioService);
  protected readonly idUsuario = this.leerIdUsuario();
  protected readonly usuario: Usuario | undefined =
    this.idUsuario === undefined
      ? undefined
      : this.usuarioService.obtenerPorId(this.idUsuario);
  protected username = this.usuario?.username ?? '';
  protected nombres = this.usuario?.nombres ?? '';
  protected apellidos = this.usuario?.apellidos ?? '';
  protected fechaNacimiento = this.usuario?.fecha_nacimiento ?? '';
  protected grupos: string[] = [...(this.usuario?.grupos ?? [])];
  protected gruposTocados = false;
  protected enviado = false;
  protected guardado = false;

  protected guardarUsuario(formulario: NgForm): void {
    this.enviado = true;

    if (formulario.invalid || this.grupos.length === 0) {
      formulario.form.markAllAsTouched();
      return;
    }

    if (this.idUsuario === undefined) {
      this.usuarioService.crear({
        username: this.username,
        nombres: this.nombres,
        apellidos: this.apellidos,
        fecha_nacimiento: this.fechaNacimiento,
        grupos: [...this.grupos],
        activo: true,
      });
    } else {
      this.usuarioService.actualizar(this.idUsuario, {
        username: this.username,
        nombres: this.nombres,
        apellidos: this.apellidos,
        fecha_nacimiento: this.fechaNacimiento,
        grupos: [...this.grupos],
      });
    }

    this.guardado = true;
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

  private leerIdUsuario(): number | undefined {
    const parametro = this.route.snapshot.paramMap.get('id_usuario');
    if (parametro === null) {
      return undefined;
    }

    const idUsuario = Number(parametro);
    return Number.isInteger(idUsuario) && idUsuario > 0 ? idUsuario : -1;
  }
}
