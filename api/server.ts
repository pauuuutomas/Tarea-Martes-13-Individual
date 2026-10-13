import Fastify from "fastify";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";
import { myPool } from "./db/database.ts";
import { authRoutes } from "./routes/auth.ts";
import { tareasRoutes } from "./routes/tareas.ts";
import { usuariosRoutes } from "./routes/usuarios.ts";
import {
  BadRequestError,
  ConflictError,
  ForbiddenError,
  InternalError,
  NotAuthorizedError,
  NotFoundError,
  UnAuthenticatedError,
  transformarErrorPostgres,
} from "./errors/response.errors.ts";

const app = Fastify({
  logger: true,
});

app.setErrorHandler((error, request, reply) => {
  const errorAsAny = error as any;
  const validationErrors = Array.isArray(errorAsAny.validation)
    ? errorAsAny.validation
    : undefined;

  if (validationErrors) {
    return reply.code(400).send({
      mensaje: "Los datos enviados no cumplen con la validación requerida.",
      errores: validationErrors.map((item: any) => ({
        campo: item.instancePath || "body",
        mensaje: item.message,
      })),
    });
  }
  if (
    error &&
    typeof error === "object" &&
    "code" in error &&
    typeof error.code === "string" &&
    /^\d{5}$/.test(error.code)
  ) {
    const errorTransformado = transformarErrorPostgres(error as any);

    return reply
      .code(errorTransformado.statusCode ?? 500)
      .send({ mensaje: errorTransformado.message });
  }
  if (
    error instanceof BadRequestError ||
    error instanceof ConflictError ||
    error instanceof ForbiddenError ||
    error instanceof NotAuthorizedError ||
    error instanceof NotFoundError ||
    error instanceof UnAuthenticatedError ||
    error instanceof InternalError
  ) {
    return reply.code(error.statusCode ?? 500).send({
      mensaje: error.message,
    });
  }

  if (error && typeof error === "object" && "statusCode" in error) {
    const statusCode = Number(errorAsAny.statusCode ?? 500);
    return reply.code(statusCode).send({
      mensaje: errorAsAny.message || "Error interno del servidor.",
    });
  }

  request.log.error({ err: error }, "Error no controlado");

  return reply.code(500).send({
    mensaje: "Error interno del servidor.",
  });
});

async function iniciarServidor() {
  await app.register(swagger, {
    openapi: {
      info: {
        title: "API - Tarea Individual",
        description: "API para gestionar usuarios y tareas",
        version: "1.0.0",
      },
      components: {
        securitySchemes: {
          basicAuth: {
            type: "http",
            scheme: "basic",
          },
        },
      },
    },
  });

  await app.register(swaggerUI, {
    routePrefix: "/documentation",
  });

  app.get(
    "/health",
    {
      schema: {
        hide: true,
        summary: "Verificar estado del servidor",
        description: "Comprueba que la API está respondiendo.",
      },
    },
    async () => {
      return { estado: "ok" };
    },
  );

  app.get(
    "/db-health",
    {
      schema: {
        hide: true,
        summary: "Verificar conexión con PostgreSQL",
        description: "Comprueba que la API puede consultar la base de datos.",
      },
    },
    async () => {
      const result = await myPool.query("SELECT 1 AS conexion");

      return {
        estado: "ok",
        baseDeDatos: result.rows[0].conexion,
      };
    },
  );

  await app.register(usuariosRoutes);
  await app.register(authRoutes);
  await app.register(tareasRoutes);

  try {
    await app.listen({
      port: Number(process.env.PORT || 3000),
      host: "0.0.0.0",
    });
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
}

iniciarServidor();
