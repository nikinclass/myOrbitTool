import { useNavigate } from "react-router-dom";

import { AddEntityButton } from "./AddEntityButton";
import { ManageSatellitesButton } from "./ManageSatellitesButton";
import { ScenarioTitleModal } from "./ScenarioTitleModal";

export const Controls = () => {
  // const [stationName, setStationName] = useState<string>("");
  // const [stationLatitude, setStationLatitude] = useState<number>();
  // const [stationLongitude, setStationLongitude] = useState<number>();
  // const [stationAltitude, setStationAltitude] = useState<number>();
  // const [commonName, setCommonName] = useState<string>("");
  // const [tleLine1, settleLine1] = useState<string>("");
  // const [tleLine2, settleLine2] = useState<string>("");

  const navigate = useNavigate();

  // const onSatelliteAdd = async () => {
  //   const payload = {
  //     scenario_id: id,
  //     OBJECT_NAME: commonName,
  //     TLE_LINE1: tleLine1,
  //     TLE_LINE2: tleLine2,
  //   };

  //   const response = await fetch(`${LOCALHOST_URL}/satellite`, {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(payload),
  //   }).then((res) => res.json());
  //   console.log(response);

  //   fetch(`${LOCALHOST_URL}/czml`, {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(payload),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (czmlArray == null) {
  //         setCzmlArray([<CzmlDataSource data={data} />]);
  //       } else {
  //         setCzmlArray([...czmlArray, <CzmlDataSource data={data} />]);
  //       }
  //     });
  // };

  // const onStationAdd = async () => {
  //   const payload = {
  //     scenario_id: id,
  //     OBJECT_NAME: stationName,
  //     LAT: stationLatitude,
  //     LONG: stationLongitude,
  //     ALT: stationAltitude,
  //   };
  //   console.log("hey!");
  //   fetch(`${LOCALHOST_URL}/site`, {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(payload),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       if (siteArray == null) {
  //         setSiteArray([<CzmlDataSource data={data} />]);
  //       } else {
  //         setSiteArray([...siteArray, <CzmlDataSource data={data} />]);
  //       }
  //     });
  // };

  return (
    <>
      {/* Controls */}
      {/* <div className="flex flex-col border-red-500 gap-2">
            <h3>Add a Satellite</h3>
            <input
              className="bg-white"
              type="text"
              placeholder="tle line 0"
              value={commonName}
              onChange={(e) => {
                setCommonName(e.target.value);
              }}
            />
            <input
              className="bg-white"
              type="text"
              placeholder="tle line 1"
              value={tleLine1}
              onChange={(e) => {
                settleLine1(e.target.value);
              }}
            />
            <input
              className="bg-white"
              type="text"
              placeholder="tle line 2"
              value={tleLine2}
              onChange={(e) => {
                settleLine2(e.target.value);
              }}
            />
            {isLoggedIn ? (
              <Button
                className="border rounded-full"
                onClick={onSatelliteAdd}
                title="Add satellite"
              >
                Add
              </Button>
            ) : (
              <Button
                className="bg-gray-300 text-gray-100 border rounded-full"
                onClick={onSatelliteAdd}
                disabled={true}
                title="Please login"
              >
                Add
              </Button>
            )}
          </div>
          <div className="flex flex-col border-red-500 gap-2">
            <h3>Add a Ground Station</h3>
            <input
              className="bg-white"
              type="text"
              placeholder="Name"
              value={stationName}
              onChange={(e) => {
                setStationName(e.target.value);
              }}
            />
            <input
              className="bg-white"
              placeholder="Latitude"
              type="number"
              value={stationLatitude}
              onChange={(e) => {
                setStationLatitude(e.target.valueAsNumber);
              }}
            />
            <input
              className="bg-white"
              type="number"
              placeholder="Longitude"
              value={stationLongitude}
              onChange={(e) => {
                setStationLongitude(e.target.valueAsNumber);
              }}
            />
            <input
              className="bg-white"
              type="number"
              placeholder="Altitude"
              value={stationAltitude}
              onChange={(e) => {
                setStationAltitude(e.target.valueAsNumber);
              }}
            />
            {isLoggedIn ? (
              <Button
                className="border rounded-full"
                onClick={onStationAdd}
                title="Add station"
              >
                Add
              </Button>
            ) : (
              <Button
                className="bg-gray-300 text-gray-100 border rounded-full"
                onClick={onStationAdd}
                disabled={true}
                title="Please login"
              >
                Add
              </Button>
            )}
          </div> */}

      <AddEntityButton className="absolute z-10 top-1/3 flex flex-col opacity-75 p-4" />
      <ManageSatellitesButton className="absolute z-10 top-2/5 flex flex-col opacity-75 p-4" />
    </>
  );
};
