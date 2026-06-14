# PokeApi - Proyecto Colaborativo

Proyecto en Next.js con App Router.

## Ejecutar en local

```bash
npm install
npm run dev
```

Abrir en el navegador: http://localhost:3000

## Mapa de nombres (importante)

- Marca principal (navbar): PokeApi
- Ruta /wikidex: Wikidex
- Ruta /pokerastreo: Pokerastreo
- Ruta /infogym: Infogym

## Estructura de rutas

- src/app/page.tsx -> Home
- src/app/wikidex/page.tsx -> Wikidex
- src/app/pokerastreo/page.tsx -> Pokerastreo
- src/app/infogym/page.tsx -> Infogym

## Asignacion del equipo

- Navbar: Alfredo
- Footer: Mateo
- Home: Marc
- Wikidex (151 pokemon): Marc
- Infogym (lideres, altos mandos y equipos): Alfredo
- Pokerastreo (rutas y pokemon por ruta): Mateo

## Nota para evitar errores

Si se renombran carpetas dentro de src/app, actualizar tambien los enlaces de navegacion en components/Navbar.jsx para que no den 404.