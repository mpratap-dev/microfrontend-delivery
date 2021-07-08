export const DELIVERY_STATE_NAMES = {
  1: "Rejected",
  2: "Pending_approval",
  3: "APPROVED",
  4: "Active",
  5: "Inactive",
};

export const DELIVERY_STATE = {
  REJECTED: 1,
  PENDING_APPROVAL: 2,
  APPROVED: 3,
  ACTIVE: 4,
  INACTIVE: 5,
};

export const REQUIREMENT_STATE = {
  OPEN: 1,
  FROZEN: 2,
  INACTIVE: 3,
};

export const REQUIREMENT_STATE_NAME = ["Open", "Frozen", "Inactive"];

export const COMMITMENT_STATE = {
  ACTIVE: 1,
  INACTIVE: 2,
};

export const COMMITMENT_TYPE = {
  PRIMARY: "PRIMARY",
  BACKUP: "BACKUP",
  ON_JOB_TRAINING: "ON_JOB_TRAINING",
};

export const DRIVER_DETAILS_STATE = ["Incomplete", "Complete"];

export const FULFILMENT_CLIENTS = [
  "UDAAN_MAIN",
  "BB_DAILY",
  "NINJA_CART",
  "JIO_MART",
  "UDAAN_FOOD",
];

export const CONTACT_INFO_TYPES = {
  HUB_POC: "HUB_POC",
  TRAINER: "TRAINER",
  OYE_HUB_MANAGER: "OYE_HUB_MANAGER",
  OYE_NINJA: "OYE_NINJA",
};

export const SLOT_STATE = {
  PENDING_APPROVAL: 2,
  ACTIVE: 4,
  PHASED_OUT: 5,
};

export const SLOT_STATE_NAME = {
  2: "Pending approval",
  4: "Active",
  5: "Phased out",
};
// Fulfilment state
export const FULFILMENT_STATE = {
  PENDING_APPROVAL: 1,
  APPROVED: 2,
  INACTIVE: 3,
};

export const FULFILMENT_STATE_NAME = {
  1: "Pending approval",
  2: "Approved",
  3: "Inactive",
};
