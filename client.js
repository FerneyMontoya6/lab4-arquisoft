const socket = io('http://localhost:3000');

socket.on('connect', () => {
    console.log('Conectado al servidor de Socket.IO');
});

socket.on('message', (data) => {
    console.log('Recibido mensaje:', data);
    const { gateNumber, flightNumber, destination, airline, departureTime } = JSON.parse(data);
    updateGateInfo(gateNumber, flightNumber, destination, airline, departureTime);
});

document.querySelectorAll('.update-btn').forEach(button => {
    button.addEventListener('click', () => {
        console.log('Botón de actualización presionado');
        const gateNumber = button.getAttribute('data-gate');
        const flightNumber = document.getElementById(`flight-number-input-${gateNumber}`).value;
        const destination = document.getElementById(`destination-input-${gateNumber}`).value;
        const airline = document.getElementById(`airline-input-${gateNumber}`).value;
        const departureTime = document.getElementById(`departure-time-input-${gateNumber}`).value;

        console.log(`Enviando datos de Gate ${gateNumber}:`, { flightNumber, destination, airline, departureTime });

        const data = {
            gateNumber,
            flightNumber,
            destination,
            airline,
            departureTime
        };

        // Enviar la información actualizada al servidor
        socket.send(JSON.stringify(data));

        // Actualizar la información en la interfaz de usuario
        updateGateInfo(gateNumber, flightNumber, destination, airline, departureTime);
    });
});

function updateGateInfo(gateNumber, flightNumber, destination, airline, departureTime) {
    const gateInfo = document.querySelector(`#gate-${gateNumber}`);

    if (gateInfo) {
        gateInfo.querySelector(`#flight-number-${gateNumber}`).textContent = flightNumber;
        gateInfo.querySelector(`#destination-${gateNumber}`).textContent = destination;
        gateInfo.querySelector(`#airline-${gateNumber}`).textContent = airline;
        gateInfo.querySelector(`#departure-time-${gateNumber}`).textContent = departureTime;
        console.log(`Actualizada información de Gate ${gateNumber}`);
    } else {
        console.error(`Gate ${gateNumber} no encontrado`);
    }
}
