const satellite = require('satellite.js')
const fs = require('fs')
const path = require('path')
const moment = require('moment')
const julian = require('julian')
// https://github.com/r3lek/tle2czml/blob/master/index.js#L105

const satCzmlConverter = (site_name: string, latlongalt: string[], color = { "rgba": [255, 0, 255, 255] }) => {

  //set initial object start for czml
  let initialCZMLProps = [
    {
      id: "document",
      name: "CZML Position Definitions",
      version: "1.0",
    },
    {
      id: site_name,
      name: "point in cartographic degrees",
      position: {
        cartographicDegrees: [latlongalt[0], latlongalt[1], latlongalt[2]],
      },
      point: {
        color: color,
        outlineColor: color,
        pixelSize: {
          number: 10,
        },
      },
    },
  ]
  return initialCZMLProps;
}
// 1216469.9357990976, -4736121.71856379, 4081386.8856866374
export default satCzmlConverter