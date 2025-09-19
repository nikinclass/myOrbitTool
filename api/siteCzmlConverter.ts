import { Site } from "./types";

const satellite = require("satellite.js");
const fs = require("fs");
const path = require("path");
const moment = require("moment");
const julian = require("julian");
// https://github.com/r3lek/tle2czml/blob/master/index.js#L105

const siteCzmlConverter = (site: Site) => {
  if (Array.isArray(site.COLOR)) {
    var rgba = site.COLOR;
  } else {
    const fixed = site.COLOR.replace(/{/g, "[").replace(/}/g, "]");
    rgba = JSON.parse(fixed).map(Number);
  }
  var rgba_lighter = [rgba[0], rgba[1], rgba[2], 200];

  //set initial object start for czml
  let initialCZMLProps = [
    {
      id: "document",
      name: "CZML Position Definitions",
      version: "1.0",
    },
    {
      id: site["name"],
      name: "point in cartographic degrees",
      position: {
        cartographicDegrees: [
          site["longitude"],
          site["latitude"],
          site["altitude"],
        ],
      },
      label: {
        fillColor: {
          rgba: rgba,
        },
        font: "bold 16px sans-serif",
        horizontalOrigin: "LEFT",
        outlineColor: {
          rgba: [0, 0, 0, 255],
        },
        outlineWidth: 0,
        pixelOffset: {
          cartesian2: [12, 0],
        },
        show: true,
        style: "FILL_AND_OUTLINE",
        text: `${site["name"]}`,
        verticalOrigin: "CENTER",
      },
      point: {
        color: {
          rgba: rgba_lighter,
        },
        outlineColor: {
          rgba: rgba,
        },
        pixelSize: {
          number: 10,
        },
      },
    },
  ];
  // console.log(`Created CZML for ${site["name"]}`)
  return initialCZMLProps;
};
// 1216469.9357990976, -4736121.71856379, 4081386.8856866374
export default siteCzmlConverter;
