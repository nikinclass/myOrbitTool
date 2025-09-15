import { Site } from "./types"

const satellite = require('satellite.js')
const fs = require('fs')
const path = require('path')
const moment = require('moment')
const julian = require('julian')
// https://github.com/r3lek/tle2czml/blob/master/index.js#L105

const siteCzmlConverter = (site: Site) => {

  //set initial object start for czml
  let initialCZMLProps = [
    {
      id: "document",
      name: "CZML Position Definitions",
      version: "1.0",
    },
    {
      id: site["OBJECT_NAME"],
      name: "point in cartographic degrees",
      position: {
        cartographicDegrees: [site["LAT"], site["LONG"], site["ALT"]],
      },
      label: {
        fillColor: {
          rgba: site["COLOR"],
        },
        font: "11pt Lucida Console",
        horizontalOrigin: "LEFT",
        outlineColor: {
          rgba: [0, 0, 0, 255],
        },
        outlineWidth: 2,
        pixelOffset: {
          cartesian2: [12, 0],
        },
        show: true,
        style: "FILL_AND_OUTLINE",
        text: `${site["OBJECT_NAME"]}`,
        verticalOrigin: "CENTER",
      },
      point: {
        color: {
          rgba: site["COLOR"],
        },
        outlineColor: {
          rgba: site["COLOR"],
        },
        pixelSize: {
          number: 10,
        },
      },
    },
  ]
  return initialCZMLProps;
}
// 1216469.9357990976, -4736121.71856379, 4081386.8856866374
export default siteCzmlConverter