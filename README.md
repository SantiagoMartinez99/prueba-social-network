# PhotoU (Prueba Tecnica)

Este proyecto es una aplicación web desarrollada con React, diseñada para permitir a los usuarios registrarse e iniciar sesión, así como interactuar con publicaciones en una plataforma social. Los usuarios pueden crear una cuenta, iniciar sesión con sus credenciales, y autenticar a través de Google. La aplicación también permite a los usuarios publicar imágenes, dar "me gusta", comentar en publicaciones y ver sus propias publicaciones y las de otros usuarios.

**NOTA: Este proyecto se encuentra desplegado en netlify, puedes revisarlo aca:**
https://visionary-monstera-2221a7.netlify.app


## Características

- Registro de usuarios con nombre, correo electrónico y contraseña.
- Inicio de sesión con correo electrónico y Google.
- -Los usuarios pueden crear publicaciones con imágenes, y visualizar publicaciones de otros usuarios.
- Manejo de imágenes de perfil.
- Validación de entrada de usuario.
- Notificaciones de éxito y error.

## Tecnologías

- **React**: Librería para construir la interfaz de usuario.
- **React Router**: Manejo de rutas en la aplicación.
- **Toastify**: Notificaciones en la interfaz.
- **Heroicons**: Iconos para la interfaz.
- **Tailwind CSS**: Framework CSS para estilos rápidos y responsivos.
- **DaisyUI**: Libreria para creación rapida de componentes.
- **Firebase**: Autenticación y almacenamiento (si corresponde).
- **Zustand**: Manejo de estados.

## Instalación

1. **Clona el repositorio:**

   ```bash
   git clone https://github.com/tu-usuario/nombre-del-repositorio.git

2. **Navega al directorio del proyecto:**
  
   ```bash
    cd nombre-del-repositorio
   
3. **Instalar las Dependencias**

    ```bash
    npm install

4. **Configura Firebase**
- Crea tu app en firebase 
- Configura en un .env la información de tu proyecto en firebase
- Crea los servicios de Autenticación, Firestore Cloud y Storage
- **IMPORTANTE:** En caso de que tengas problemas de CORS al momento de realizar publicaciones ve al cloud shell de google de tu proyecto y ejecuta

   
   
   
   ```shell
   gsutil cors set cors.json gs://<your-bucket-name>

6. **Ejecutar la Aplicación**
- ```bash
    npm run dev
