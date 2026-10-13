import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Usuario, usuarios } from '../usuarios';

@Component({
  selector: 'app-usuario-detalle',
  imports: [RouterLink],
  template: `
    <section>
      @if (usuario) {
        <h1>Detalle de usuario</h1>
        <dl>
          <dt>ID</dt>
          <dd>{{ usuario.id_usuario }}</dd>

          <dt>Nombre de usuario</dt>
          <dd>{{ usuario.username }}</dd>

          <dt>Nombre</dt>
          <dd>{{ usuario.nombres }}</dd>

          <dt>Apellido</dt>
          <dd>{{ usuario.apellidos }}</dd>

          <dt>Grupos</dt>
          <dd>{{ usuario.grupos.join(', ') }}</dd>

          <dt>Estado</dt>
          <dd>{{ usuario.activo ? 'Activo' : 'Inactivo' }}</dd>
        </dl>
      } @else {
        <h1>Usuario no encontrado</h1>
        <p>No existe un usuario con el ID indicado.</p>
      }

      <a class="boton" routerLink="/usuarios">Volver al listado</a>
    </section>
  `,
  styles: `
    h1 {
      margin-top: 0;
    }

    dl {
      display: grid;
      grid-template-columns: max-content 1fr;
      gap: 0.75rem 1.5rem;
      margin-bottom: 1.5rem;
    }

    dt {
      font-weight: 700;
    }

    dd {
      margin: 0;
    }

    .boton {
      display: inline-block;
      padding: 0.65rem 1rem;
      border-radius: 0.3rem;
      background: #1d4ed8;
      color: white;
      text-decoration: none;
    }
  `,
})
export class UsuarioDetalle {
  private readonly route = inject(ActivatedRoute);
  protected readonly usuario: Usuario | undefined = usuarios.find(
    (item) => item.id_usuario === Number(this.route.snapshot.paramMap.get('id_usuario')),
  );
}
