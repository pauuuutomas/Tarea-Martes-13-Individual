## Cómo ejecutar el proyecto

### 1. PostgreSQL (Docker)

Requisitos: tener Docker Desktop instalado y en ejecución, y el archivo `api/.env` configurado con las variables de conexión a PostgreSQL.

Desde la carpeta `api/`, ejecutar:

```bash
docker compose up -d db
```

Esto inicia el contenedor de PostgreSQL en segundo plano.

Para verificar que esté funcionando:

```bash
docker compose ps
```

El contenedor `db` debería aparecer con estado `healthy`.

### 2. API (Fastify)

Desde la carpeta `api/`, ejecutar:

```bash
npm install
npm run dev
```

La API quedará disponible en `http://localhost:3000`.

### 3. Verificar la API

Con `npm run dev` ejecutándose, abrir las siguientes direcciones en el navegador:

- **Estado de la API:** http://localhost:3000/health
- **Conexión a PostgreSQL:** http://localhost:3000/db-health
- **Documentación Swagger:** http://localhost:3000/documentation

### 4. Frontend (Angular)

Desde la carpeta `frontend/`, instalar las dependencias y ejecutar:

```bash
npm install
npm start
```

El frontend estará disponible en:

http://localhost:4200/

**Importante:** el frontend utiliza servicios locales con datos en memoria y funciona de manera independiente de la API. Los datos creados o modificados en el frontend no se persisten al recargar la página.

### Orden recomendado de inicio

1. Iniciar Docker y PostgreSQL.
2. Iniciar la API.
3. Iniciar el frontend.

### Detener PostgreSQL

Desde la carpeta `api/`, ejecutar:

```bash
docker compose stop db
```
