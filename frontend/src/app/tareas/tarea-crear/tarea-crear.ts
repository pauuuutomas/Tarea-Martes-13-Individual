import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  GrupoTarea,
  PrioridadTarea,
  Tarea,
  TareaService,
} from '../tarea.service';

@Component({
  selector: 'app-tarea-crear',
  imports: [FormsModule, RouterLink],
  template: `
    <section>
      @if (idTarea !== undefined && !tarea) {
        <h1>Tarea no encontrada</h1>
        <p>No existe una tarea con el ID indicado.</p>
        <a class="boton boton-secundario" routerLink="/tareas">
          Volver al listado
        </a>
      } @else {
      <h1>{{ idTarea === undefined ? 'Crear tarea' : 'Editar tarea' }}</h1>

      <form #formulario="ngForm" (ngSubmit)="guardarTarea(formulario)" novalidate>
        <label for="idCreador">ID del creador</label>
        <input
          id="idCreador"
          name="idCreador"
          type="number"
          min="1"
          [(ngModel)]="idCreador"
          required
          #idCreadorControl="ngModel"
          [attr.aria-invalid]="idCreadorControl.invalid && (enviado || idCreadorControl.touched)"
        />
        @if (idCreadorControl.invalid && (enviado || idCreadorControl.touched)) {
          <span class="error" role="alert">El ID del creador es obligatorio y debe ser mayor que cero.</span>
        }

        <label for="grupo">Grupo</label>
        <select
          id="grupo"
          name="grupo"
          [(ngModel)]="grupo"
          required
          #grupoControl="ngModel"
          [attr.aria-invalid]="grupoControl.invalid && (enviado || grupoControl.touched)"
        >
          <option value="user">user</option>
          <option value="admin">admin</option>
          <option value="superadmin">superadmin</option>
        </select>
        @if (grupoControl.invalid && (enviado || grupoControl.touched)) {
          <span class="error" role="alert">El grupo es obligatorio.</span>
        }

        <label for="titulo">Título</label>
        <input
          id="titulo"
          name="titulo"
          maxlength="100"
          [(ngModel)]="titulo"
          required
          #tituloControl="ngModel"
          [attr.aria-invalid]="tituloControl.invalid && (enviado || tituloControl.touched)"
        />
        @if (tituloControl.invalid && (enviado || tituloControl.touched)) {
          <span class="error" role="alert">El título es obligatorio y no puede superar 100 caracteres.</span>
        }

        <label for="descripcion">Descripción (opcional)</label>
        <textarea
          id="descripcion"
          name="descripcion"
          [(ngModel)]="descripcion"
          rows="4"
        ></textarea>

        <label for="prioridad">Prioridad</label>
        <select id="prioridad" name="prioridad" [(ngModel)]="prioridad">
          <option value="0:baja">0:baja</option>
          <option value="1:media">1:media</option>
          <option value="2:alta">2:alta</option>
        </select>

        @if (idTarea === undefined) {
          <p class="nota">La tarea se creará con estado Abierta.</p>
        }

        <div class="acciones">
          <button class="boton" type="submit">
            {{ idTarea === undefined ? 'Crear tarea' : 'Guardar cambios' }}
          </button>
          <a class="boton boton-secundario" routerLink="/tareas">Cancelar</a>
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
    select,
    textarea {
      margin-bottom: 0.75rem;
      padding: 0.55rem;
      font: inherit;
    }

    .error {
      margin-top: -0.5rem;
      color: #b91c1c;
      font-size: 0.9rem;
    }

    .nota {
      margin: 0.25rem 0 0.5rem;
      color: #4b5563;
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
export class TareaCrear {
  private readonly route = inject(ActivatedRoute);
  private readonly tareaService = inject(TareaService);
  private readonly router = inject(Router);

  protected readonly idTarea = this.leerIdTarea();
  protected readonly tarea: Tarea | undefined =
    this.idTarea === undefined
      ? undefined
      : this.tareaService.obtenerPorId(this.idTarea);
  protected idCreador: number | null = this.tarea?.id_creador ?? null;
  protected grupo: GrupoTarea = this.tarea?.grupo ?? 'user';
  protected titulo = this.tarea?.titulo ?? '';
  protected descripcion = this.tarea?.descripcion ?? '';
  protected prioridad: PrioridadTarea = this.tarea?.prioridad ?? '1:media';
  protected enviado = false;

  protected guardarTarea(formulario: NgForm): void {
    this.enviado = true;

    if (formulario.invalid || this.idCreador === null || this.idCreador < 1) {
      formulario.form.markAllAsTouched();
      return;
    }

    if (this.idTarea === undefined) {
      this.tareaService.crear({
        id_creador: this.idCreador,
        grupo: this.grupo,
        titulo: this.titulo,
        descripcion: this.descripcion || null,
        prioridad: this.prioridad,
      });
    } else {
      const tareaActualizada = this.tareaService.update(this.idTarea, {
        id_creador: this.idCreador,
        grupo: this.grupo,
        titulo: this.titulo,
        descripcion: this.descripcion || null,
        prioridad: this.prioridad,
      });

      if (!tareaActualizada) {
        return;
      }
    }

    void this.router.navigate(['/tareas']);
  }

  private leerIdTarea(): number | undefined {
    const parametro = this.route.snapshot.paramMap.get('id_tarea');
    if (parametro === null) {
      return undefined;
    }

    const idTarea = Number(parametro);
    return Number.isInteger(idTarea) && idTarea > 0 ? idTarea : -1;
  }
}
