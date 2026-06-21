import Link from 'next/link';

type RegionLocation = {
	name: string;
	url: string;
};

type RegionResponse = {
	locations: RegionLocation[];
};

const KANTO_LOCATION_ORDER = [
	'pallet-town',
	'viridian-city',
	'pewter-city',
	'cerulean-city',
	'vermilion-city',
	'lavender-town',
	'celadon-city',
	'fuchsia-city',
	'saffron-city',
	'cinnabar-island',
	'indigo-plateau',
];

function formatName(name: string): string {
	return name
		.split('-')
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
		.join(' ');
}

function getCategory(name: string): string {
	if (name.includes('town')) return 'Pueblo';
	if (name.includes('city')) return 'Ciudad';
	if (name.includes('island')) return 'Isla';
	if (name.includes('plateau')) return 'Meseta';
	return 'Ubicacion';
}

async function getKantoLocations(): Promise<RegionLocation[]> {
	const response = await fetch('https://pokeapi.co/api/v2/region/kanto', {
		next: { revalidate: 3600 },
	});

	if (!response.ok) {
		throw new Error('No se pudieron cargar las localizaciones de Kanto');
	}

	const data: RegionResponse = await response.json();
	const byName = new Map(data.locations.map((location) => [location.name, location]));

	return KANTO_LOCATION_ORDER.map((name) => byName.get(name)).filter(
		(location): location is RegionLocation => Boolean(location)
	);
}

export default async function InfolocationsPage() {
	const townCards = await getKantoLocations();

	return (
		<div className="flex flex-1 flex-col bg-zinc-50 px-6 py-10 font-sans dark:bg-black sm:px-10">
			<header className="mx-auto w-full max-w-6xl text-center">
				<h1 className="text-4xl font-bold text-gray-800 dark:text-white">Infolocations</h1>
				<p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
					Localizaciones de Kanto obtenidas desde PokeAPI.
				</p>
			</header>

			<section className="mx-auto mt-10 grid w-full max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{townCards.map((town, index) => (
					<article
						key={town.name}
						className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900"
					>
						<p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">Ubicacion #{index + 1}</p>
						<h2 className="mt-2 text-xl font-bold text-zinc-800 dark:text-zinc-100">{formatName(town.name)}</h2>
						<p className="mt-3 text-sm text-zinc-600 dark:text-zinc-300">Categoria: {getCategory(town.name)}</p>
						<p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">Region: Kanto</p>
						<Link
							href={`/infolocations/${town.name}`}
							className="mt-4 inline-block w-full rounded-md bg-zinc-800 px-3 py-2 text-center text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
						>
							Ver info extra
						</Link>
					</article>
				))}
			</section>
		</div>
	);
}
