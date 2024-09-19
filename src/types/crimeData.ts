// Common interface for all city datasets
export interface CityDataset {
  endpoint: string;
  identifier: string;
  datasetUrl: string;
  apiEndpoint: string;
}

// Interfaces for each city's crime data
export interface NewYorkCrimeData {
  // Unique identifier for the complaint
  cmplnt_num: string;
  // Precinct code where the incident occurred
  addr_pct_cd: string;
  // Borough name where the incident occurred
  boro_nm: string;
  // Date of the incident
  cmplnt_fr_dt: string;
  // Time when the incident began
  cmplnt_fr_tm: string;
  // Time when the incident ended (if applicable)
  cmplnt_to_tm: string | null;
  // Indicator of whether the crime was completed or attempted
  crm_atpt_cptd_cd: string;
  // Housing development code (if applicable)
  hadevelopt: string | null;
  // Jurisdiction code
  jurisdiction_code: string;
  // Description of the jurisdiction
  juris_desc: string;
  // Internal classification code
  ky_cd: string;
  // Level of offense (felony, misdemeanor, violation)
  law_cat_cd: string;
  // Description of the location of occurrence
  loc_of_occur_desc: string;
  // Description of the offense
  ofns_desc: string;
  // Name of the park (if applicable)
  parks_nm: string | null;
  // Patrol borough
  patrol_boro: string;
  // Internal classification code
  pd_cd: string;
  // Description of the internal classification
  pd_desc: string;
  // Description of the premises type
  prem_typ_desc: string;
  // Date the incident was reported
  rpt_dt: string;
  // Name of the transit station (if applicable)
  station_name: string | null;
  // Age group of the suspect
  susp_age_group: string;
  // Race of the suspect
  susp_race: string;
  // Sex of the suspect
  susp_sex: string;
  // Age group of the victim
  vic_age_group: string;
  // Race of the victim
  vic_race: string;
  // Sex of the victim
  vic_sex: string;
  // X-coordinate for mapping
  x_coord_cd: string;
  // Y-coordinate for mapping
  y_coord_cd: string;
  // Latitude of the incident
  latitude: string;
  // Longitude of the incident
  longitude: string;
  // Latitude and longitude object
  lat_lon: {
    latitude: string;
    longitude: string;
  };
  // Geocoded column for mapping
  geocoded_column: {
    type: string;
    coordinates: [number, number];
  };
}

export interface LosAngelesCrimeData {
  // Unique identifier for the crime report (Division of Records Number)
  dr_no: string;
  // Date the crime was reported to the police
  date_rptd: string;
  // Date the crime occurred
  date_occ: string;
  // Time the crime occurred (in 24-hour format)
  time_occ: string;
  // Numeric code for the area where the crime occurred
  area: string;
  // Name of the area where the crime occurred
  area_name: string;
  // Reporting district number
  rpt_dist_no: string;
  // Indicates whether it's a Part 1 or Part 2 crime
  part_1_2: string;
  // Numeric code for the type of crime
  crm_cd: string;
  // Description of the crime type
  crm_cd_desc: string;
  // Age of the victim (0 if not applicable or unknown)
  vict_age: string;
  // Sex of the victim
  vict_sex: string;
  // Descent of the victim (ethnicity/race code)
  vict_descent: string;
  // Numeric code for the type of premises where the crime occurred
  premis_cd: string;
  // Description of the premises where the crime occurred
  premis_desc: string;
  // Status code of the crime (e.g., solved, unsolved)
  status: string;
  // Description of the status
  status_desc: string;
  // Primary crime code
  crm_cd_1: string;
  // Secondary crime code (if applicable)
  crm_cd_2: string;
  // Address where the crime occurred
  location: string;
  // Latitude coordinate of the crime location
  lat: string;
  // Longitude coordinate of the crime location
  lon: string;
}

export interface ChicagoCrimeData {
  // Unique identifier for the crime incident
  id: string;
  // Case number assigned to the incident
  case_number: string;
  // Date and time when the incident occurred
  date: string;
  // Approximate street address of the incident
  block: string;
  // Illinois Uniform Crime Reporting code
  iucr: string;
  // The primary description of the IUCR code
  primary_type: string;
  // Secondary description of the IUCR code
  description: string;
  // Description of the location where the incident occurred
  location_description: string;
  // Indicates whether an arrest was made
  arrest: boolean;
  // Indicates whether the incident was domestic-related
  domestic: boolean;
  // Indicates the police beat where the incident occurred
  beat: string;
  // Indicates the police district where the incident occurred
  district: string;
  // The ward (City Council district) where the incident occurred
  ward: string;
  // Indicates the community area where the incident occurred
  community_area: string;
  // Indicates the crime classification as outlined in the FBI's Uniform Crime Reporting (UCR) Program
  fbi_code: string;
  // X coordinate of the location
  x_coordinate: string;
  // Y coordinate of the location
  y_coordinate: string;
  // Year the incident occurred
  year: string;
  // Date and time the record was last updated
  updated_on: string;
  // The latitude of the location
  latitude: string;
  // The longitude of the location
  longitude: string;
  // Object containing detailed location information
  location: {
    latitude: string;
    longitude: string;
    human_address: string;
  };
}

export interface SeattleCrimeData {
  // Unique identifier for the report
  report_number: string;
  // Unique identifier for the specific offense
  offense_id: string;
  // Date and time when the offense started
  offense_start_datetime: string;
  // Date and time when the report was filed
  report_datetime: string;
  // Indicates whether the offense is Group A or Group B
  group_a_b: string;
  // Category of the crime (e.g., SOCIETY, PROPERTY, PERSON)
  crime_against_category: string;
  // Broader category of the offense
  offense_parent_group: string;
  // Specific type of offense
  offense: string;
  // Numeric code for the offense type
  offense_code: string;
  // Police precinct where the offense occurred
  precinct: string;
  // Sector within the precinct
  sector: string;
  // Specific beat within the sector
  beat: string;
  // Micro Community Policing Plan area
  mcpp: string;
  // Approximate address of the incident (100 block level)
  _100_block_address: string;
  // Longitude coordinate of the incident
  longitude: string;
  // Latitude coordinate of the incident
  latitude: string;
}

export type CityKey = "newYork" | "seattle" | "losAngeles" | "chicago";

export interface CrimeDataResponse {
  city: CityKey;
  latitude: number;
  longitude: number;
  timeRange: string;
  totalCrimes: number;
  mostCommonCrime: {
    type: string;
    count: number;
  };
  crimeBreakdown: Array<{ crime_type: string; count: string }>;
}
