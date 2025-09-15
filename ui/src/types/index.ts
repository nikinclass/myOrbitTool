export type Satellite = {
  id: string;
  OBJECT_NAME: string;
  OBJECT_ID?: string; // NOT NEEDED
  EPOCH: string; // SET TO CURRENT TIME IN JS .NOW OR SOMETHING
  MEAN_MOTION: string; 
  ECCENTRICITY: string;
  INCLINATION: string;
  RA_OF_ASC_NODE: string;
  ARG_OF_PERICENTER: string;
  MEAN_ANOMALY: string;
  EPHEMERIS_TYPE: string; // NOT NEEDED CAN DEFAULT TO 0
  CLASSIFICATION_TYPE?: string; // NOT NEEDED CAN DEFAULT TO U
  NORAD_CAT_ID?: string; // NOT NEEDED
  ELEMENT_SET_NO?: string; // NOT NEEDED
  REV_AT_EPOCH: string; // NOT NEEDED? PRETTY SURE
  BSTAR: string;
  MEAN_MOTION_DOT: string;
  MEAN_MOTION_DDOT: string;
  COLOR: [number, number, number, number]; // DEFAULT TO SOMETHING LIKE [255, 0, 255, 255] but we shoudl give this to the user somehow
};

export type Site = {
  id: string;
  OBJECT_NAME: string;
  LAT: number;
  LONG: number;
  ALT: number;
  COLOR: [number, number, number, number];
}