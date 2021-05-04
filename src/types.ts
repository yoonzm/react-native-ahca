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
  imgBackgroundColor: string;
  paintColor: string;
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

/**************************************** AhcaType *******************************************/

export type AhcaType = {
  /**
   * 配置服务地址、项目授权
   * @param url
   * @param appKey
   * @param secretKey
   */
  init(url: String, appKey: String, secretKey: String): void;
  /**
   * 配置用户标识
   * @param userId
   */
  initUseId(userId: String): void;
  /**
   * 配置活体检测授权
   */
  initFace(faceLicenseID: String, faceLicenseFileName: String): void;
  /**
   * 配置主题色
   * @supported android
   */
  initThemeColor(color: String): void;
  /**
   * 获取设备唯一标识
   */
  getDeviceID(): Promise<string>;
  /**
   * 查询本地证书是否存在
   */
  isLocalCertExist(): Promise<boolean>;
  /**
   * 检查证书状态是否正常
   * @supported android
   */
  checkCert(): Promise<CommonResult>;
  /**
   * 申请个人证书
   */
  applyPersonalCert(userInfo: Partial<UserInfo>): Promise<ApplyCertResult>;
  /**
   * 申请企业证书
   */
  applyCompanyCert(companyInfo: Partial<CompanyInfo>): Promise<ApplyCertResult>;
  /**
   * 获取更换设备二维码
   */
  getUntieEquipmentQRcode(): Promise<GetQRcodeResult>;
  /**
   * 更换设备
   */
  untieEquipment(qrData: String): Promise<ApplyCertResult>;
  /**
   * 更新个人证书
   */
  updatePersonalCert(userInfo: Partial<UserInfo>): Promise<CommonResult>;
  /**
   * 更新企业证书
   * @supported android
   */
  updateCompanyCert(companyInfo: Partial<CompanyInfo>): Promise<CommonResult>;
  /**
   * 重置个人证书PIN码
   */
  resetPersonalPIN(userInfo: Partial<UserInfo>): Promise<CommonResult>;
  /**
   * 重置企业证书PIN码
   */
  resetCompanyPIN(companyInfo: Partial<CompanyInfo>): Promise<CommonResult>;
  /**
   * 修改证书PIN码
   * @supported android
   */
  modifyPIN(): Promise<CommonResult>;
  /**
   * 证书登录
   */
  certLogin(
    data: String,
    dataFormat: DataFormat,
    dataType: DataType,
    pn: String
  ): Promise<CertLoginResult>;
  /**
   * 证书签章
   */
  certSeal(pn: String): Promise<CertSealResult>;
  /**
   * 证书签名
   */
  certSign(
    data: String,
    dataFormat: DataFormat,
    dataType: DataType,
    pn: String
  ): Promise<CertSignResult>;
  /**
   * 证书验签
   */
  certVerifySign(
    data: String,
    dataFormat: DataFormat,
    signData: String,
    dataType: DataType
  ): Promise<CommonResult>;
  /**
   * 证书加密
   */
  certEncrypt(
    data: String,
    dataFormat: DataFormat,
    dataType: DataType
  ): Promise<CertEncryptResult>;
  /**
   * 证书解密
   */
  certDecrypt(
    decData: String,
    dataFormat: DataFormat,
    dataType: DataType,
    pn: String
  ): Promise<CertDecryptResult>;
  /**
   * 变更证书状态
   */
  changeCertStatus(statusType: StatusType): Promise<CommonResult>;
  /**
   * 延期证书
   */
  postponeCert(): Promise<CommonResult>;
  /**
   * 修改PIN缓存时间
   * @supported android
   */
  setPrivateKeyCacheTime(pn: String): Promise<PKCacheResult>;
  /**
   * 清除PIN缓存时间
   */
  clearPKCacheTime(pn: String): Promise<PKCacheResult>;
  /**
   * 保存签名图片（弹出签名面板）
   */
  setSignImgWithDrawingBoard(
    signImgSetting: Partial<SignImgSetting>
  ): Promise<SignImgResult>;
  /**
   * 获取/保存签名图片（永久性数据）
   */
  getSignImgAndSetItIfNotExist(
    signImgSetting: Partial<SignImgSetting>
  ): Promise<SignImgResult>;
  /**
   * 获取签名图片（永久性数据）
   */
  getSignImgFromService(): Promise<SignImgResult>;
  /**
   * 获取签名图片（一次性数据）
   */
  getSignImgWithDrawingBoard(
    signImgSetting: Partial<SignImgSetting>
  ): Promise<SignImgResult>;
  /**
   * 获取证书
   */
  getCert(certType: CertType): Promise<GetCertResult>;
  /**
   * 获取单位编号列表
   * @supported android
   */
  getDepartmentNo(): Promise<GetDepartmentNoResult>;
  /**
   * 下载预制证书
   * @supported android
   */
  downloadCert(
    phoneNum: String,
    departmentNo: String,
    certType: CertType
  ): Promise<GetCertResult>;
  /**
   * 清理本地证书
   */
  clearCert(): Promise<CommonResult>;
  /**
   * 查询生物识别启用状态
   * @supported android
   */
  getFingerprintStatus(): Promise<boolean>;
  /**
   * 开启/关闭生物识别
   * @supported android
   */
  openFingerprint(open: Boolean): Promise<CommonResult>;
};
