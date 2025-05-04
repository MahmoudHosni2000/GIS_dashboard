import axios from 'axios';
import { DASHBOARD_ENDPOINT } from '../config/endpoints';
import { ENERGY_ENDPOINT } from '../config/endpoints';
import { WATER_ENDPOINT } from '../config/endpoints';
import { TRANSPORT_ENDPOINT } from '../config/endpoints';
import { WASTE_ENDPOINT } from '../config/endpoints';
import { HOTELS_ENDPOINT } from '../config/endpoints';
import { BIODIVERSITY_ENDPOINT } from '../config/endpoints';
import { SUSTAINABILITY_ENDPOINT } from '../config/endpoints';

// Dashboard indicators
export const getDashboardData = async () => {
  const res = await axios.get(`${DASHBOARD_ENDPOINT}`);
  return res.data;
};

// Energy indicators
export const getEnergyIndicators = async () => {
  const res = await axios.get(`${ENERGY_ENDPOINT}`);
  return res.data;
};

// Water indicators
export const getWaterIndicators = async () => {
  const res = await axios.get(`${WATER_ENDPOINT}`);
  return res.data;
};

// Transport indicators
export const getTransportIndicators = async () => {
  const res = await axios.get(`${TRANSPORT_ENDPOINT}`);
  return res.data;
};

// Waste indicators
export const getWasteIndicators = async () => {
  const res = await axios.get(`${WASTE_ENDPOINT}`);
  return res.data;
};

// Hotels and tourism
export const getHotelsData = async () => {
  const res = await axios.get(`${HOTELS_ENDPOINT}`);
  return res.data;
};

// Biodiversity indicators
export const getBiodiversityIndicators = async () => {
  const res = await axios.get(`${BIODIVERSITY_ENDPOINT}`);
  return res.data;
};

// Sustainability & climate resilience
export const getSustainabilityIndicators = async () => {
  const res = await axios.get(`${SUSTAINABILITY_ENDPOINT}`);
  return res.data;
};
