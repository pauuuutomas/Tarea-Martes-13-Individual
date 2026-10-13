import { Type, type Static } from "@sinclair/typebox";

export const TareaSchema = Type.Object({
  id_tarea: Type.Integer(),
  id_creador: Type.Integer(),
  grupo: Type.Union([
    Type.Literal("user"),
    Type.Literal("admin"),
    Type.Literal("superadmin"),
  ]),
  titulo: Type.String(),
  descripcion: Type.Union([Type.String(), Type.Null()]),
  prioridad: Type.Union([
    Type.Literal("0:baja"),
    Type.Literal("1:media"),
    Type.Literal("2:alta"),
  ]),
  creada: Type.String(),
  terminada: Type.Union([Type.String(), Type.Null()]),
  estado: Type.Union([Type.Literal("Abierta"), Type.Literal("Cerrada")]),
});

export const CrearTareaSchema = Type.Object({
  id_creador: Type.Integer({ minimum: 1 }),
  grupo: Type.Union([
    Type.Literal("user"),
    Type.Literal("admin"),
    Type.Literal("superadmin"),
  ]),
  titulo: Type.String({ minLength: 1, maxLength: 100 }),
  descripcion: Type.Optional(Type.Union([Type.String(), Type.Null()])),
  prioridad: Type.Optional(
    Type.Union([
      Type.Literal("0:baja"),
      Type.Literal("1:media"),
      Type.Literal("2:alta"),
    ]),
  ),
});

export const ActualizarTareaSchema = Type.Partial(
  Type.Object({
    grupo: Type.Union([
      Type.Literal("user"),
      Type.Literal("admin"),
      Type.Literal("superadmin"),
    ]),
    titulo: Type.String({ minLength: 1, maxLength: 100 }),
    descripcion: Type.Union([Type.String(), Type.Null()]),
    prioridad: Type.Union([
      Type.Literal("0:baja"),
      Type.Literal("1:media"),
      Type.Literal("2:alta"),
    ]),
  }),
);

export type Tarea = Static<typeof TareaSchema>;
export type CrearTareaType = Static<typeof CrearTareaSchema>;
export type ActualizarTareaType = Static<typeof ActualizarTareaSchema>;
