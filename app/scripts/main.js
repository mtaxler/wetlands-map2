"use strict";
$( document ).ready(function() {
	$('[data-toggle="tooltip"]').tooltip();

	var map = L.map('map',{zoomControl:false}).setView([43.0667, -89.4000], 13);
	// var zoomControl = L.control.zoom({position: 'bottomright'}).addTo(map);
	var sidebar = L.control.sidebar('sidebar',{
		mapControlOption: ['zoomin','zoomout','locate','print']
	}).addTo(map).open('home');

	$('#zoomin').click(function(){
		map.zoomIn(1);

	});
	$('#zoomout').click(function() {
		map.zoomOut(1);
	});

	$('#locate').click(function(){
		map.locate({
			setView: true
		});
		sidebar.close();
	});
	
	// add an OpenStreetMap tile layer
	// L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	//     attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	// }).addTo(map);
	

	// var points = L.esri.featureLayer('http://dnrmaps.wi.gov/arcgis/rest/services/WT_SWDV/WT_Wetlands_Plants_and_Habitat_WTM_Ext/MapServer/18').addTo(map);
	// points.bindPopup(function (feature) {
	// 	console.log(feature);
	// 	return L.Util.template('<p></p>', feature.properties);
	// });
	// L.esri.featureLayer('http://dnrmaps.wi.gov/arcgis/rest/services/WT_SWDV/WT_Wetlands_Plants_and_Habitat_WTM_Ext/MapServer/14').addTo(map);
	// $('.dropdown-menu').on({
	//     "click":function(e){
	//       e.stopPropagation();
	//     }
	// });
	var walleyeWaters = L.esri.featureLayer('http://dnrmaps.wi.gov/arcgis/rest/services/WT_SWDV/WT_Fisheries_Waters_WTM_Ext/MapServer/7',{simplifyFactor:0.35}).addTo(map);
	var huc12s = L.esri.featureLayer('http://dnrmaps.wi.gov/arcgis/rest/services/WT_SWDV/WT_Federal_Hydrologic_Units_WTM_Ext/MapServer/0',{
		simplifyFactor:0.1,
		style: function(feature){
			return {
				color: '#000',
				weight: 1,
				opacity: 1,
				fillOpacity:0
			};
		}
	}).addTo(map);

	 
	// omnivore.topojson('js/rivers_topo.json').addTo(map);
	var allLayers = {
		'Walleye Waters': [walleyeWaters, '#walleyeToggle','.walleye'],
		'HUC 12 Boundaries': [huc12s, '#huc12sToggle','.huc12s']
	};
	
	var baselayers = {
		'OpenStreetMap': L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
		}),

		'MapQuest Aerial': L.tileLayer('http://oatile{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg', {
			attribution: 'Tiles Courtesy of <a href="http://www.mapquest.com/">MapQuest</a> &mdash; Portions Courtesy NASA/JPL-Caltech and U.S. Depart. of Agriculture, Farm Service Agency',
			subdomains: '1234'
		}),

		'Stamen Toner': L.tileLayer('http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png', {
			attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
			subdomains: 'abcd',
			minZoom: 0,
			maxZoom: 20
		}),

		'Stamen Watercolor': L.tileLayer('http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg', {
			attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
			subdomains: 'abcd',
			minZoom: 3,
			maxZoom: 16
		})
	};

	var layersControl = L.control.layers.minimap(baselayers, null, {
		collapsed: true
	}).addTo(map);

	baselayers.OpenStreetMap.addTo(map);

	function buildLegend(layerSet){

		$.each(layerSet, function(key, value) {
			var mapLayer = value[0];
			var layerId = value[1];
			var layerClass = value[2];

			$(layerId).click(function(){
				if (map.hasLayer(mapLayer)){
		    		map.removeLayer(mapLayer);
		    		$(layerClass).removeClass("active");
		    	} else {
		    		mapLayer.addTo(map);
		    		$(layerClass).addClass("active");
		    	}
			});
		       
		});
	}
	buildLegend(allLayers);

	// $('#walleyeToggle').click(function(){
	// 	if (map.hasLayer(walleyeWaters)){
	// 		map.removeLayer(walleyeWaters);
	// 		$('.walleye').removeClass("active");
	// 	} else {
	// 		walleyeWaters.addTo(map);
	// 		$('.walleye').addClass("active");
	// 	}
		
	// });

});

