# Caster Backoffice - Tokyo Admin Dashboard

Sistema de administración backoffice para Caster AI basado en Tokyo Admin Dashboard.

## 🚀 Inicio Rápido

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Compilar para producción
npm run build

# Previsualizar build de producción
npm run preview
```

## 🌐 Despliegue en Vercel

### Opción 1: Desde la Web de Vercel (Más Fácil)

1. Ve a [vercel.com](https://vercel.com)
2. Inicia sesión con tu cuenta de GitHub
3. Haz clic en "New Project"
4. Importa el repositorio `vortex-caster-back-test1`
5. Vercel detectará automáticamente que es un proyecto Vite
6. Haz clic en "Deploy"

### Opción 2: Con Vercel CLI

```bash
# Instalar Vercel CLI globalmente
npm install -g vercel

# Desplegar
vercel
```

**Configuración automática de Vercel:**
- Framework Preset: Vite
- Build Command: `npm run build`
- Output Directory: `dist`

## 🔐 Credenciales de Prueba

- **Email**: admin@example.com
- **Password**: admin123

## 📋 Características

- ✅ Sistema de autenticación
- ✅ Dashboard con métricas
- ✅ Gestión de usuarios de la app
- ✅ Gestión de roles y permisos del backoffice
- ✅ Sistema de notificaciones
- ✅ Gestión de banners
- ✅ Gestión de pop-ups informativos
- ✅ Diseño responsivo basado en Tokyo Admin Dashboard
- ✅ Sistema completo de tokens de diseño

## 🏗️ Estructura

```
src/
├── components/
│   ├── layout/       # Header, Sidebar
│   └── ui/          # Componentes reutilizables
├── context/         # Auth context
├── pages/           # Páginas de la app
├── styles/          # Tokens y estilos globales
└── types/           # Tipos TypeScript
```

## 🎨 Sistema de Diseño

El proyecto incluye un sistema completo de tokens basado en Tokyo Admin Dashboard:
- Colores y paletas
- Tipografía
- Espaciado
- Sombras y elevaciones
- Bordes y radios

## 📱 Navegación

El sistema sigue el flujo:
1. Login → Dashboard
2. Sidebar controla navegación entre módulos
3. Header y Sidebar son persistentes
4. Solo el área de contenido cambia
5. Logout redirige a Login
