// @ts-nocheck
import { Viewer, CzmlDataSource } from "resium";
import { useEffect, useState } from "react";

// CESIUM TOKEN FROM PAYTON

// Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5NTFmYzc3OS02YjE2LTQ5NjEtYTdlOS1hZjMwZmRjMDE5ZmUiLCJpZCI6MzM5ODg2LCJpYXQiOjE3NTc0NDIzNjB9.YJQtpmNYaaupmsPCu7NaGeZLRzQxRHpcYfPtsM2G4b0";

// INITALIZED VIEWER AND ATTACHES TO DIV WITH "cesiumContainer" CLASS

var testData = ["1 25544U 98067A   25252.19474949  .00008866  00000-0  16199-3 0  9990", "2 25544  51.6325 250.6930 0004281 318.3144  41.7518 15.50201228528195"]



// https://github.com/r3lek/tle2czml/blob/master/index.js#L105

// NEEDS TO BE MOVED TO THE BACKEND AGAINST AN API ENDPOINT
var testReturn = {}



export function Orbit() {
  const [czmlArray, setCzmlArray] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/czml/${33376}`)
      .then(res => res.json())
      .then(data => {
        setCzmlArray([<CzmlDataSource data={data}/>])
      })
  }, [])


  return (
    <Viewer>
      {czmlArray}
    </Viewer>
  );
}