import type { FastifyInstance } from "fastify";
import { Type } from "@sinclair/typebox";
import { tareasRepo } from "../repositories/tareas-repository.ts";
import {
  ActualizarTareaSchema,
  CrearTareaSchema,
  TareaSchema,
} from "../schemas/tareas.ts";
import type { ActualizarTareaType, CrearTareaType } from "../schemas/tareas.ts";

const ErrorResponseSchema = Type.Object({
  mensaje: Type.String(),
});

const ValidationErrorResponseSchema = Type.Object({
  mensaje: Type.String(),
  errores: Type.Array(
    Type.Object({
      campo: Type.String(),
      mensaje: Type.String(),
    }),
  ),
});

export async function tareasRoutes(app: FastifyInstance) {
  app.get(
    "/tareas",
    {
      schema: {
        summary: "Listar tareas",
        description: "Devuelve todas las tareas ordenadas por fecha de creación.",
        response: {
          200: Type.Array(TareaSchema),
          500: ErrorResponseSchema,
        },
      },
    },
    async () => {
      return tareasRepo.obtenerTodas();
    },
  );

  app.get(
    "/tareas/:id_tarea",
    {
      schema: {
        summary: "Obtener tarea por ID",
        description: "Devuelve una tarea específica.",
        params: Type.Object({
          id_tarea: Type.Integer({ minimum: 1 }),
        }),
        response: {
          200: TareaSchema,
          400: ValidationErrorResponseSchema,
          404: ErrorResponseSchema,
          500: ErrorResponseSchema,
        },
      },
    },
    async (request) => {
      const { id_tarea } = request.params as { id_tarea: number };
      return tareasRepo.obtenerPorId(id_tarea);
    },
  );

  app.post(
    "/tareas",
    {
      schema: {
        summary: "Crear tarea",
        description: "Registra una nueva tarea asociada a un usuario creador.",
        body: CrearTareaSchema,
        response: {
          201: TareaSchema,
          400: ValidationErrorResponseSchema,
          500: ErrorResponseSchema,
        },
      },
    },
    async (request, reply) => {
      const tarea = request.body as CrearTareaType;
      const nuevaTarea = await tareasRepo.crear(tarea.id_creador, tarea);
      return reply.code(201).send(nuevaTarea);
    },
  );

  app.patch(
    "/tareas/:id_tarea",
    {
      schema: {
        summary: "Actualizar tarea",
        description: "Modifica los campos permitidos de una tarea existente.",
        params: Type.Object({
          id_tarea: Type.Integer({ minimum: 1 }),
        }),
        body: ActualizarTareaSchema,
        response: {
          200: TareaSchema,
          400: ValidationErrorResponseSchema,
          404: ErrorResponseSchema,
          500: ErrorResponseSchema,
        },
      },
    },
    async (request, reply) => {
      const { id_tarea } = request.params as { id_tarea: number };
      const datos = request.body as ActualizarTareaType;
      const tarea = await tareasRepo.actualizar(id_tarea, datos);
      return reply.code(200).send(tarea);
    },
  );

  app.patch(
    "/tareas/:id_tarea/finalizar",
    {
      schema: {
        summary: "Finalizar tarea",
        description: "Marca una tarea como cerrada con la fecha actual o una fecha enviada por el cliente.",
        params: Type.Object({
          id_tarea: Type.Integer({ minimum: 1 }),
        }),
        body: Type.Optional(
          Type.Object({
            fecha: Type.Optional(Type.String({ format: "date-time" })),
          }),
        ),
        response: {
          200: TareaSchema,
          400: ValidationErrorResponseSchema,
          404: ErrorResponseSchema,
          500: ErrorResponseSchema,
        },
      },
    },
    async (request, reply) => {
      const { id_tarea } = request.params as { id_tarea: number };
      const payload = (request.body ?? {}) as { fecha?: string };
      const tarea = await tareasRepo.finalizar(id_tarea, payload.fecha);
      return reply.code(200).send(tarea);
    },
  );

  app.delete(
    "/tareas/:id_tarea",
    {
      schema: {
        summary: "Eliminar tarea",
        description: "Elimina una tarea por su ID.",
        params: Type.Object({
          id_tarea: Type.Integer({ minimum: 1 }),
        }),
        response: {
          204: Type.Null({ description: "Tarea eliminada; no devuelve cuerpo." }),
          400: ValidationErrorResponseSchema,
          404: ErrorResponseSchema,
          500: ErrorResponseSchema,
        },
      },
    },
    async (request, reply) => {
      const { id_tarea } = request.params as { id_tarea: number };
      await tareasRepo.eliminar(id_tarea);
      return reply.code(204).send();
    },
  );
}
