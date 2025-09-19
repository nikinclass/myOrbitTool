import { Satellite } from "./types";

import {
  twoline2satrec,
  sgp4,
  json2satrec,
  OMMJsonObjectV3,
} from "satellite.js";
import moment from "moment";
const julian = require("julian");
// https://github.com/r3lek/tle2czml/blob/master/index.js#L105

const satCzmlConverter = (sat: Satellite) => {
  let res = []; //result for position
  //Set satrec

  const omm = {
    OBJECT_NAME: sat["OBJECT_NAME"],
    OBJECT_ID: "2004-049A",
    EPOCH: "2025-03-26T05:19:34.116960",
    MEAN_MOTION: 15.00555103,
    ECCENTRICITY: 0.000583,
    INCLINATION: 98.3164,
    RA_OF_ASC_NODE: 103.8411,
    ARG_OF_PERICENTER: 20.5667,
    MEAN_ANOMALY: 339.5789,
    EPHEMERIS_TYPE: 0,
    CLASSIFICATION_TYPE: "U",
    NORAD_CAT_ID: 28492,
    ELEMENT_SET_NO: 999,
    REV_AT_EPOCH: 8655,
    BSTAR: 0.00048021,
    MEAN_MOTION_DOT: 0.00005995,
    MEAN_MOTION_DDOT: 0,
  };
  /*Error: react-stack-top-frame
    at exports.jsxDEV (http://localhost:3000/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=43031535:249:30)
    at http://localhost:3000/src/pages/Scenario.tsx?t=1757960147436:66:59*/

  let satrec;
  satrec = json2satrec(sat as OMMJsonObjectV3);
  // satrec = twoline2satrec(sat["TLE_LINE1"], sat["TLE_LINE2"]);
  // satrec = satellite.json2satrec(sat);

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
    .add(24, "h")
    .toISOString(); //add 120hours(5days)
  let leadIntervalArray = [];
  let trailIntervalArray = [];

  // console.log(`Setting intervals for ${sat["OBJECT_NAME"]}...`);
  for (let i = 0; i <= 1440; i += minsPerInterval) {
    //1440===24hours===1days(which is our end time)
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
  for (let i = 0; i <= 86400; i++) {
    //iterates every second (86400sec in 1day)
    satrec = json2satrec(sat as OMMJsonObjectV3);
    let positionAndVelocity = sgp4(satrec, i * 0.0166667); // 0.0166667min = 1sec
    if (positionAndVelocity == null) continue;
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
      description: "Click the camera icon to follow this satellites path",
      label: {
        fillColor: {
          rgba: [255, 255, 255, 255],
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
              rgba: [255, 255, 0, 255],
            },
          },
        },
        resolution: 120,
        leadTime: leadIntervalArray,
        trailTime: trailIntervalArray,
      },
      point: {
        show: true,
        pixelSize: 10,
        color: "rgba(255, 0, 255, 255)",
      },
      position: {
        interpolationAlgorithm: "LAGRANGE",
        interpolationDegree: 2,
        referenceFrame: "INERTIAL",
        epoch: `${initialTime}`,
        cartesian: res,
      },
    },
  ];
  return initialCZMLProps;
};

export default satCzmlConverter;
