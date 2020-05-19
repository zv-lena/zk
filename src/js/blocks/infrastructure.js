const elem = document.querySelector('.infrastructure');
const mapContainer = elem.querySelector('.infrastructure__map');
const controls = elem.querySelectorAll('.infrastructure__control');
const controlSelectedCls = 'infrastructure__control_selected';

try {
	var geoJson = JSON.parse(document.querySelector('script[type="text/geojson"]').innerHTML);
} catch (err) {
	console.error('Невалидный GeoJson!');
	throw new Error(err)
}

ymaps.ready(function () {
	const map = new ymaps.Map(mapContainer, {
		center: [39.733779, 47.267322],
		zoom: 15,
		controls: ['zoomControl', 'typeSelector']
	});

	map.geoObjects.add(new ymaps.Placemark(map.getCenter(), {
		hintContent: 'ЖК "Измаильский парк"',
		balloonContent: `
			<h1 style="font-size: 16px">ЖК "Измаильский парк"</h1>
			<p>Измаильский переулок, 41</p>`
	}, {
		iconLayout: 'default#image',
		iconImageHref: '/images/map-icons/zk.svg',
		iconImageSize: [70, 70],
		iconImageOffset: [-35, -70]
	}));

	geoJson.features.forEach(function (obj) {
		try {
			var [, type] = obj.properties.iconCaption.match(/#(.+)$/);
			obj.typeName = type;
			obj.properties.iconCaption = obj.properties.iconCaption.replace(/#(.+)$/, '');
		} catch (err) {
			console.error(`Метка: ${obj.properties.iconCaption} не содержит #type!`);
			throw new Error(obj);
		}

		obj.properties.balloonContent = `
			<h1 style="font-size: 16px">${obj.properties.iconCaption}</h1>
			<p>${obj.properties.description}</p>`;
		obj.properties.iconCaption = null;
		obj.options = {
			iconLayout: 'default#imageWithContent',
			iconImageHref: `/images/map-icons/${type}.svg`,
			iconImageSize: [44, 44],
			iconImageOffset: [-22, -44]
		};
	});

	const objectManager = new ymaps.ObjectManager();
	objectManager.add(geoJson);
	map.geoObjects.add(objectManager);

	let seletedTypes = [];
	const filter = () => obj => ~seletedTypes.indexOf(obj.typeName);

	controls.forEach(c => {
		if (c.classList.contains(controlSelectedCls)) seletedTypes.push(c.dataset.type);
	});
	objectManager.setFilter(filter());

	controls.forEach(c => c.addEventListener('click', e => {
		e.preventDefault();
		const c = e.currentTarget;
	
		if (c.classList.contains(controlSelectedCls)) {
			c.classList.remove(controlSelectedCls);
			seletedTypes = seletedTypes.filter(t => t != c.dataset.type);
		} else {
			c.classList.add(controlSelectedCls);
			seletedTypes.push(c.dataset.type);
		}

		objectManager.setFilter(filter());
	}));
});