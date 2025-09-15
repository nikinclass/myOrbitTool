import { Satellite } from "./types";

const satellite = require("satellite.js");
const fs = require("fs");
const path = require("path");
const moment = require("moment");
const julian = require("julian");
// https://github.com/r3lek/tle2czml/blob/master/index.js#L105

const satCzmlConverter = (
  sat: Satellite,
) => {

  let res = []; //result for position
  let satrec; //Set satrec
  // const omm = {
  //   "OBJECT_NAME": "HELIOS 2A",
  //   "OBJECT_ID": "2004-049A",
  //   "EPOCH": "2025-03-26T05:19:34.116960",
  //   "MEAN_MOTION": 15.00555103,
  //   "ECCENTRICITY": 0.000583,
  //   "INCLINATION": 98.3164,
  //   "RA_OF_ASC_NODE": 103.8411,
  //   "ARG_OF_PERICENTER": 20.5667,
  //   "MEAN_ANOMALY": 339.5789,
  //   "EPHEMERIS_TYPE": 0,
  //   "CLASSIFICATION_TYPE": "U",
  //   "NORAD_CAT_ID": 28492,
  //   "ELEMENT_SET_NO": 999,
  //   "REV_AT_EPOCH": 8655,
  //   "BSTAR": 0.00048021,
  //   "MEAN_MOTION_DOT": 0.00005995,
  //   "MEAN_MOTION_DDOT": 0
  // };

  satrec = satellite.json2satrec(sat);
  //to go from RAD/DAY -> REV/DAY: rad * 1440 * 0.159155
  //to go from REV/PER DAY to MINS/REV -> 1440/RevPerDay
  let totalIntervalsInDay = satrec.no * 1440 * 0.159155; //1440 = min && 0.159155 = 1turn
  let minsPerInterval = 1440 / totalIntervalsInDay; // mins for 1 revolution around earth
  let intervalTime = moment(
    julian.toDate(satrec.jdsatepoch).toISOString()
  ).toISOString();

  //set intervals
  let initialTime = moment(
    julian.toDate(satrec.jdsatepoch).toISOString()
  ).toISOString(); //start date of TLE
  let endTime = moment(julian.toDate(satrec.jdsatepoch).toISOString())
    .add(120, "h")
    .toISOString(); //add 120hours(5days)
  let leadIntervalArray = [];
  let trailIntervalArray = [];

  console.log(`Setting intervals for ${sat["OBJECT_NAME"]}...`);
  for (let i = 0; i <= 7200; i += minsPerInterval) {
    //7200===120hours===5days(which is our end time)
    if (i === 0) {
      // intial interval
      intervalTime = moment(intervalTime)
        .add(minsPerInterval, "m")
        .toISOString();
      let currentOrbitalInterval = {
        interval: `${initialTime}/${intervalTime}`,
        epoch: `${initialTime}`,
        number: [0, minsPerInterval * 60, minsPerInterval * 60, 0],
      };
      let currTrail = {
        interval: `${initialTime}/${intervalTime}`,
        epoch: `${initialTime}`,
        number: [0, 0, minsPerInterval * 60, minsPerInterval * 60],
      };
      leadIntervalArray.push(currentOrbitalInterval);
      trailIntervalArray.push(currTrail);
    } else {
      //not initial so make intervals
      let nextIntervalTime = moment(intervalTime)
        .add(minsPerInterval, "m")
        .toISOString();
      let currentOrbitalInterval = {
        interval: `${intervalTime}/${nextIntervalTime}`,
        epoch: `${intervalTime}`,
        number: [0, minsPerInterval * 60, minsPerInterval * 60, 0],
      };
      let currTrail = {
        interval: `${intervalTime}/${nextIntervalTime}`,
        epoch: `${intervalTime}`,
        number: [0, 0, minsPerInterval * 60, minsPerInterval * 60],
      };
      intervalTime = moment(intervalTime)
        .add(minsPerInterval, "m")
        .toISOString();
      leadIntervalArray.push(currentOrbitalInterval);
      trailIntervalArray.push(currTrail);
    }
  }
  for (let i = 0; i <= 432000; i++) {
    //iterates every second (86400sec in 1day)
    satrec = satellite.json2satrec(sat);
    let positionAndVelocity = satellite.sgp4(satrec, i * 0.0166667); // 0.0166667min = 1sec
    let positionEci = positionAndVelocity.position;
    positionEci.x = positionEci.x * 1000;
    positionEci.y = positionEci.y * 1000;
    positionEci.z = positionEci.z * 1000;

    res.push(i, positionEci.x, positionEci.y, positionEci.z);
  }

  //set initial object start for czml
  let initialCZMLProps = [
    {
      id: "document",
      name: "CZML Point - Time Dynamic",
      version: "1.0",
      clock: {
        interval: `${initialTime}/${endTime}`,
        multiplier: 1,
        range: "LOOP_STOP",
        step: "SYSTEM_CLOCK",
      },
    },

    {
      id: `${sat["OBJECT_NAME"]}`,
      name: `${sat["OBJECT_NAME"]}`,
      availability: `${initialTime}/${endTime}`,
      description: "Insert the altitude here??",
      label: {
        fillColor: sat["COLOR"],
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
        text: `${sat["OBJECT_NAME"]}`,
        verticalOrigin: "CENTER",
      },
      path: {
        show: [
          {
            interval: `${initialTime}/${endTime}`,
            boolean: true,
          },
        ],
        width: 1,
        material: {
          solidColor: {
            color: {
              rgba: sat["COLOR"],
            },
          },
          resolution: 120,
          leadTime: leadIntervalArray,
          trailTime: trailIntervalArray,
        },
        model: {
          show: false,
          //Animation(s).
          minimumPixelSize: 99,
        },
        point: {
          show: true,
          pixelSize: 10,
          color: {
            rgba: sat["COLOR"],
          },
        },
        position: {
          interpolationAlgorithm: "LAGRANGE",
          interpolationDegree: 2,
          referenceFrame: "INERTIAL",
          epoch: `${initialTime}`,
          cartesian: res,
        },
      },
    }
  ];

  return initialCZMLProps;
};

export default satCzmlConverter;
