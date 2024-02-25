const mqtt = require('mqtt');

// MQTT client configuration
const mqttClient = mqtt.connect('mqtt://iotbyte.online:1883');

// Subscribe to the input topic
mqttClient.on('connect', function () {
    console.log('Connected to MQTT broker');
    mqttClient.subscribe('fakrounadata', function (err) {
        if (err) {
            console.error('Error subscribing to input_topic:', err);
        }
    });
});

// Handle incoming MQTT messages

mqttClient.on('message', (topic, message) => {
        console.log('Received message:', message.toString());
        const jsonString = message.toString();
        const jsonMessage = parseStringToJson(jsonString);
        // Publish formatted JSON to another topic
        mqttClient.publish('fakrouna', JSON.stringify(jsonMessage), function (err) {
            if (err) {
                console.error('Error publishing message:', err);
            } else {
                console.log('Message published');
            }

        });

});

function parseStringToJson(str) {
    const parts = str.split(',');
    const json = {
        device_id: parseInt(parts[0]),
        gps_lat: parseFloat(parts[1]),
        gps_long: parseFloat(parts[2]),
        time_of_send: parts[3],
        temperature: parseFloat(parts[4]),
        battery_level: parseFloat(parts[5]),
        gsm_signal: parts[6],
        rawGyro: parts[7],
        normGyro: parts[8],
        Valid_point: parts[9]
    };
    return json;
}

