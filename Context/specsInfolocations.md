# Especificaciones breves - Infolocations

## Objetivo
Crear la pagina `infolocations/page.tsx` para mostrar los 8 gimnasios, cada uno dentro de una tarjeta, con acceso a su informacion detallada.

## Requisitos minimos
1. En `/infolocations` deben mostrarse exactamente 8 gimnasios.
2. Cada gimnasio debe renderizarse dentro de una tarjeta.
3. Cada tarjeta debe incluir: nombre del gimnasio, ciudad y tipo principal.
4. Cada tarjeta debe tener un boton "Ver gimnasio".
5. El boton debe navegar al detalle del gimnasio correspondiente.

## Rutas
- Listado: `/infolocations`
- Detalle: `/infolocations/[id]`

## Datos (version inicial)
Usar un array local con 8 objetos de gimnasio con estos campos:
- `id`
- `nombre`
- `ciudad`
- `tipo`
- `descripcion`

## Comportamiento esperado
- El listado de `/infolocations` se muestra en formato de tarjetas.
- Al hacer clic en "Ver gimnasio", se abre `/infolocations/[id]`.
- En el detalle se muestra la informacion completa del gimnasio.
- Si el `id` no existe, mostrar `notFound()`.

## Criterios de aceptacion
1. Se ven 8 tarjetas en `/infolocations`.
2. Cada tarjeta tiene su boton funcional.
3. El detalle muestra nombre, ciudad, tipo y descripcion.
4. Un `id` invalido devuelve pagina no encontrada.

# Informacion extra

## Pueblo Paleta

El pequeño pueblo donde todo comienza. No tiene tienda ni gimnasio, pero es el hogar del Profesor Oak y el punto de partida de todos los entrenadores de la región. A pesar de su modesto tamaño, es el lugar más importante de Kanto.

---

## Ciudad Azulona

La primera ciudad grande que encuentras al salir de Pueblo Paleta. Tiene un centro Pokémon y una tienda, pero su gimnasio permanece misteriosamente cerrado hasta el final de la aventura. Su líder, Giovanni, es el jefe de la Team Rocket.

---

## Ciudad Plateada

Ciudad de piedra y acero, enclavada entre montañas. Su gimnasio es el primero de la ruta oficial, liderado por Brock, especialista en tipo Roca. Justo a las afueras comienza la temida Ruta 3 hacia la Cueva Mont Moon.

---

## Ciudad Celeste

Ciudad de tonos azules y ambiente tranquilo, famosa por su gimnasio acuático liderado por Misty. Al norte se encuentra el Puente Bill, y en las afueras se esconde la Cueva Cerúlea, donde se puede encontrar a Mewtwo una vez completada la Pokédex.

---

## Ciudad Carmín

Puerto activo en la costa sur de Kanto. Desde aquí parte el legendario barco SS Anne. Su gimnasio lo dirige el Tte. Surge, el "Rayo de la Guerra", especialista en tipo Eléctrico. También alberga el Club de Fans de Pokémon.

---

## Pueblo Lavanda

El pueblo más inquietante de toda la región. Dominado por la Torre Pokémon, un cementerio donde reposan los espíritus de los Pokémon fallecidos. El ambiente oscuro y su característica música lo han convertido en uno de los lugares más recordados y legendarios de la saga.

---

## Ciudad Celadón

La metrópolis de Kanto. Es la ciudad más grande, con un gran centro comercial, el Casino del Salón Recreativo y uno de los gimnasios más coloridos, liderado por Erika, especialista en tipo Planta. Aquí también se encuentra la sede secreta de la Team Rocket.

---

## Ciudad Fucsia

Ciudad tranquila al sur, conocida por dos atractivos únicos: la Zona Safari, donde se pueden capturar Pokémon raros sin combatir, y el gimnasio liderado por Koga, maestro de venenos y especialista en tipo Veneno. Cerca se encuentra el Zoo, vinculado a la Zona Safari.

---

## Ciudad Azafrán

El corazón económico y tecnológico de Kanto. Sede de la poderosa corporación Silph S.A., que la Team Rocket ocupa durante el juego. El gimnasio lo lidera Sabrina, una de las rivales más difíciles, especializada en tipo Psíquico.

---

## Isla Canela

Isla volcánica al sur de Kanto, con un laboratorio científico donde se pueden revivir Pokémon fósiles. El gimnasio lo dirige Blaine, un erudito apasionado de los tipos Fuego. Bajo el laboratorio se esconde el diario del experimento que creó a Mewtwo.

---

## Meseta Añil

El destino final de todo entrenador. Sede de la Liga Pokémon, donde se encuentran el Alto Mando y el Campeón. Rodeada de montañas y accesible solo a través del Camino Victoria, llegar hasta aquí es de por sí un logro que pocos consiguen.