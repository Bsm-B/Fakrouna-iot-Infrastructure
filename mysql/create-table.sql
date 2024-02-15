CREATE DATABASE IF NOT EXISTS `fakrouna_db` CHARACTER SET utf8mb4;

USE `fakrouna_db`;

CREATE TABLE IF NOT EXISTS device_events (
        id INT AUTO_INCREMENT PRIMARY KEY,
        clientid VARCHAR(255),
        event VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE IF NOT EXISTS devices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    mobile_number VARCHAR(20),
    location VARCHAR(255),
    animal VARCHAR(255),
    release_date DATE,
    other_info TEXT
);

CREATE TABLE IF NOT EXISTS data_transmissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    device_id INT,
    gps_lat DECIMAL(10, 8),
    gps_long DECIMAL(11, 8),
    time_of_send VARCHAR(50),  -- Changed to VARCHAR
    time_of_receive TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Added automatic timestamp
    temperature DECIMAL(5, 2),
    battery_level DECIMAL(5, 2),
    gsm_signal VARCHAR(10),  -- Added GSM signal strength
    rawGyro VARCHAR(255),  -- Added raw gyro data
    normGyro VARCHAR(255),  -- Added normalized gyro data
    Valid_point CHAR(1),  -- Added a char field for valid point
    FOREIGN KEY (device_id) REFERENCES devices(id)
);
