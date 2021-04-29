export type String = string;
export type Boolean = boolean;

export interface UserInfo {
  departmentNo: string;
  userName: string;
  cardType: CardType;
  cardNum: string;
  phoneNum: string;
  userCity: string;
  userEmail: string;
  certExt2: string;
  certExt3: string;
  certExt4: string;
}

export interface CompanyInfo {
  departmentNo: string;
  companyName: string;
  companyNo: string;
  userName: string;
  cardNum: string;
  phoneNum: string;
  userEmail: string;
  certExt2: string;
  certExt3: string;
  certExt4: string;
}

export interface SignImgSetting {
  userOrientation: Orientation;
  paintStrokeWidth: number;
  imgBackgroundColor: number;
  paintColor: number;
  standardWidth: number;
  standardHeight: number;
}

export interface CertInfo {
  publicKey: string;
  notBefore: string;
  certAlgorithm: string;
  certSN: string;
  subjectEXT: any;
  subjectDN: any;
  notAfter: string;
  issuerDN: any;
  keyUsage: string;
  version: string;
}

export interface VHInfo {
  userName: string;
  certOu: string;
  certO: string;
  certS: string;
  certL: string;
  certE: string;
  certExt2: string;
  certExt3: string;
  certExt4: string;
}

export interface Department {
  departmentNo: string;
  departmentName: string;
}

/**************************************** Params *******************************************/

export enum CardType {
  CARD_TYPE_ID_CARD = '00',
  CARD_TYPE_TEMPORARY_ID_CARD = '01',
  CARD_TYPE_HOUSEHOLD_REGISTER = '02',
  CARD_TYPE_PASSPORT = '03',
  CARD_TYPE_MILITARY_ID_CARD = '04',
  CARD_TYPE_ARMED_POLICE_ID_CARD = '05',
  CARD_TYPE_ID_CARD_NAME = '身份证',
  CARD_TYPE_TEMPORARY_ID_CARD_NAME = '临时身份证',
  CARD_TYPE_HOUSEHOLD_REGISTER_NAME = '户口本',
  CARD_TYPE_PASSPORT_NAME = '护照',
  CARD_TYPE_MILITARY_ID_CARD_NAME = '军人身份证',
  CARD_TYPE_ARMED_POLICE_ID_CARD_NAME = '武警身份证',
}

export enum DataFormat {
  DATA_FORMAT_P1 = 'p1',
  DATA_FORMAT_P7 = 'p7',
  DATA_FORMAT_P7_ENVELOPE = 'p7envelope',
  DATA_FORMAT_DEFAULT = 'default',
}

export enum DataType {
  DATA_TYPE_ORIGINAL_TO_HEXADECIMAL = '0',
  DATA_TYPE_BYTE_BY_HEXADECIMAL = '1',
  DATA_TYPE_CHINESE_TO_HEXADECIMAL = '2',
  DATA_TYPE_ORIGINAL = '3',
  DATA_TYPE_BYTE_BY_BASE64 = '4',
}

export enum StatusType {
  CERT_STATUS_TYPE_FREEZE = 1,
  CERT_STATUS_TYPE_UNFREEZE = 2,
  CERT_STATUS_TYPE_REVOKE = 3,
}

export enum Orientation {
  ORIENTATION_AUTO = 1,
  ORIENTATION_LANDSCAPE = 2,
  ORIENTATION_PORTRAIT = 3,
}

export enum CertType {
  CERT_TYPE_SIGNCERT = 1,
  CERT_TYPE_ENCCERT = 2,
}

/**************************************** Ressult *******************************************/

export interface CommonResult {
  resultCode: number;
  resultMsg: string;
}

export interface ApplyCertResult extends CommonResult {
  enCert: string;
  signCert: string;
  stsCertInfo: CertInfo;
  stsUserInfo: UserInfo;
  stsCompanyInfo: CompanyInfo;
  stsVHInfo: VHInfo;
}

export interface GetQRcodeResult extends CommonResult {
  enCeqrCodert: string;
}

export interface CertLoginResult extends CommonResult {
  signData: string;
  signCert: string;
  token: string;
}

export interface CertSealResult extends CommonResult {
  token: string;
}

export type CertSignResult = CertLoginResult;

export interface CertEncryptResult extends CommonResult {
  encryptData: string;
}

export interface CertDecryptResult extends CommonResult {
  decryptData: string;
}

export interface SignImgResult extends CommonResult {
  signImg: any[];
}

export interface GetCertResult extends CommonResult {
  enCert: string;
  signCert: string;
  stsCertInfo: CertInfo;
}

export interface GetDepartmentNoResult extends CommonResult {
  departmentList: Department[];
}

export type PKCacheResult = CertSealResult;
