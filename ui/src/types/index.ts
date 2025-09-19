export type Satellite = {
  id: string;
  OBJECT_NAME: string;
  OBJECT_ID?: string; // NOT NEEDED
  EPOCH: string; // SET TO CURRENT TIME IN JS .NOW OR SOMETHING
  MEAN_MOTION: number;
  ECCENTRICITY: number;
  INCLINATION: number;
  RA_OF_ASC_NODE: number;
  ARG_OF_PERICENTER: number;
  MEAN_ANOMALY: number;
  EPHEMERIS_TYPE: string; // NOT NEEDED CAN DEFAULT TO 0
  CLASSIFICATION_TYPE?: string; // NOT NEEDED CAN DEFAULT TO U
  NORAD_CAT_ID?: string; // NOT NEEDED
  ELEMENT_SET_NO?: string; // NOT NEEDED
  REV_AT_EPOCH: string; // NOT NEEDED? PRETTY SURE
  BSTAR: string;
  MEAN_MOTION_DOT: string;
  MEAN_MOTION_DDOT: string;
  COLOR: any;
  CZML: any;
  // [{
  //   id: string;
  //   name: string;
  //   version: string;
  //   clock: {
  //     interval: string;
  //     multiplier: number;
  //     range: string;
  //     step: string;
  //   }
  // },
  // {
  //   id: string;
  //   name: string;
  //   availability: string;
  //   label: {
  //     fillcolor: {
  //       rgba: [number, number, number, number]
  //     }
  //     font: string;
  //     horizontalOrigin: string;
  //     outlineColor: {
  //       rgba: [number, number, number, number]
  //     }
  //     outlineWidth: number;
  //     pixelOffset: {
  //       cartestion2: [number, number]
  //     }
  //     show: boolean;
  //     style: string;
  //     text: string;
  //     verticalOrigin: string;
  //   }
  //   path: {
  //     show: [
  //       {
  //         interval: string;
  //         boolean: boolean;
  //       }
  //     ]
  //     width: number;
  //     material: {
  //       solidColor: {
  //         color: {
  //           rgba: [number, number, number, number]
  //         }
  //       }
  //     }
  //     resolution: number;
  //   }
  //   point: {
  //     color: {
  //       rgba: [number, number, number, number]
  //     }
  //   }
  // }];
};

export type Site = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  altitude: number;
  COLOR: any;
  CZML: any;
};

export type User = {
  username: string;
  id: number;
};

export type Scenario = {
  id: number;
  title: string;
  description: string;
  owner: User;
  satellites: Satellite[];
  sites: Site[];
};
