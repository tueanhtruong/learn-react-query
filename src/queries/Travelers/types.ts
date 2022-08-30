export interface Traveler {
  createdDate: string;
  id: string;
  isMinor: boolean;
  isSamePrimaryContact: boolean;
  email: string;
  emailVerified: boolean;
  phone: string;
  phoneVerified: boolean;
  secondaryPhone: string;
  secondaryPhoneVerified: boolean;
  personalInfoId: string;
  contactInfoId: string;
  identityInfoId: string;
  vaccinationRegistryId: string;
  patientId: number;
  freeTestCount: number;
  personalInfo: PersonalInfo;
  parents: any[];
  child: string;
  contactInfo: ContactInfo;
  identityInfo: IdentityInfo;
  vaccinationRegistry: VaccinationRegistry;
  isPrimary: boolean;
}

export interface ContactInfo {
  createdDate: string;
  id: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  countryId: number;
  stateId: number;
  villageId: number;
  addressTypeId: number;
  medicaidContactObject: MedicaidContactObject;
  state: State;
  country: Country;
}

export interface Country {
  createdDate: string;
  id: number;
  code: string;
  code3: string;
  name: string;
  entryPermit: boolean;
}

export interface MedicaidContactObject {
  city: string;
  address: string;
  stateId: number;
  province: string;
  countryId: number;
  villageId: number;
  postalCode: string;
  addressTypeId: number;
}

export interface State {
  createdDate: string;
  id: number;
  code: string;
  name: string;
  countryId: number;
}

export interface IdentityInfo {
  createdDate: string;
  id: string;
  countryId: string;
  isResidentOfAmericanSamoa: string;
  isConfirmedResidentOfAmericanSamoa: string;
  identityProofStatus: string;
  residencyProofStatus: string;
  rejectedReasonIdentityProof: string;
  rejectedReasonResidencyProof: string;
  hasVisa: string;
  visaStatus: string;
  rejectedReasonVisa: string;
  visaUrl: string;
  reviewedVisaByUserId: string;
  reviewedVisaDate: string;
  governmentIdTypeId: number;
  idNo: string;
  privilegeTypeId: number;
  residentTypeId: string;
  residencyDocumentTypeId: number;
  identityProofUrl: string;
  residencyProofUrl: string;
  medicaidResidencyProofUrl: string;
  identityExpirationDate: string;
  residencyExpirationDate: string;
  reviewedIdentityDate: string;
  reviewedIdentityByUserId: string;
  reviewedResidencyDate: string;
  reviewedMedicaidResidencyDate: string;
  entryPermit: string;
  entryPermitUrl: string;
  entryPermitNo: string;
  entryPermitEffectiveDate: string;
  hasImmigrationId: boolean;
  immigrationIdNo: string;
  immigrationIdExpirationDate: string;
  immigrationIdProofUrl: string;
  reviewedResidencyByUserId: string;
  reviewedMedicaidResidencyByUserId: string;
  additionalDetail: string;
  requireAuthorizationToBoard: boolean;
  isRequestResidencyDoc: boolean;
  requestResidencyDocReason: string;
  medicaidResidencyObject: MedicaidResidencyObject;
  citizenshipCountryId: string;
  usualResidenceCountryId: string;
  country: string;
  governmentIdType: GovernmentIDType;
  privilegeType: GovernmentIDType;
  residentType: string;
  residencyDocumentType: GovernmentIDType;
}

export interface GovernmentIDType {
  createdDate: string;
  id: number;
  isDeleted?: boolean;
  key: string;
  name: string;
  order?: number;
  industryId?: number;
}

export interface MedicaidResidencyObject {
  countryId: string;
  privilegeTypeId: number;
  additionalDetail: string;
  governmentIdTypeId: number;
  residencyDocumentTypeId: number;
}

export interface PersonalInfo {
  createdDate: string;
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  birthDate: string;
  genderId: number;
  relationshipId: number;
  ethnicId: number;
  raceId: number;
  industryId: number;
  occupationId: number;
  haveMedicaid: boolean;
  medicaidMemberId: string;
  medicaidStatus: string;
  rejectedReasonMedicaid: string;
  reviewedMedicaidByUserId: string;
  reviewedMedicaidDate: string;
  powerOfAttorneyConsentFormUrl: string;
  birthCertificateUrl: string;
  attorneyConsentFormStatus: string;
  birthCertificateStatus: string;
  rejectedReasonAttorneyConsentForm: string;
  rejectedReasonBirthCertificate: string;
  reviewedAttorneyConsentFormDate: string;
  reviewedBirthCertificateDate: string;
  otherRace: string;
  reviewedAttorneyConsentFormByUserId: string;
  reviewedBirthCertificateByUserId: string;
  gender: GovernmentIDType;
  relationship: GovernmentIDType;
  occupation: GovernmentIDType;
  ethnic: GovernmentIDType;
  race: GovernmentIDType;
  industry: GovernmentIDType;
  firstAndLastName: string;
}

export interface VaccinationRegistry {
  createdDate: string;
  id: string;
  patientNumber: string;
  submissionDate: string;
  doses: Dose[];
  boosterDoses: any[];
  status: string;
  vaccinationDate: string;
  issueDate: string;
  rejectedReason: string;
  cardFileUrl: string;
  confirmedType: string;
  vaccineProductId: number;
  reviewedByUserId: string;
  reviewedDate: string;
  otherVaccineName: string;
  vaccineProduct: VaccineProduct;
}

export interface Dose {
  healthcareProOrClinicSite: string;
  manufacturerLotNumber: string;
  vaccinationDate: string;
}

export interface VaccineProduct {
  createdDate: string;
  id: number;
  name: string;
  key: string;
  description: string;
  numberDose: number;
  daysBetweenDose: number;
}
