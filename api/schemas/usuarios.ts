import { Type, type Static } from "@sinclair/typebox";

export const UsuarioSchema = Type.Object({
  id_usuario: Type.Integer(),
  username: Type.String(),
  nombres: Type.String(),
  apellidos: Type.String(),
  fecha_nacimiento: Type.String(),
  nombre_completo: Type.String(),
  grupos: Type.Array(
    Type.Union([
      Type.Literal("user"),
      Type.Literal("admin"),
      Type.Literal("superadmin"),
    ]),
  ),
  activo: Type.Boolean(),
});

export const CrearUsuarioSchema = Type.Object({
  username: Type.String({ minLength: 1, maxLength: 30 }),
  nombres: Type.String({ minLength: 1 }),
  apellidos: Type.String({ minLength: 1 }),
  fecha_nacimiento: Type.String({ format: "date" }),
  password: Type.String({ minLength: 1 }),
  grupos: Type.Optional(
    Type.Array(
      Type.Union([
        Type.Literal("user"),
        Type.Literal("admin"),
        Type.Literal("superadmin"),
      ]),
    ),
  ),
});

export const ActualizarUsuarioSchema = Type.Partial(
  Type.Object({
    nombres: Type.String({ minLength: 1 }),
    apellidos: Type.String({ minLength: 1 }),
    fecha_nacimiento: Type.String({ format: "date" }),
    grupos: Type.Array(
      Type.Union([
        Type.Literal("user"),
        Type.Literal("admin"),
        Type.Literal("superadmin"),
      ]),
    ),
    activo: Type.Boolean(),
  }),
);

export type Usuario = Static<typeof UsuarioSchema>;
export type CrearUsuarioType = Static<typeof CrearUsuarioSchema>;
export type ActualizarUsuarioType = Static<typeof ActualizarUsuarioSchema>;
