const request = require('request');


const fetchMyIP = function(callback) {
  request(`https://api.ipify.org?format=json`, function(error, response, body) {
    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
    } else {
      const IP = JSON.parse(body);
      if (IP === undefined) {
        callback('IP not found', null);
      } else {
        callback(null, IP.ip);
      }
    }
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request(`https://freegeoip.app/json/${ip}`, function(error, response, body) {
    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching Coords. Response: ${body}`;
      callback(Error(msg), null);
    }
    const { latitude, longitude } = JSON.parse(body);

    callback(null, { latitude, longitude });
  });
};


const fetchISSFlyOverTimes = function(coords, callback) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, function(error, response, body) {
    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching ISS pass times. Response: ${body}`;
      callback(Error(msg), null);
    }
    const passes = JSON.parse(body).response;
    callback(null, passes);

  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) return callback(error, null);
    fetchCoordsByIP(ip, (error, loc) => {
      if (error) return callback(error, null);
      fetchISSFlyOverTimes(loc, (error, passTimes) => {
        if  (error) return callback(error, null);
        callback(null, passTimes);
      });
    });
  });
};




module.exports = {nextISSTimesForMyLocation};