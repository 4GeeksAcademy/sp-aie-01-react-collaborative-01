import Link from 'next/link';
import { notFound } from 'next/navigation';

type LocationDetail = {
	name: string;
	region: {
		name: string;
	};
	areas: Array<{
		name: string;
	}>;
	game_indices: Array<{
		generation: {
			name: string;
		};
	}>;
};

type InfolocationDetailPageProps = {
	params: Promise<{
		name: string;
	}>;
};

const EXTRA_LOCATION_INFO: Record<string, string> = {
	'pallet-town': 'El pequeno pueblo donde todo comienza. No tiene tienda ni gimnasio, pero es el hogar del Profesor Oak y el punto de partida de todos los entrenadores de la region. A pesar de su modesto tamano, es el lugar mas importante de Kanto.',
	'viridian-city': 'La primera ciudad grande que encuentras al salir de Pueblo Paleta. Tiene un centro Pokemon y una tienda, pero su gimnasio permanece misteriosamente cerrado hasta el final de la aventura. Su lider, Giovanni, es el jefe de la Team Rocket.',
	'pewter-city': 'Ciudad de piedra y acero, enclavada entre montanas. Su gimnasio es el primero de la ruta oficial, liderado por Brock, especialista en tipo Roca. Justo a las afueras comienza la temida Ruta 3 hacia la Cueva Mont Moon.',
	'cerulean-city': 'Ciudad de tonos azules y ambiente tranquilo, famosa por su gimnasio acuatico liderado por Misty. Al norte se encuentra el Puente Bill, y en las afueras se esconde la Cueva Cerulea, donde se puede encontrar a Mewtwo una vez completada la Pokedex.',
	'vermilion-city': 'Puerto activo en la costa sur de Kanto. Desde aqui parte el legendario barco SS Anne. Su gimnasio lo dirige el Tte. Surge, el "Rayo de la Guerra", especialista en tipo Electrico. Tambien alberga el Club de Fans de Pokemon.',
	'lavender-town': 'El pueblo mas inquietante de toda la region. Dominado por la Torre Pokemon, un cementerio donde reposan los espiritus de los Pokemon fallecidos. El ambiente oscuro y su caracteristica musica lo han convertido en uno de los lugares mas recordados y legendarios de la saga.',
	'celadon-city': 'La metropolis de Kanto. Es la ciudad mas grande, con un gran centro comercial, el Casino del Salon Recreativo y uno de los gimnasios mas coloridos, liderado por Erika, especialista en tipo Planta. Aqui tambien se encuentra la sede secreta de la Team Rocket.',
	'fuchsia-city': 'Ciudad tranquila al sur, conocida por dos atractivos unicos: la Zona Safari, donde se pueden capturar Pokemon raros sin combatir, y el gimnasio liderado por Koga, maestro de venenos y especialista en tipo Veneno. Cerca se encuentra el Zoo, vinculado a la Zona Safari.',
	'saffron-city': 'El corazon economico y tecnologico de Kanto. Sede de la poderosa corporacion Silph S.A., que la Team Rocket ocupa durante el juego. El gimnasio lo lidera Sabrina, una de las rivales mas dificiles, especializada en tipo Psiquico.',
	'cinnabar-island': 'Isla volcanica al sur de Kanto, con un laboratorio cientifico donde se pueden revivir Pokemon fosiles. El gimnasio lo dirige Blaine, un erudito apasionado de los tipos Fuego. Bajo el laboratorio se esconde el diario del experimento que creo a Mewtwo.',
	'indigo-plateau': 'El destino final de todo entrenador. Sede de la Liga Pokemon, donde se encuentran el Alto Mando y el Campeon. Rodeada de montanas y accesible solo a traves del Camino Victoria, llegar hasta aqui es de por si un logro que pocos consiguen.',
};

function formatName(name: string): string {
	return name
		.split('-')
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
		.join(' ');
}

function formatGeneration(name: string): string {
	return name.replace('generation-', 'Generacion ').toUpperCase();
}

async function getLocationDetail(name: string): Promise<LocationDetail | null> {
	const response = await fetch(`https://pokeapi.co/api/v2/location/${name}`, {
		next: { revalidate: 3600 },
	});

	if (response.status === 404) {
		return null;
	}

	if (!response.ok) {
		throw new Error('No se pudo cargar la localizacion');
	}

	return response.json();
}

export default async function InfolocationDetailPage({ params }: InfolocationDetailPageProps) {
	const { name } = await params;
	const location = await getLocationDetail(name);

	if (!location) {
		notFound();
	}

	const uniqueGenerations = Array.from(
		new Set(location.game_indices.map((item) => item.generation.name))
	);
	const hasExtraInfo = location.areas.length > 0 || uniqueGenerations.length > 0;
	const manualExtraInfo = EXTRA_LOCATION_INFO[name] ?? null;

	return (
		<div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 py-10 sm:px-10">
			<Link href="/infolocations" className="text-sm font-medium text-blue-600 hover:underline">
				Volver a Infolocations
			</Link>

			<div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
				<h1 className="text-3xl font-bold text-zinc-800 dark:text-zinc-100">{formatName(location.name)}</h1>
				<p className="mt-2 text-zinc-600 dark:text-zinc-300">Region: {formatName(location.region.name)}</p>

				<div className="mt-6">
					<h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100">Informacion adicional</h2>
					{manualExtraInfo ? (
						<p className="mt-3 leading-relaxed text-zinc-700 dark:text-zinc-200">{manualExtraInfo}</p>
					) : (
						<p className="mt-3 rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-800 dark:border-amber-700 dark:bg-amber-950/40 dark:text-amber-200">
							No hay informacion adicional para esta ciudad. Si quieres, pasamela y la agrego.
						</p>
					)}
				</div>

				{!hasExtraInfo && (
					<p className="mt-4 rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-800 dark:border-amber-700 dark:bg-amber-950/40 dark:text-amber-200">
						No hay informacion extra en la API para esta ciudad. Si quieres, pasamela y la agrego.
					</p>
				)}

				<div className="mt-6">
					<h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100">Areas</h2>
					<ul className="mt-3 list-disc space-y-1 pl-5 text-zinc-700 dark:text-zinc-200">
						{location.areas.length > 0 ? (
							location.areas.map((area) => <li key={area.name}>{formatName(area.name)}</li>)
						) : (
							<li>Sin areas registradas</li>
						)}
					</ul>
				</div>

				<div className="mt-6">
					<h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100">Generaciones</h2>
					<ul className="mt-3 list-disc space-y-1 pl-5 text-zinc-700 dark:text-zinc-200">
						{uniqueGenerations.length > 0 ? (
							uniqueGenerations.map((generation) => (
								<li key={generation}>{formatGeneration(generation)}</li>
							))
						) : (
							<li>Sin generaciones registradas</li>
						)}
					</ul>
				</div>
			</div>
		</div>
	);
}
