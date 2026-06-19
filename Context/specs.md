Funcionalidad Equipo Pokemon // PC

Contexto
Utilizando useContext() crea un array Equipo Pokemon con maximo de 6 y asígnele un array vacío, haz lo mismo con pc pero no pongas limite de 6
Crea la función catchPokemon() para agregar un elemento a cada array.
Crea la función deletePokemon() para eliminar un elemento para cada uno de los array.
componentes: BtnTeam , PC
Crea un componente BtnTeam del tipo boton-dropdown para:
Mostrar un listado de atrapados y un botón con icono para borrar (trash).
Cree un evento onClick para deletePokemon() en el botón "trash".
Muestra un badge con el largo de la lista capturados.
Agrega los componente en el NavBar.
componente: Characters (ya existe)
Agrega un botón con icono de pokeball.
Si el elemento está en favorites:
Icono con relleno full y onClick ejecuta deletePokemon().
Si el elemento no está en favorites:
Icono sin relleno y onClick ejecuta Catch Pokemon().
Crea un componente BtnPc del tipo boton-dropdown para:
Ver Los pokemon capturados que no quepan en tu equipo de 6
Identificalos de una manera distinta que con una pokeball, busca una badge de PC


    Cambiar de color la pokeball para seleccionar favoritos para diferenciar equipo de pc
Cambia Pokemons del pc al equipo