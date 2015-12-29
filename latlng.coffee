needle = require 'needle'

lineReader = require 'readline'
	.createInterface {
  		input: require 'fs'
  			.createReadStream 'places.txt'
	}


lineReader.on 'line', (line) ->
  needle.get 'https://maps.googleapis.com/maps/api/geocode/json?address=' + line, (error, response) ->
    if !error && response.statusCode is 200
      geocoding = response.body
      console.log line + ',', geocoding.results[0].geometry.location.lat + ',', geocoding.results[0].geometry.location.lng
