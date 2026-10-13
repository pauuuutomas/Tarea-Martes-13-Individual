import { Injectable } from '@angular/core';

export type GrupoTarea = 'user' | 'admin' | 'superadmin';
export type PrioridadTarea = '0:baja' | '1:media' | '2:alta';
export type EstadoTarea = 'Abierta' | 'Cerrada';

export interface Tarea {
  id_tarea: number;
  id_creador: number;
  grupo: GrupoTarea;
  titulo: string;
  descripcion: string | null;
  prioridad: PrioridadTarea;
  creada: string;
  terminada: string | null;
  estado: EstadoTarea;
}

export interface NuevaTarea {
  id_creador: number;
  grupo: GrupoTarea;
  titulo: string;
  descripcion?: string | null;
  prioridad?: PrioridadTarea;
}

export type CambiosTarea = Partial<
  Pick<Tarea, 'grupo' | 'titulo' | 'descripcion' | 'prioridad'>
>;

@Injectable({
  providedIn: 'root',
})
export class TareaService {
  private tareas: Tarea[] = [
    {
      id_tarea: 1,
      id_creador: 1,
      grupo: 'user',
      titulo: 'Revisar configuración del repositorio',
      descripcion: 'Comprobar que el proyecto inicia correctamente.',
      prioridad: '0:baja',
      creada: '2026-10-10T12:00:00.000Z',
      terminada: '2026-10-11T12:00:00.000Z',
      estado: 'Cerrada',
    },
    {
      id_tarea: 2,
      id_creador: 2,
      grupo: 'admin',
      titulo: 'Actualizar documentación',
      descripcion: 'Revisar la documentación del proyecto.',
      prioridad: '1:media',
      creada: '2026-10-12T12:00:00.000Z',
      terminada: null,
      estado: 'Abierta',
    },
    {
      id_tarea: 3,
      id_creador: 3,
      grupo: 'superadmin',
      titulo: 'Preparar una tarea de ejemplo',
      descripcion: null,
      prioridad: '2:alta',
      creada: '2026-10-13T12:00:00.000Z',
      terminada: null,
      estado: 'Abierta',
    },
  ];

  obtenerTodas(): Tarea[] {
    return this.tareas;
  }

  obtenerPorId(idTarea: number): Tarea | undefined {
    return this.tareas.find((tarea) => tarea.id_tarea === idTarea);
  }

  crear(datos: NuevaTarea): Tarea {
    const idTarea =
      Math.max(0, ...this.tareas.map((tarea) => tarea.id_tarea)) + 1;
    const tarea: Tarea = {
      id_tarea: idTarea,
      id_creador: datos.id_creador,
      grupo: datos.grupo,
      titulo: datos.titulo,
      descripcion: datos.descripcion ?? null,
      prioridad: datos.prioridad ?? '1:media',
      creada: new Date().toISOString(),
      terminada: null,
      estado: 'Abierta',
    };

    this.tareas.push(tarea);
    return tarea;
  }

  actualizar(idTarea: number, cambios: CambiosTarea): Tarea | undefined {
    const tarea = this.obtenerPorId(idTarea);
    if (!tarea) {
      return undefined;
    }

    Object.assign(tarea, cambios);
    return tarea;
  }

  eliminar(idTarea: number): boolean {
    const indice = this.tareas.findIndex((tarea) => tarea.id_tarea === idTarea);
    if (indice === -1) {
      return false;
    }

    this.tareas.splice(indice, 1);
    return true;
  }
}
