import ajax from "../utils/ajax";

const BASE_HREF = `${process.env.REACT_APP_API_HOST}delivery/`;
const DRIVER_BASE_HREF = `${process.env.REACT_APP_BASE_URL}internal/dashboard/driver/`;
const GEO_BASE_HREF = process.env.REACT_APP_GEO_URL;

// Client onboarding APIs
export const getClients = (filters) => ajax.get(`${BASE_HREF}client`, filters);
export const getCategories = () => ajax.get(`${BASE_HREF}client/category`);
export const getClientInfo = (id) => ajax.get(`${BASE_HREF}client/${id}`);
export const addClients = (data) => ajax.post(`${BASE_HREF}client`, data);

// Hubs APIs
export const addHubs = ({ data }) => ajax.post(`${BASE_HREF}client_hub`, data);
export const addSlots = (data) => ajax.post(`${BASE_HREF}client_hub/slot`, data);
export const getHubs = (filters) => ajax.get(`${BASE_HREF}client_hub`, filters);
export const fetchHubDetails = (id) => ajax.get(`${BASE_HREF}client_hub/${id}`);
export const editHub = ({ id, data }) => ajax.put(`${BASE_HREF}client_hub/${id}`, data);
export const getSlots = (filters) => ajax.get(`${BASE_HREF}client_hub/slot`, filters);
export const changeSlotStatus = (id, data) => ajax.put(`${BASE_HREF}client_hub/slot/${id}/activation`, data);
export const getRegions = (filters) => ajax.get(`${BASE_HREF}region`, filters);
export const editSlots = (data) => ajax.put(`${BASE_HREF}client_hub/slot`, data);
export const fetchRegionDetail = (id) => ajax.get(`${GEO_BASE_HREF}region/?search_via=id&search_val=${id}`);

// RateCard APIs
export const getRateCard = (filters) => ajax.get(`${BASE_HREF}client_rate_card`, filters);
export const activateRateCard = (id) => ajax.put(`${BASE_HREF}client_rate_card/${id}/activation`);

// Requirements APIs
export const getRequirements = (filters) => ajax.get(`${BASE_HREF}requirement`, filters);
export const changeReqStatus = (data) => ajax.put(`${BASE_HREF}requirement/activation`, data);
export const uploadRequirements = (file) => ajax.post(`${BASE_HREF}requirement/bulk`, file);
export const editRequirements = (id, data) => ajax.put(`${BASE_HREF}requirement/${id}`, data);
export const getSingleRequirement = (id) => ajax.get(`${BASE_HREF}requirement/${id}`);

// Commitement APIs
export const uploadVehicles = (file) => ajax.post(`${BASE_HREF}commitment/bulk`, file);
export const deleteCommitment = (data) => ajax.put(`${BASE_HREF}commitment/activation`, data);
export const getCommitments = (data) => ajax.get(`${BASE_HREF}commitment`, data);
export const commitmentSearch = (data) => ajax.get(`${DRIVER_BASE_HREF}vehicle/details/search`, data);
export const addCommitments = (data) => ajax.post(`${BASE_HREF}commitment`, data);
export const changeCommitmentType = (id, data) => ajax.put(`${BASE_HREF}commitment/${id}/set_type_to_primary`);

// Transactions APIs
export const getTransactions = (filters) => ajax.get(`${BASE_HREF}fulfilment`, filters);
export const freezeTransactions = (data) => ajax.put(`${BASE_HREF}fulfilment/activation`, data);
export const uploadTransactions = (file) => ajax.post(`${BASE_HREF}fulfilment/bulk`, file);
export const getClientNames = () => ajax.get(`${BASE_HREF}client/identifier`);

// admin task file
export const getFilesList = (filters) => ajax.get(`${BASE_HREF}admin/file`, filters);
export const getAdminTaskFile = (data) => ajax.get(`${BASE_HREF}admin/file/link`, data);

// client driver details
export const getDriverListing = (filters) => ajax.get(`${BASE_HREF}client_driver_mapping`, filters);
export const addDriverDetails = (data) => ajax.post(`${BASE_HREF}client_driver_mapping`, data);
export const uploadDriverDetails = (file) => ajax.post(`${BASE_HREF}client_driver_mapping/bulk`, file);
export const getDriverDetails = (id) => ajax.get(`${BASE_HREF}client_driver_mapping/${id}`);
export const editDriverDetails = (id, data) => ajax.put(`${BASE_HREF}client_driver_mapping/${id}`, data);
