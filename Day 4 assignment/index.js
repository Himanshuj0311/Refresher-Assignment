// Constructor function for Device
function Device(name, type) {
    this.name = name;
    this.type = type;
    this.status = 'off'; // Default status
}

// Methods for Device
Device.prototype.turnOn = function() {
    this.status = 'on';
    console.log(`${this.name} is now ON.`);
};

Device.prototype.turnOff = function() {
    this.status = 'off';
    console.log(`${this.name} is now OFF.`);
};

Device.prototype.checkStatus = function() {
    return `${this.name} is currently ${this.status}.`;
};

// Constructor function for SmartHome
function SmartHome(owner) {
    this.owner = owner;
    this.devices = [];
}

// Methods for SmartHome
SmartHome.prototype.addDevice = function(device) {
    this.devices.push(device);
    console.log(`${device.name} added to ${this.owner}'s smart home.`);
};

SmartHome.prototype.removeDevice = function(deviceName) {
    this.devices = this.devices.filter(device => device.name !== deviceName);
    console.log(`${deviceName} removed from ${this.owner}'s smart home.`);
};

SmartHome.prototype.listDevices = function() {
    console.log(`Devices in ${this.owner}'s smart home:`);
    this.devices.forEach(device => console.log(device.name));
};
// Constructor function for SmartDevice
function SmartDevice(name, type, brand, connectivity) {
    Device.call(this, name, type); // Call the parent constructor
    this.brand = brand;
    this.connectivity = connectivity;
}

// Inherit from Device
SmartDevice.prototype = Object.create(Device.prototype);
SmartDevice.prototype.constructor = SmartDevice;

// Asynchronous firmware update
SmartDevice.prototype.updateFirmware = async function() {
    try {
        const response = await fetch('https://mockapi.com/firmware-update'); // Simulate server interaction
        const data = await response.json();
        console.log(`Firmware updated to version ${data.version} for ${this.name}.`);
    } catch (error) {
        console.error('Failed to update firmware:', error);
    }
};

// Check connectivity
SmartDevice.prototype.checkConnectivity = function() {
    console.log(`${this.name} is ${this.connectivity ? 'connected' : 'not connected'}.`);
};

// Constructor function for SmartLight
function SmartLight(name, brand, connectivity, brightness, color) {
    SmartDevice.call(this, name, 'Light', brand, connectivity); // Call the parent constructor
    this.brightness = brightness;
    this.color = color;
}

// Inherit from SmartDevice
SmartLight.prototype = Object.create(SmartDevice.prototype);
SmartLight.prototype.constructor = SmartLight;

// Adjust brightness
SmartLight.prototype.adjustBrightness = function(level) {
    this.brightness = level;
    console.log(`${this.name} brightness set to ${level}.`);
};

// Change color
SmartLight.prototype.changeColor = function(color) {
    this.color = color;
    console.log(`${this.name} color changed to ${color}.`);
};

// Constructor function for SmartThermostat
function SmartThermostat(name, brand, connectivity, temperature, mode) {
    SmartDevice.call(this, name, 'Thermostat', brand, connectivity); // Call the parent constructor
    this.temperature = temperature;
    this.mode = mode;
}

// Inherit from SmartDevice
SmartThermostat.prototype = Object.create(SmartDevice.prototype);
SmartThermostat.prototype.constructor = SmartThermostat;

// Set temperature
SmartThermostat.prototype.setTemperature = function(temp) {
    this.temperature = temp;
    console.log(`${this.name} temperature set to ${temp}°C.`);
};

// Change mode
SmartThermostat.prototype.changeMode = function(mode) {
    this.mode = mode;
    console.log(`${this.name} mode changed to ${mode}.`);
};
// Constructor function for User
function User(username, password) {
    this.username = username;
    this.password = password;
    this.smartHome = null; // Associated smart home
}

// Asynchronous user authentication
User.prototype.authenticate = async function() {
    try {
        const response = await fetch('https://mockapi.com/authenticate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: this.username, password: this.password })
        });
        const data = await response.json();
        if (data.success) {
            console.log('User authenticated successfully.');
        } else {
            console.log('Authentication failed.');
        }
    } catch (error) {
        console.error('Authentication error:', error);
    }
};

// Manage associated smart home
User.prototype.addDeviceToHome = function(device) {
    if (this.smartHome) {
        this.smartHome.addDevice(device);
    } else {
        console.log('No smart home associated with this user.');
    }
};

User.prototype.removeDeviceFromHome = function(deviceName) {
    if (this.smartHome) {
        this.smartHome.removeDevice(deviceName);
    } else {
        console.log('No smart home associated with this user.');
    }
};
// Import modules (if using modules)
// import { Device } from './device';
// import { SmartHome } from './smarthome';
// import { SmartDevice } from './smartdevice';
// import { SmartLight } from './smartlight';
// import { SmartThermostat } from './smartthermostat';
// import { User } from './user';

// Create instances and demonstrate functionality
const device1 = new Device('Fan', 'Appliance');
const device2 = new Device('Heater', 'Appliance');

const smartHome = new SmartHome('Alice');
smartHome.addDevice(device1);
smartHome.addDevice(device2);
smartHome.listDevices();
smartHome.removeDevice('Fan');
smartHome.listDevices();

const smartLight = new SmartLight('Living Room Light', 'Philips', true, 75, 'white');
smartLight.adjustBrightness(85);
smartLight.changeColor('blue');

const smartThermostat = new SmartThermostat('Living Room Thermostat', 'Nest', true, 22, 'Cool');
smartThermostat.setTemperature(24);
smartThermostat.changeMode('Heat');

const user = new User('alice123', 'password');
user.authenticate(); // Simulate authentication
user.smartHome = smartHome; // Associate smart home
user.addDeviceToHome(smartLight);
user.removeDeviceFromHome('Living Room Light');
