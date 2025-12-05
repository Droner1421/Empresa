# API de Gestión de Empresas, Vacantes y Postulaciones

Este proyecto es una API REST construida con NestJS y MySQL para gestionar empresas, vacantes de empleo y postulaciones de candidatos.

## Instalación

```bash
npm install
```

## Configuración

Crea un archivo `.env` con las siguientes variables:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=root
DB_NAME=empresa_db
```

## Ejecutar la aplicación

```bash
# Modo desarrollo
npm run start:dev

# Modo producción
npm run start:prod
```

## Estructura de Entidades

### Empresa
- `id_empresa` (PK)
- `nombre`
- `giro`
- `tamaño`
- `direccion`
- `telefono`
- `fecha_registro`

### Vacante
- `id_vacante` (PK)
- `id_empresa` (FK)
- `puesto`
- `descripcion`
- `salario`
- `modalidad` (Presencial / Remoto / Híbrido)
- `fecha_publicacion`
- `estatus` (Activa / Cerrada)

### Postulacion
- `id_postulacion` (PK)
- `id_vacante` (FK)
- `nombre_postulante`
- `correo`
- `telefono`
- `CV_url`
- `fecha_postulacion`
- `estatus`

## Endpoints

### EMPRESAS

**Crear empresa**
```
POST /empresas
Body: {
  "nombre": "Tech Corp",
  "giro": "Tecnología",
  "tamaño": "Grande",
  "direccion": "Calle Principal 123",
  "telefono": "123456789"
}
```

**Listar empresas registradas**
```
GET /empresas
```

**Obtener una empresa**
```
GET /empresas/empresa/:id
```

**Actualizar empresa**
```
PATCH /empresas/empresa/:id
Body: { campos a actualizar }
```

**Eliminar empresa**
```
DELETE /empresas/empresa/:id
```

### VACANTES

**Crear vacante**
```
POST /empresas/vacante
Body: {
  "id_empresa": 1,
  "puesto": "Desarrollador",
  "descripcion": "Se busca dev senior",
  "salario": 50000,
  "modalidad": "Remoto"
}
```

**Listar todas las vacantes**
```
GET /empresas/vacantes
```

**Consultar vacantes activas de una empresa**
```
GET /empresas/empresa/:idEmpresa/activas
```

**Ver vacantes bajo modalidad remota**
```
GET /empresas/vacantes/modalidad/remoto
```

**Contar vacantes cerradas**
```
GET /empresas/vacantes/count/cerradas
```

**Obtener una vacante**
```
GET /empresas/vacante/:id
```

**Actualizar vacante**
```
PATCH /empresas/vacante/:id
Body: { campos a actualizar }
```

**Cerrar una vacante**
```
PATCH /empresas/vacante/:id/cerrar
```

**Eliminar vacante**
```
DELETE /empresas/vacante/:id
```

### POSTULACIONES

**Crear postulación**
```
POST /empresas/postulacion
Body: {
  "id_vacante": 1,
  "nombre_postulante": "Juan Pérez",
  "correo": "juan@email.com",
  "telefono": "987654321",
  "CV_url": "https://ejemplo.com/cv.pdf"
}
```

**Listar todas las postulaciones**
```
GET /empresas/postulaciones
```

**Mostrar postulaciones a una vacante**
```
GET /empresas/vacante/:idVacante/postulaciones
```

**Consultar postulantes por fecha**
```
GET /empresas/postulaciones/por-fecha?fechaInicio=2024-01-01&fechaFin=2024-12-31
```

**Listar postulantes con CV registrado**
```
GET /empresas/postulantes/con-cv
```

**Obtener una postulación**
```
GET /empresas/postulacion/:id
```

**Actualizar postulación**
```
PATCH /empresas/postulacion/:id
Body: { campos a actualizar }
```

**Actualizar estatus de postulación**
```
PATCH /empresas/postulacion/:id/estatus
Body: { "estatus": "Aceptada" }
```

**Eliminar postulación**
```
DELETE /empresas/postulacion/:id
```

**Mostrar vacantes junto con sus postulantes**
```
GET /empresas/vacantes/con-postulantes
```

## Respuesta de Error

En caso de error, la API responde con:

```json
{
  "statusCode": 400,
  "message": "error message",
  "error": "Bad Request"
}
```

## Testing

```bash
npm run test
npm run test:e2e
npm run test:cov
```
