function getLocation() {
    const output = document.getElementById('output');
    output.textContent = '';

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                output.textContent = `Latitude: ${latitude.toFixed(6)}, Longitude: ${longitude.toFixed(6)}`;
                
                // Inicializa o mapa com maior precisão na visualização
                const map = L.map('map').setView([latitude, longitude], 15);
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 19,
                    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(map);

                // Adiciona um marcador na localização atual com maior precisão
                L.marker([latitude, longitude], { precision: 1 }).addTo(map)
                    .bindPopup('Você está aqui!')
                    .openPopup();
            },
            (error) => {
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        output.textContent = 'Erro: Permissão de localização negada.';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        output.textContent = 'Erro: Localização indisponível.';
                        break;
                    case error.TIMEOUT:
                        output.textContent = 'Erro: O pedido expirou.';
                        break;
                    default:
                        output.textContent = 'Erro: Não foi possível obter a localização.';
                        break;
                }
            },
            { enableHighAccuracy: true } // Configuração para maior precisão
        );
    } else {
        output.textContent = 'Erro: Geolocalização não suportada pelo navegador.';
    }
}