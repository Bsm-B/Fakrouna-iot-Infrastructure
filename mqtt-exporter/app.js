const mqtt = require('mqtt');
const zlib = require('zlib');

// MQTT client configuration
const mqttClient = mqtt.connect('mqtt://localhost:1883');

// Subscribe to the input topic
mqttClient.on('connect', function () {
    console.log('Connected to MQTT broker');
    mqttClient.subscribe('fakrouna_crypt', function (err) {
        if (err) {
            console.error('Error subscribing to input_topic:', err);
        }
    });
});

// Handle incoming MQTT messages
mqttClient.on('message', function (topic, message) {
    console.log('Received message:', message.toString());

    // Decompress gzip data
    zlib.gunzip(message, (err, decompressedData) => {
        if (err) {
            console.error('Error decompressing gzip data:', err);
            return;
        }

        // Parse JSON
        const jsonData = JSON.parse(decompressedData.toString());

        // Format and manipulate data as needed
        const formattedData = {
            // Manipulate or format the data here as needed
            data: jsonData.data
        };

        // Convert back to JSON
        const jsonMessage = JSON.stringify(formattedData);

        // Publish formatted JSON to another topic
        mqttClient.publish('fakrouna', jsonMessage, function (err) {
            if (err) {
                console.error('Error publishing message:', err);
            } else {
                console.log('Message published');
            }
        });
    });
});
