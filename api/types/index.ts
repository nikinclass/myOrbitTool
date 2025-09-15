export type Satellite = {
  id: string;
  OBJECT_NAME: string;
  OBJECT_ID?: string;
  EPOCH: string;
  MEAN_MOTION: string;
  ECCENTRICITY: string;
  INCLINATION: string;
  RA_OF_ASC_NODE: string;
  ARG_OF_PERICENTER: string;
  MEAN_ANOMALY: string;
  EPHEMERIS_TYPE: string;
  CLASSIFICATION_TYPE?: string;
  NORAD_CAT_ID?: string;
  ELEMENT_SET_NO?: string;
  REV_AT_EPOCH: string;
  BSTAR: string;
  MEAN_MOTION_DOT: string;
  MEAN_MOTION_DDOT: string;
  COLOR: [number, number, number, number];
};

export type Site = {
  id: string;
  OBJECT_NAME: string;
  LAT: string;
  LONG: string;
  ALT: string;
  COLOR: [number, number, number, number];
}