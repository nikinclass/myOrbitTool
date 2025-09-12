// @ts-nocheck
import { Viewer, CzmlDataSource } from "resium";
import { useEffect, useState } from "react";

const PROXIED_URL = "/api/czml";
const LOCALHOST_URL = "http://localhost:8080/api/czml";

// CESIUM TOKEN FROM PAYTON

// Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5NTFmYzc3OS02YjE2LTQ5NjEtYTdlOS1hZjMwZmRjMDE5ZmUiLCJpZCI6MzM5ODg2LCJpYXQiOjE3NTc0NDIzNjB9.YJQtpmNYaaupmsPCu7NaGeZLRzQxRHpcYfPtsM2G4b0";

// INITALIZED VIEWER AND ATTACHES TO DIV WITH "cesiumContainer" CLASS



// https://github.com/r3lek/tle2czml/blob/master/index.js#L105

// NEEDS TO BE MOVED TO THE BACKEND AGAINST AN API ENDPOINT
var testReturn = {};

export function OrbitViewer({ className }) {
  const [czmlArray, setCzmlArray] = useRef(null);
  const [groundArray, setGroundArray] = useState(null);

  useEffect(() => {
    fetch(`${PROXIED_URL}/${25544}`)
      .then((res) => res.json())
      .then((data) => {
        setCzmlArray([<CzmlDataSource data={data} />]);
      });
  }, []);

  return (
    <Viewer className={`${className}`}>
      {czmlArray}
      {entityArray}
    </Viewer>
    );
}
