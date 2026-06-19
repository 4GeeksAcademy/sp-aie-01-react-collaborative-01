# Especificaciones breves - InfoGym

## Objetivo
Crear la pagina `infogym/page.tsx` para mostrar los 8 gimnasios, cada uno dentro de una tarjeta, con acceso a su informacion detallada.

## Requisitos minimos
1. En `/infogym` deben mostrarse exactamente 8 gimnasios.
2. Cada gimnasio debe renderizarse dentro de una tarjeta.
3. Cada tarjeta debe incluir: nombre del gimnasio, ciudad y tipo principal.
4. Cada tarjeta debe tener un boton "Ver gimnasio".
5. El boton debe navegar al detalle del gimnasio correspondiente.

## Rutas
- Listado: `/infogym`
- Detalle: `/infogym/[id]`

## Datos (version inicial)
Usar un array local con 8 objetos de gimnasio con estos campos:
- `id`
- `nombre`
- `ciudad`
- `tipo`
- `descripcion`

## Comportamiento esperado
- El listado de `/infogym` se muestra en formato de tarjetas.
- Al hacer clic en "Ver gimnasio", se abre `/infogym/[id]`.
- En el detalle se muestra la informacion completa del gimnasio.
- Si el `id` no existe, mostrar `notFound()`.

## Criterios de aceptacion
1. Se ven 8 tarjetas en `/infogym`.
2. Cada tarjeta tiene su boton funcional.
3. El detalle muestra nombre, ciudad, tipo y descripcion.
4. Un `id` invalido devuelve pagina no encontrada.
