import axios from "axios";
import { CityDataset, CityKey } from "@/types/crimeData";
import { getDistance } from "@/lib/util";

export const CITY_DATASETS: Record<CityKey, CityDataset> = {
  newYork: {
    endpoint: "data.cityofnewyork.us",
    identifier: "5uac-w243",
    datasetUrl:
      "https://data.cityofnewyork.us/Public-Safety/NYPD-Complaint-Data-Current-Year-To-Date-/5uac-w243",
    apiEndpoint: "https://data.cityofnewyork.us/resource/5uac-w243.json",
  },
  seattle: {
    endpoint: "data.seattle.gov",
    identifier: "tazs-3rd5",
    datasetUrl:
      "https://data.seattle.gov/Public-Safety/SPD-Crime-Data-2008-Present/tazs-3rd5",
    apiEndpoint: "https://data.seattle.gov/resource/tazs-3rd5.json",
  },
  losAngeles: {
    endpoint: "data.lacity.org",
    identifier: "2nrs-mtv8",
    datasetUrl:
      "https://data.lacity.org/Public-Safety/Crime-Data-from-2020-to-Present/2nrs-mtv8",
    apiEndpoint: "https://data.lacity.org/resource/2nrs-mtv8.json",
  },
  chicago: {
    endpoint: "data.cityofchicago.org",
    identifier: "ijzp-q8t2",
    datasetUrl:
      "https://data.cityofchicago.org/Public-Safety/Crimes-2001-to-Present/ijzp-q8t2",
    apiEndpoint: "https://data.cityofchicago.org/resource/ijzp-q8t2.json",
  },
};

export const fetchCityData = async (
  city: CityKey,
  lat: number,
  lon: number,
  radius: number,
  startDate: string,
  endDate: string
) => {
  console.log(
    `Fetching data for ${city} within ${radius}km of (${lat}, ${lon})`
  );
  console.log(`Date range: ${startDate} to ${endDate}`);

  const dataset = CITY_DATASETS[city];
  const apiUrl = dataset.apiEndpoint;

  let query = `$limit=1000`;

  // Adjust query based on city-specific data structure
  switch (city) {
    case "newYork":
      query += `&$where=cmplnt_fr_dt >= '${startDate}' AND cmplnt_fr_dt <= '${endDate}'`;
      query += `&$select=ofns_desc as crime_type, latitude, longitude`;
      break;
    case "losAngeles":
      query += `&$where=date_occ >= '${startDate}T00:00:00' AND date_occ <= '${endDate}T23:59:59'`;
      query += `&$select=crm_cd_desc as crime_type, lat, lon`;
      break;
    case "chicago":
      query += `&$where=date >= '${startDate}T00:00:00' AND date <= '${endDate}T23:59:59'`;
      query += `&$select=primary_type as crime_type, latitude, longitude`;
      break;
    case "seattle":
      query += `&$where=offense_start_datetime >= '${startDate}T00:00:00' AND offense_start_datetime <= '${endDate}T23:59:59'`;
      query += `&$select=offense as crime_type, latitude, longitude`;
      break;
    default:
      throw new Error("City-specific query not implemented");
  }

  console.log(`Query for ${city}:`, `${apiUrl}?${query}`);

  try {
    const response = await axios.get(`${apiUrl}?${query}`, {
      headers: {
        "X-App-Token": process.env.SOCRATA_APP_TOKEN,
        Accept: "application/json",
      },
    });

    console.log(`Received ${response.data.length} rows for ${city}`);

    const filteredRows = response.data.filter((row: any) => {
      const distance = getDistance(
        lat,
        lon,
        parseFloat(row.latitude || row.lat),
        parseFloat(row.longitude || row.lon)
      );
      return distance <= radius;
    });

    console.log(`Filtered to ${filteredRows.length} rows within ${radius}km`);

    return filteredRows;
  } catch (error) {
    console.error(`Error fetching data for ${city}:`, error);
    throw error;
  }
};
