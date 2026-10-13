import type { FastifyInstance } from "fastify";
import { Type } from "@sinclair/typebox";
import { usuariosRepo } from "../repositories/usuarios-repository.ts";
import {
  ActualizarUsuarioSchema,
  CrearUsuarioSchema,
  UsuarioSchema,
} from "../schemas/usuarios.ts";
import {
  type ActualizarUsuarioType,
  type CrearUsuarioType,
} from "../schemas/usuarios.ts";

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

export async function usuariosRoutes(app: FastifyInstance) {
  app.get(
    "/usuarios",
    {
      schema: {
        summary: "Listar usuarios",
        description: "Devuelve todos los usuarios sin incluir sus credenciales.",
        response: {
          200: Type.Array(UsuarioSchema),
          500: ErrorResponseSchema,
        },
      },
    },
    async () => {
      return usuariosRepo.obtenerTodos();
    },
  );

  app.get(
    "/usuarios/:id_usuario",
    {
      schema: {
        summary: "Obtener usuario por ID",
        description: "Devuelve los datos de un usuario específico.",
        params: Type.Object({
          id_usuario: Type.Integer({ minimum: 1 }),
        }),
        response: {
          200: UsuarioSchema,
          400: ValidationErrorResponseSchema,
          404: ErrorResponseSchema,
          500: ErrorResponseSchema,
        },
      },
    },
    async (request) => {
      const { id_usuario } = request.params as { id_usuario: number };
      return usuariosRepo.obtenerPorId(id_usuario);
    },
  );

  app.post(
    "/usuarios",
    {
      schema: {
        summary: "Crear usuario",
        description:
          "Registra un usuario y sus credenciales. La respuesta no incluye la contraseña ni su hash.",
        body: CrearUsuarioSchema,
        response: {
          201: UsuarioSchema,
          400: ValidationErrorResponseSchema,
          500: ErrorResponseSchema,
        },
      },
    },
    async (request, reply) => {
      const usuario = await usuariosRepo.crear(
        request.body as CrearUsuarioType,
      );

      return reply.code(201).send(usuario);
    },
  );

  app.patch(
    "/usuarios/:id_usuario",
    {
      schema: {
        summary: "Actualizar usuario",
        description: "Modifica los datos de un usuario existente.",
        params: Type.Object({
          id_usuario: Type.Integer({ minimum: 1 }),
        }),
        body: ActualizarUsuarioSchema,
        response: {
          200: UsuarioSchema,
          400: ValidationErrorResponseSchema,
          404: ErrorResponseSchema,
          500: ErrorResponseSchema,
        },
      },
    },
    async (request, reply) => {
      const { id_usuario } = request.params as { id_usuario: number };
      const datos = request.body as ActualizarUsuarioType;

      const usuario = await usuariosRepo.actualizar(id_usuario, datos);

      return reply.code(200).send(usuario);
    },
  );

  app.delete(
    "/usuarios/:id_usuario",
    {
      schema: {
        summary: "Eliminar usuario",
        description: "Elimina un usuario por su ID.",
        params: Type.Object({
          id_usuario: Type.Integer({ minimum: 1 }),
        }),
        response: {
          204: Type.Null({ description: "Usuario eliminado; no devuelve cuerpo." }),
          400: ValidationErrorResponseSchema,
          404: ErrorResponseSchema,
          500: ErrorResponseSchema,
        },
      },
    },
    async (request, reply) => {
      const { id_usuario } = request.params as { id_usuario: number };

      const eliminado = await usuariosRepo.eliminar(id_usuario);

      if (!eliminado) {
        return reply.code(404).send({
          mensaje: "Usuario no encontrado.",
        });
      }

      return reply.code(204).send();
    },
  );
}
