import { useEffect, useState } from 'react';
import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});



const GetCoordinateMap = ({ setLocationData, close_modal, setLoading }) => {
    const [coordinates, setCoordinates] = useState(null);
    const [placeName, setPlaceName] = useState('Unknown place');
    const [mapInstance, setMapInstance] = useState(null);
    const [marker, setMarker] = useState(null);

    useEffect(() => {
        const map = L.map('map').setView([coordinates?.lat?.toFixed(5) || 9.61541, coordinates?.lng?.toFixed(5) || 275.37130], 13);
        setMapInstance(map);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);
        if (coordinates) {
            L.marker([coordinates.lat.toFixed(5), coordinates.lng.toFixed(5)]).addTo(map);
        }
        // 
        map.on('click', async (e) => {
            const { lat, lng } = e.latlng;

            setLoading(true);
            if (marker) {
                map.removeLayer(marker);
            }
            const newMarker = L.marker([lat, lng])
                .addTo(map)
                .bindPopup(`Coordinates: ${lat.toFixed(5)}, ${lng.toFixed(5)}`)
                .openPopup();
            setMarker(newMarker);
            setCoordinates({ lat, lng });
            try {
                const normalizedLng = ((lng + 180) % 360) - 180;
                const formattedLat = parseFloat(lat.toFixed(5));
                const formattedLng = parseFloat(normalizedLng.toFixed(5));
                const response = await axios.get(
                    `https://api.opencagedata.com/geocode/v1/json?q=${formattedLat}+${formattedLng}&key=379832d7941049d1a1c6c96d50886580`
                );

                if (response.data && response.data.results.length > 0) {
                    const display_name = response.data.results[0].formatted;
                    setPlaceName(display_name);
                    setLocationData({ lat, lng, display_name });
                } else {
                    setPlaceName('Unknown place');
                }
            } catch (error) {
                setPlaceName('Error fetching place name');
            } finally {
                setLoading(false);
            }
        });

        // Clean up on component unmount
        return () => {
            map.off('click');
            map.remove();
        };
    }, [marker]);

    return (
        <div>
            <div id="map" style={{ height: '500px', width: '100%' }}></div>
            {coordinates && (
                <p className="p-2">
                    <strong>Clicked Coordinates:</strong> Latitude: {coordinates.lat.toFixed(5)}, Longitude: {coordinates.lng.toFixed(5)}
                    <br />
                    <strong>Place Name:</strong> {placeName}
                </p>
            )}
            <button
                onClick={() => close_modal()}
                className="button-blue ml-auto -mt-1"
                style={{
                    padding: '5px 10px',
                }}
            >
                Ok
            </button>
        </div>
    );
};

export default GetCoordinateMap;
