const satellite = require('satellite.js')
const fs = require('fs')
const path = require('path')
const moment = require('moment')
const julian = require('julian')
// https://github.com/r3lek/tle2czml/blob/master/index.js#L105

const satCzmlConverter = (site_name: string, latlongalt: string[], color = { "rgba": [255, 0, 255, 255] }) => {

  //set initial object start for czml
  let initialCZMLProps = [{
    "id": "document",
    "name": "CZML Point - Time Dynamic",
    "version": "1.0"
  },

  {
    "id": site_name,
    "name": "AGI",
    "description": "Functionality to be added!",
    "billboard": {
      "eyeOffset": {
        "cartesian": [
          0, 0, 0
        ]
      },
      "horizontalOrigin": "CENTER",
      "pixelOffset": {
        "cartesian2": [
          0, 0
        ]
      },
      "scale": 1.5,
      "show": true,
      "verticalOrigin": "CENTER"
    },
    "point": {
      "show": true,
      "pixelSize": 10,
      "color": color
    },
    "label": {
      "fillColor": color,
      "font": "11pt Lucida Console",
      "horizontalOrigin": "LEFT",
      "outlineColor": {
        "rgba": [
          0, 0, 0, 255
        ]
      },
      "outlineWidth": 2,
      "pixelOffset": {
        "cartesian2": [
          12, 0
        ]
      },
      "show": true,
      "style": "FILL_AND_OUTLINE",
      "text": site_name,
      "verticalOrigin": "CENTER"
    },
    "position": {
      "cartesian": [
        // 1216469.9357990976, -4736121.71856379, 4081386.8856866374
        latlongalt[0], latlongalt[1], latlongalt[2]
      ]
    }
  },
  ]

  return initialCZMLProps;
}
// 1216469.9357990976, -4736121.71856379, 4081386.8856866374
export default satCzmlConverter