# ProyectoM4 - Ezequiel Molinari

SPA de gestión de tareas 

## Stack

- React + TypeScript
- Firebase (Auth + Firestore)
- AWS SES + Vercel Serverless Functions
- Vitest + React Testing Library

## Requisitos

- Node.js 18+
- Cuenta en Firebase
- Cuenta en AWS con SES configurado

## Instalación

1. Clonar el repositorio

```bash
git clone <url-del-repo>
cd ProyectoM4-EzequielMolinari
```

2. Instalar dependencias

```bash
npm install
```

3. Crear el archivo `.env` basándose en `.env.example`

```bash
cp .env.example .env
```

4. Completar las variables de entorno en `.env`

## Variables de entorno

```env
# Firebase
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=

# AWS SES
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
SES_FROM_EMAIL=
```

## Scripts

```bash
npm run dev      # servidor de desarrollo
npm run build    # build de producción
npm run test     # correr tests
```

## Deploy en Vercel

1. Importar el repositorio en Vercel
2. Agregar las variables de entorno en el panel de Vercel
3. Vercel detecta automáticamente que es un proyecto Vite

## Estructura

```
src/
├─ pages/        # Login, Register, Tasks
├─ components/   # TodoForm, TodoList, TaskFilter
├─ hooks/        # useAuth, useTasks
├─ services/     # firebase.ts, emailService.ts
├─ routes/       # ProtectedRoute
├─ types/        # interfaces TypeScript
└─ utils/        # validators
functions/       # Serverless Functions (AWS SES)
tests/           # unit tests
```