import { NativeModules } from 'react-native';
import type {
  String,
  Boolean,
  ApplyCertResult,
  CertLoginResult,
  CommonResult,
  CompanyInfo,
  UserInfo,
  CertDecryptResult,
  CertEncryptResult,
  CertSealResult,
  CertSignResult,
  GetQRcodeResult,
  SignImgSetting,
  GetCertResult,
  GetDepartmentNoResult,
  PKCacheResult,
  SignImgResult,
  CertType,
  DataFormat,
  DataType,
  StatusType,
} from './types';

export * from './types';

type AhcaType = {
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

const { Ahca } = NativeModules;

export default Ahca as AhcaType;
