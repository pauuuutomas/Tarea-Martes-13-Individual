import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tarea } from '../tarea.service';

@Component({
  selector: 'app-tarea-card',
  imports: [DatePipe],
  template: `
    <article class="tarjeta">
      <h2>{{ tarea.titulo }}</h2>
      <p>{{ tarea.descripcion || 'Sin descripción.' }}</p>

      <dl>
        <dt>Grupo</dt>
        <dd>{{ tarea.grupo }}</dd>

        <dt>Prioridad</dt>
        <dd>{{ tarea.prioridad }}</dd>

        <dt>Estado</dt>
        <dd>{{ tarea.estado }}</dd>

        @if (tarea.creada) {
          <dt>Creada</dt>
          <dd>{{ tarea.creada | date: 'short' }}</dd>
        }

        @if (tarea.terminada) {
          <dt>Terminada</dt>
          <dd>{{ tarea.terminada | date: 'short' }}</dd>
        }
      </dl>

      <div class="acciones">
        <button type="button" (click)="editar.emit(tarea)">Editar</button>
        <button type="button" (click)="eliminar.emit(tarea)">Eliminar</button>
      </div>
    </article>
  `,
  styles: `
    .tarjeta {
      padding: 1rem;
      border: 1px solid #d1d5db;
      border-radius: 0.5rem;
      background: white;
    }

    h2 {
      margin-top: 0;
    }

    dl {
      display: grid;
      grid-template-columns: max-content 1fr;
      gap: 0.5rem 1rem;
    }

    dt {
      font-weight: 700;
    }

    dd {
      margin: 0;
    }

    .acciones {
      display: flex;
      gap: 0.75rem;
    }
  `,
})
export class TareaCard {
  @Input({ required: true }) tarea!: Tarea;
  @Output() editar = new EventEmitter<Tarea>();
  @Output() eliminar = new EventEmitter<Tarea>();
}
