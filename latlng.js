var needle = require('needle');

var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('places.txt')
});

lineReader.on('line', function (line) {
  needle.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + line, function(error, response) {
    if (!error && response.statusCode == 200){
      geocoding = response.body;
      console.log(line + ',', geocoding.results[0].geometry.location.lat + ',', geocoding.results[0].geometry.location.lng);
    }
  });
});

