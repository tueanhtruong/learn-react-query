export interface Trip {
  createdDate: string;
  id: string;
  name: string;
  isOutbound: boolean;
  immigrationStatus: string;
  healthStatus: string;
  firstTestingStatus: string;
  secondTestingStatus: string;
  thirdTestingStatus: string;
  firstTestingUiStatus: string;
  secondTestingUiStatus: string;
  thirdTestingUiStatus: string;
  questionnaireStatus: string;
  flightStatus: string;
  phone: string;
  phoneVerified: boolean;
  confirmationCode: string;
  primaryTravelerId: string;
  tripStatusId: number;
  userId: string;
  checkedInAt: string;
  canceledById: string;
  tripStatusUpdatedAt: string;
  flow: string;
  isPort: boolean;
  tripStatus: TripStatus;
  tripDestination: TripDestination;
  flight: Flight;
  tripTravelers: TripTraveler[];
  labRegistrations: any[];
  tripPurpose: any;
  travelOption: string;
  extra: Extra;
  isApprovedAnyPortion: boolean;
  hasQuarantineCheckIn: boolean;
}

export interface Extra {
  flightScheduleTestDates: FlightScheduleTestDate[];
}

export interface FlightScheduleTestDate {
  nthTest: number;
}

export interface Flight {
  id: string;
  departureAirlineId: string;
  departureDate: string;
  arrivalAirlineId: string;
  arrivalDate: string;
  flightSchedule: string;
}

export interface TripDestination {
  locationName: string;
  address: string;
  destinationState: string;
  city: string;
  postalCode: string;
  villageId: string;
  stateId: string;
}

export interface TripStatus {
  id: number;
  key: string;
  name: string;
}

export interface TripTraveler {
  travelerId: string;
  phone: string;
  phoneVerified: boolean;
  isExemptedFirstTest: boolean;
  isExemptedSecondTest: boolean;
  isExemptedThirdTest: boolean;
  isExemptedQuestionnaire: boolean;
  isCheckedIn: boolean;
  personalInfoId: string;
  tripQuestionnaireId: string;
  isActive: boolean;
  firstTestStatus: string;
  secondTestStatus: string;
  thirdTestStatus: string;
  personalInfo: TripPersonalInfo;
  identityInfo: TripIdentityInfo;
  vaccinationRegistry: any;
  tripHealthHistory: TripHealthHistory;
  testResults: any[];
  quarantines: any[];
  attachmentFiles: any[];
}

export interface TripIdentityInfo {
  identityProofStatus: string;
  residencyProofStatus: string;
  visaStatus: string;
  isRequestResidencyDoc: boolean;
  requestResidencyDocReason: string;
}

export interface TripPersonalInfo {
  firstName: string;
  lastName: string;
  attorneyConsentFormStatus: string;
  birthCertificateStatus: string;
  firstAndLastName: string;
}

export interface TripHealthHistory {
  medicalConditionStatus: string;
}
