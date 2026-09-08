# Gryffindor Resistance

## Objetivo

Gryffindor Resistance es un sitio web temático inspirado en la casa Gryffindor de Hogwarts. Su objetivo es presentar una experiencia visual de la casa, mostrar a sus personajes principales, permitir el registro de nuevos voluntarios y ofrecer una sección de tienda con productos relacionados.

El proyecto fue creado como una aplicación web estática utilizando HTML, CSS, JavaScript y Bootstrap.

## Funcionalidades

- Navbar compartido con enlaces a inicio, perfil, reclutamiento y sala común.
- Diseño visual basado en los colores de Gryffindor: rojo, dorado y tonos oscuros.
- Página de inicio con:
	- Banner de bienvenida.
	- Información de Godric Gryffindor.
	- Sección deslizable de personajes y elementos importantes de la casa.
	- Formulario para registrar voluntarios.
	- Lista de voluntarios registrados.
	- Pie de página con redes sociales y enlaces.
- Formulario de reclutamiento con validación básica de campos.
- Guardado de los voluntarios en `localStorage`, por lo que los registros permanecen al recargar la página en el mismo navegador.
- Página de perfil con información del usuario, fotografías, estadísticas y publicaciones de ejemplo.
- Página de sala común con un catálogo visual de productos como bufandas, capas, uniformes, varitas y otros artículos.
- Diseño adaptable a dispositivos móviles gracias a las clases responsive de Bootstrap.

## Páginas principales

| Archivo | Descripción |
| --- | --- |
| `index.html` | Página principal, banner, personajes y formulario de reclutamiento. |
| `perfil.html` | Perfil de usuario, fotografías, estadísticas y publicaciones. |
| `store.html` | Catálogo visual de productos de Gryffindor. |

## Archivos importantes

| Archivo o carpeta | Función |
| --- | --- |
| `app.js` | Procesa el formulario, guarda voluntarios y genera sus tarjetas. |
| `stryle.css` | Estilos generales, navbar, banner, formulario, perfil y footer. |
| `styles_Cards.css` | Estilos de la sección deslizable de tarjetas de personajes. |
| `assets/` | Imágenes del banner, perfil, productos, Godric, redes sociales y publicaciones. |
| `img/` | Imágenes utilizadas en las tarjetas de personajes. |

## Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript
- Bootstrap 5.3.8 mediante CDN
- `localStorage` del navegador

## Cómo ejecutar el proyecto

No se necesita instalación ni compilación.

1. Clona o descarga el repositorio.
2. Abre la carpeta del proyecto en Visual Studio Code.
3. Abre `index.html` en un navegador.

También puedes utilizar la extensión **Live Server** de Visual Studio Code para abrir el proyecto con recarga automática.

## Flujo del formulario de reclutamiento

1. El usuario completa nombre, correo, edad, cualidad y motivo.
2. `app.js` captura los datos enviados.
3. El voluntario se agrega a un arreglo.
4. El arreglo se guarda en `localStorage` con la clave `voluntarios`.
5. Se genera una tarjeta con la información del voluntario.
6. Al volver a cargar la página, los registros guardados se muestran nuevamente.

## Alcance actual

El proyecto funciona completamente del lado del cliente. No cuenta con servidor, base de datos, autenticación ni pagos reales. Los registros de reclutamiento solamente están disponibles en el navegador donde fueron creados.


## Creado por
- Devani Damaris Moreno Domínguez   (FrontEnd)
- Mireya Alanis Garduño             (FrontEnd)
- Christopher Blanco M              (FrontEnd) 
- Fernando Angel Chalqueño Nava     (FrontEnd)
- Daniel Castro Perez               (Git Scrum Master)
- Diego González Celis              (BackEnd)
- Christian Pinal Cordero           (FrontEnd)
- Natalia González Coca             (FrontEnd)
- Hans Alexander Urvina Colín       (FrontEnd)
- Daniela Lizbeth Chagal Saavedra   (BackEnd)
- Anahi Matamoros Hernández         (BackEnd)
- David Fernández Brito             (BackEnd)
