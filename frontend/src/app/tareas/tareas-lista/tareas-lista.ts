import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TareaCard } from '../tarea-card/tarea-card';
import { Tarea, TareaService } from '../tarea.service';

@Component({
  selector: 'app-tareas-lista',
  imports: [RouterLink, TareaCard],
  template: `
    <section>
      <div class="encabezado">
        <div>
          <h1>Tareas</h1>
          <p>Listado de tareas.</p>
        </div>
        <a class="boton" routerLink="/tareas/crear">Crear tarea</a>
      </div>

      @if (tareas.length === 0) {
        <p>No hay tareas para mostrar.</p>
      } @else {
        <div class="lista-tareas">
          @for (tarea of tareas; track tarea.id_tarea) {
            <app-tarea-card
              [tarea]="tarea"
              (editar)="editarTarea($event)"
              (eliminar)="eliminarTarea($event)"
            />
          }
        </div>
      }
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

    .encabezado p {
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

    .lista-tareas {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 1rem;
    }
  `,
})
export class TareasLista {
  private readonly tareaService = inject(TareaService);
  private readonly router = inject(Router);
  protected tareas = this.tareaService.obtenerTodas();

  protected editarTarea(tarea: Tarea): void {
    void this.router.navigate(['/tareas', tarea.id_tarea]);
  }

  protected eliminarTarea(tarea: Tarea): void {
    const confirmar = window.confirm('¿Querés eliminar esta tarea?');
    if (!confirmar) {
      return;
    }

    this.tareaService.eliminar(tarea.id_tarea);
    this.tareas = [...this.tareaService.obtenerTodas()];
  }
}
