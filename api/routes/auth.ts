import type { FastifyInstance } from "fastify";
import { Type } from "@sinclair/typebox";
import { UnAuthenticatedError } from "../errors/response.errors.ts";
import { usuariosRepo } from "../repositories/usuarios-repository.ts";
import { UsuarioSchema } from "../schemas/usuarios.ts";

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

const LoginRequestSchema = Type.Object({
  username: Type.String({ minLength: 1 }),
  password: Type.String({ minLength: 1 }),
});

function obtenerCredencialesBasicas(header?: string) {
  if (!header || !header.startsWith("Basic ")) {
    throw new UnAuthenticatedError("Se requiere autenticación básica.");
  }

  const base64 = header.replace("Basic ", "");
  const decoded = Buffer.from(base64, "base64").toString("utf-8");
  const [username, ...rest] = decoded.split(":");
  const password = rest.join(":");

  if (!username || !password) {
    throw new UnAuthenticatedError("Credenciales inválidas.");
  }

  return { username, password };
}

export async function authRoutes(app: FastifyInstance) {
  app.post(
    "/login",
    {
      schema: {
        summary: "Iniciar sesión",
        description:
          "Valida el username y la contraseña. Devuelve los datos públicos del usuario, sin emitir un token.",
        body: LoginRequestSchema,
        response: {
          200: Type.Object({
            mensaje: Type.String(),
            usuario: UsuarioSchema,
          }),
          400: ValidationErrorResponseSchema,
          401: ErrorResponseSchema,
          500: ErrorResponseSchema,
        },
      },
    },
    async (request, reply) => {
      const { username, password } = request.body as {
        username: string;
        password: string;
      };

      const usuario = await usuariosRepo.verificarCredenciales(
        username,
        password,
      );

      return reply.code(200).send({
        mensaje: "Inicio de sesión correcto.",
        usuario,
      });
    },
  );

  app.get(
    "/usuarios/me",
    {
      schema: {
        summary: "Obtener usuario autenticado",
        //Representa la consulta de los datos del usuario autenticado, sin requerir un token. Se utiliza para validar las credenciales básicas en cada petición.
        description:
          "Devuelve los datos públicos del usuario autenticado mediante HTTP Basic.",
        security: [{ basicAuth: [] }],
        response: {
          200: UsuarioSchema,
          401: ErrorResponseSchema,
          500: ErrorResponseSchema,
        },
      },
    },
    async (request) => {
      const authHeader = request.headers.authorization;
      const { username, password } = obtenerCredencialesBasicas(authHeader);

      return usuariosRepo.verificarCredenciales(username, password);
    },
  );
}
