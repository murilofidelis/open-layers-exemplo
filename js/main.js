$(document).ready(function() {

	view = new ol.View({
		center: [-6217890.205764902, -1910870.6048274133],
		zoom: 4,
		maxZoom: 18,
		minZoom: 2
	});

	/*CAMADAS*/
	var mapquest = new ol.layer.Tile({
		/*source: new ol.source.MapQuest({ layer: 'osm' })  USADO NA VERSÃO 3.0*/
		source: new ol.source.OSM(),
		visible: true,
		name: 'mapquest'
	});

	var bingmaps = new ol.layer.Tile({
		source: new ol.source.BingMaps({
            key: 'Ak-dzM4wZjSqTlzveKz5u0d4IQ4bRzVI309GxmkgSVr1ewS6iPSrOvOKhA-CJlm3',
            imagerySet: 'AerialWithLabels'
        }),
		visible: false,
		name: 'bingmaps'
	});


	var esri = new ol.layer.Tile({
		source: new ol.source.XYZ({
            attributions: [
                new ol.Attribution({
                    html: 'Tiles &copy; <a href="http://services.arcgisonline.com/ArcGIS/' +
                    'rest/services/World_Topo_Map/MapServer">ArcGIS</a>'
                })
            ],
            url: 'http://server.arcgisonline.com/ArcGIS/rest/services/' +
            'World_Topo_Map/MapServer/tile/{z}/{y}/{x}'
        }),
		visible: false,
		name: 'esri'
	});

	var stamen = new ol.layer.Group({
		layers: [
			new ol.layer.Tile({
				source: new ol.source.Stamen({ 
					layer: 'watercolor' 
				})
			}),
			new ol.layer.Tile({
				source: new ol.source.Stamen({ 
					layer: 'terrain-labels' 
				})
			})
		],
		visible: false,
		name: 'stamen'
	});

/* ================== MAPA ================================== */

	var map = new ol.Map({
		target: 'mapa',
		controls: ol.control.defaults().extend([
			new ol.control.ScaleLine(),
			new ol.control.ZoomSlider()
		]),
		renderer: 'canvas',
		layers: [mapquest, bingmaps, esri, stamen],
		view: view
	});

/* ALTERA AS CAMADAS */

	$('#layers input[type=radio]').change(function() {
		var layer = $(this).val();

		map.getLayers().getArray().forEach(function(e) {
			var name = e.get('name');
			e.setVisible(name == layer);
		});
	});

 /* BUSCA GEOLOCALIZAÇÃO*/

var geolocation  = new ol.Geolocation({
	projection: view.getProjection(),
	tracking: true
});

$('#geolocation').click(function(){

	var position  = geolocation.getPosition();

	var point  = new ol.layer.Vector({
		source: new ol.source.Vector({
			features: [
				new ol.Feature({
					geometry: new ol.geom.Point(position)
				})
			]
		})
	});

	map.addLayer(point);

	//view.setCenter(position);
	view.setResolution(2.388657133911758);
	return false;
});

});