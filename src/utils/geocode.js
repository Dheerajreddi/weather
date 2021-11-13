// const request = require("postman-request");

// const geocode = (address, callback) => {
//   const mapboxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZGhlZXJhanJlZGR5IiwiYSI6ImNqc2Z2eTJ4dTAwdHA0NXJ2aDV3ZGVtZWYifQ.xU_eBnlXuxSDxbLtAmhQYA&limit=1`;

//   request({ url: mapboxUrl, json: true }, (err, res) => {
//     if (err) {
//       console.log("Unable to connect to MapBox - Might be network issues");
//     } else {
//       callback(res.body.features[0]);
//     }
//   });
// };

// module.exports = geocode;







const request = require('postman-request')

const geocode = (address, callback) => {
    // const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiYW5kcmV3bWVhZDEiLCJhIjoiY2pvOG8ybW90MDFhazNxcnJ4OTYydzJlOSJ9.njY7HvaalLEVhEOIghPTlw&limit=1'

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZGhlZXJhanJlZGR5IiwiYSI6ImNqc2Z2eTJ4dTAwdHA0NXJ2aDV3ZGVtZWYifQ.xU_eBnlXuxSDxbLtAmhQYA&limit=1`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode