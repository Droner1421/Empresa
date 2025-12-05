import requests
import json

# URL base de la API (ajusta si es diferente)
BASE_URL = "http://localhost:3000"

# Función helper para POST
def post_data(endpoint, data):
    url = f"{BASE_URL}/api{endpoint}"
    headers = {'Content-Type': 'application/json'}
    response = requests.post(url, data=json.dumps(data), headers=headers)
    if response.status_code == 201:
        print(f"Creado exitosamente: {endpoint} - {data.get('nombre') or data.get('titulo') or data.get('puesto')}")
        return response.json()  # Asume que devuelve el objeto con ID
    else:
        print(f"Error en {endpoint}: {response.status_code} - {response.text}")
        return None

# Datos de ejemplo para Empresas
empresas = [
    {"nombre": "Tech Solutions SA", "giro": "Tecnología", "tamaño": "Grande", "direccion": "Av. Reforma 123, Ciudad de México", "telefono": "555-1234"},
    {"nombre": "Salud Plus", "giro": "Salud", "tamaño": "Mediana", "direccion": "Calle Juárez 456, Guadalajara", "telefono": "555-5678"},
    {"nombre": "Finanzas Corp", "giro": "Finanzas", "tamaño": "Grande", "direccion": "Blvd. Hidalgo 789, Monterrey", "telefono": "555-9012"},
    {"nombre": "Manufacturas ABC", "giro": "Manufactura", "tamaño": "Pequeña", "direccion": "Río Nilo 101, Puebla", "telefono": "555-3456"},
]

# Vacantes para cada empresa (2 por empresa)
vacantes = [
    # Empresa 1
    {"id_empresa": None, "puesto": "Desarrollador Fullstack", "descripcion": "Buscamos desarrollador fullstack con experiencia en React y Node.js", "salario": 45000.00, "modalidad": "Remoto"},
    {"id_empresa": None, "puesto": "Analista de Datos", "descripcion": "Analista con conocimientos en Python y SQL", "salario": 35000.00, "modalidad": "Híbrido"},
    # Empresa 2
    {"id_empresa": None, "puesto": "Enfermera General", "descripcion": "Enfermera titulada para cuidado primario", "salario": 25000.00, "modalidad": "Presencial"},
    {"id_empresa": None, "puesto": "Médico General", "descripcion": "Médico general para consulta", "salario": 60000.00, "modalidad": "Presencial"},
    # Empresa 3
    {"id_empresa": None, "puesto": "Contador Senior", "descripcion": "Contador con experiencia en IFRS", "salario": 45000.00, "modalidad": "Remoto"},
    {"id_empresa": None, "puesto": "Analista Financiero", "descripcion": "Analista para reportes financieros", "salario": 40000.00, "modalidad": "Híbrido"},
    # Empresa 4
    {"id_empresa": None, "puesto": "Ingeniero Industrial", "descripcion": "Ingeniero para optimización de procesos", "salario": 38000.00, "modalidad": "Presencial"},
    {"id_empresa": None, "puesto": "Técnico de Mantenimiento", "descripcion": "Técnico para máquinas industriales", "salario": 22000.00, "modalidad": "Presencial"},
]

# Postulaciones para cada vacante (2 por vacante)
postulaciones = [
    # Vacante 1
    {"id_vacante": None, "nombre_postulante": "Juan Pérez", "correo": "juan.perez@email.com", "telefono": "777-1234", "CV_url": "https://cv.com/juan.pdf"},
    {"id_vacante": None, "nombre_postulante": "María López", "correo": "maria.lopez@email.com", "telefono": "777-5678", "CV_url": ""},
    # Vacante 2
    {"id_vacante": None, "nombre_postulante": "Carlos García", "correo": "carlos.garcia@email.com", "telefono": "777-9012", "CV_url": "https://cv.com/carlos.pdf"},
    {"id_vacante": None, "nombre_postulante": "Ana Fernández", "correo": "ana.fernandez@email.com", "telefono": "777-3456", "CV_url": ""},
    # Vacante 3
    {"id_vacante": None, "nombre_postulante": "Luis Rodríguez", "correo": "luis.rodriguez@email.com", "telefono": "777-7890", "CV_url": "https://cv.com/luis.pdf"},
    {"id_vacante": None, "nombre_postulante": "Elena Martínez", "correo": "elena.martinez@email.com", "telefono": "777-1122", "CV_url": ""},
    # Vacante 4
    {"id_vacante": None, "nombre_postulante": "Pedro Sánchez", "correo": "pedro.sanchez@email.com", "telefono": "777-3344", "CV_url": "https://cv.com/pedro.pdf"},
    {"id_vacante": None, "nombre_postulante": "Rosa Gómez", "correo": "rosa.gomez@email.com", "telefono": "777-5566", "CV_url": "https://cv.com/rosa.pdf"},
    # Vacante 5
    {"id_vacante": None, "nombre_postulante": "Miguel López", "correo": "miguel.lopez@email.com", "telefono": "777-7788", "CV_url": "https://cv.com/miguel.pdf"},
    {"id_vacante": None, "nombre_postulante": "Sofia Hernández", "correo": "sofia.hernandez@email.com", "telefono": "777-9999", "CV_url": ""},
    # Vacante 6
    {"id_vacante": None, "nombre_postulante": "Diego Morales", "correo": "diego.morales@email.com", "telefono": "777-1111", "CV_url": "https://cv.com/diego.pdf"},
    {"id_vacante": None, "nombre_postulante": "Laura Torres", "correo": "laura.torres@email.com", "telefono": "777-2222", "CV_url": "https://cv.com/laura.pdf"},
    # Vacante 7
    {"id_vacante": None, "nombre_postulante": "Javier Ramírez", "correo": "javier.ramirez@email.com", "telefono": "777-3333", "CV_url": ""},
    {"id_vacante": None, "nombre_postulante": "Isabel Silva", "correo": "isabel.silva@email.com", "telefono": "777-4444", "CV_url": "https://cv.com/isabel.pdf"},
    # Vacante 8
    {"id_vacante": None, "nombre_postulante": "Roberto Castro", "correo": "roberto.castro@email.com", "telefono": "777-5555", "CV_url": "https://cv.com/roberto.pdf"},
    {"id_vacante": None, "nombre_postulante": "Patricia Reyes", "correo": "patricia.reyes@email.com", "telefono": "777-6666", "CV_url": ""},
]



# Ejecutar creaciones en orden

print("Iniciando población de la base de datos con ~28 registros para empresas, vacantes y postulaciones...")

# Empresas
empresa_ids = []
for emp in empresas:
    resp = post_data("/empresas", emp)
    if resp:
        empresa_ids.append(resp.get("id_empresa"))
print(f"Creadas {len(empresa_ids)} empresas.")

# Vacantes (asignar id_empresa)
vacante_ids = []
idx = 0
for vac in vacantes:
    if idx >= len(empresa_ids):
        idx = 0
    vac["id_empresa"] = empresa_ids[idx]
    resp = post_data("/empresas/vacante", vac)
    if resp:
        vacante_ids.append(resp.get("id_vacante"))
    idx += 1
print(f"Creadas {len(vacante_ids)} vacantes.")

# Postulaciones (asignar id_vacante)
idx = 0
for post in postulaciones:
    if idx >= len(vacante_ids):
        idx = 0
    post["id_vacante"] = vacante_ids[idx]
    post_data("/empresas/postulacion", post)
    idx += 1
print(f"Creadas {len(postulaciones)} postulaciones.")

print("¡Población completada para la API de empresas!")
