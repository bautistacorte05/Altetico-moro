# **PROMPT DE DESARROLLO: SITIO WEB ATLÉTICO MORO**

## **1\. ROL Y OBJETIVO**

Eres un Desarrollador Full Stack Senior experto en Next.js, Tailwind CSS y Supabase. Tu tarea es generar la estructura completa, el esquema de base de datos y los componentes principales para el sitio web oficial del equipo de fútbol "Atlético Moro".  
Requisito Crítico: La aplicación debe tener un inicio de sesión obligatorio. Los usuarios no pueden ver el contenido principal sin autenticarse primero.

## **2\. STACK TECNOLÓGICO**

* Frontend: Next.js 14+ (App Router), React, TypeScript.  
* Estilos: Tailwind CSS (Diseño moderno y responsive).  
* Backend/Base de Datos: Supabase (PostgreSQL, Auth, Storage).  
* Iconos: Lucide React o Heroicons.  
* Utilidades: date-fns (para fechas), clsx/tailwind-merge.

## **3\. IDENTIDAD VISUAL Y DISEÑO**

* Colores Corporativos:  
  * Primario: Rojo Intenso (Ej: \#DC143C o bg-red-600).  
  * Secundario: Azul Profundo (Ej: \#0047AB o bg-blue-800).  
  * Acentos: Blanco y Gris claro para fondos.  
* Estilo: Moderno, deportivo, limpio, con tarjetas (cards) sombreadas y bordes redondeados.  
* Escudo: Debe haber un placeholder claro para el escudo del club (/images/escudo.png).  
* Tipografía: Sans-serif moderna (Inter o Roboto).

## **4\. ESQUEMA DE BASE DE DATOS (SUPABASE)**

Genera el SQL necesario para crear las siguientes tablas en Supabase. Asegúrate de incluir Row Level Security (RLS) para proteger los datos.

1. profiles (Extensión de auth.users):  
   * id (uuid, pk), email, full\_name, role (admin/socio), avatar\_url, is\_active (boolean).  
2. players (Jugadores):  
   * id, name, jersey\_number, position (Portero, Defensa, etc.), photo\_url, goals, matches\_played.  
3. matches (Partidos):  
   * id, opponent\_name, date, location, result (null si es futuro), tournament (Default: 'Torneo El Campito').  
4. training\_schedule (Horarios):  
   * id, day\_of\_week, start\_time, end\_time, location.  
5. membership\_stats (Contador):  
   * id, active\_count (integer).  
6. social\_links:  
   * id, platform, url, icon.

## **5\. FLUJO DE USUARIO**

1. Landing Pública (Opcional) \-\> Login: Al entrar, redirigir inmediatamente a /login si no hay sesión.  
2. Login: Formulario simple (Email/Password) con el escudo del club visible.  
3. Dashboard Privado: Una vez logueado, acceder al panel principal con la navegación completa.

## **6\. ESTRUCTURA DE PÁGINAS Y COMPONENTES**

### **A. Página de Login (/login)**

* Fondo con degradado Rojo/Azul.  
* Logo/Escudo central grande.  
* Formulario centrado.  
* Texto: "Acceso Socios Atlético Moro".

### **B. Dashboard Principal (/dashboard)**

* Navbar: Logo pequeño, nombre de usuario, botón logout.  
* Hero Section:  
  * Título: "Atlético Moro".  
  * Subtítulo: "Torneo El Campito".  
  * Texto Histórico: "Club fundado por miembros del colegio Santo Tomas Moro, dedicado a competir futbolísticamente."  
  * Contador animado de Socios Activos.  
* Próximo Partido: Tarjeta destacada con fecha, rival y hora.  
* Grid de Jugadores: Fotos de los jugadores (usar placeholders si no hay URL), número de camiseta y posición.  
* Horarios de Entrenamiento: Lista simple de días y horas.  
* Redes Sociales: Footer o sección con iconos clickeables (Instagram, Facebook, etc.).

### **C. Página de Equipo (/dashboard/equipo)**

* Listado completo de jugadores.  
* Formación táctica visual (opcional, usando un grid CSS).

## **7\. CONTENIDO ESPECÍFICO (COPYWRITING)**

Usa exactamente estos textos en la interfaz:

* Nombre del Club: Atlético Moro.  
* Descripción: "Fundado por miembros del colegio Santo Tomas Moro, dedicado a competir futbolísticamente, actualmente compitiendo en el Torneo El Campito."  
* Colores: Predominancia de Rojo y Azul en botones, headers y bordes.

## **8\. INSTRUCCIONES DE IMPLEMENTACIÓN PARA LA IA**

1. Paso 1: Proporciona el script SQL completo para ejecutar en el editor de Supabase.  
2. Paso 2: Escribe la configuración del cliente de Supabase (lib/supabase/client.ts y server.ts).  
3. Paso 3: Genera el código del componente de Login con validación básica.  
4. Paso 4: Genera el layout principal del Dashboard protegido por middleware (si el usuario no está logueado, vuelve al login).  
5. Paso 5: Crea los componentes UI para las tarjetas de jugadores y partidos usando Tailwind CSS con los colores rojo/azul.  
6. Manejo de Imágenes: Usa https://placehold.co/400x400/red/white?text=Escudo y https://placehold.co/300x400/blue/white?text=Jugador como placeholders temporales donde irán las fotos reales.

## **9\. RESTRICCIONES**

* No uses CSS puro, usa Tailwind CSS.  
* Asegura que el diseño sea Mobile First (responsive).  
* El conteo de socios debe leerse de la base de datos, no ser hardcoded.  
* La autenticación debe manejar errores (contraseña incorrecta, usuario no encontrado).  
* 

