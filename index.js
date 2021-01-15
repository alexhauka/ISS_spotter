const {nextISSTimesForMyLocation} = require('./iss');


// fetchMyIP((error, ip) => {  // => test calling, confirmed to work.
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log("It worked! Returned IP:", ip)
// })

// fetchCoordsByIP('154.5.57.49', (err, data) => { // => more test call, working.
//   if (err) {
//     console.log(`It didn't work! `, err);
//     return;
//   }
//   console.log(`It worked: `, data)

// })

// const exampleCoords = { latitude: '49.27670', longitude: '-123.13000' } // => more test code. Working.
// fetchISSFlyOverTimes(exampleCoords, (err, passTimes) => {
//   if (err) {
//         console.log(`It didn't work! `, err);
//         return;
//       }
//       console.log(`It worked! Returned flyover times: `, passTimes)
// });



const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }

};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});