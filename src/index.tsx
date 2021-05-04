import { NativeModules, Platform } from 'react-native';
import type {
  AhcaType,
  ApplyCertResult,
  CompanyInfo,
  SignImgSetting,
  UserInfo,
  SignImgResult,
} from './types';

export * from './types';

const { Ahca } = NativeModules;

function platformApi(
  apiNames: (keyof AhcaType)[] = [],
  supportPlatform: string[] = []
) {
  return apiNames.reduce((previousValue, currentValue) => {
    return {
      ...previousValue,
      [currentValue]() {
        if (!supportPlatform.includes(Platform.OS)) {
          return Promise.reject('当前平台不支持此接口');
        }
        return Ahca[currentValue](...arguments);
      },
    };
  }, {});
}

/**
 * 安卓/ios返回值抹平差异
 */
function commonResultAdapter(api: AhcaType): AhcaType {
  return Object.keys(api).reduce((previousValue, currentValue) => {
    return {
      ...previousValue,
      async [currentValue]() {
        const result = await (api as any)[currentValue](...arguments);
        if (result?.rtnCode) {
          result.resultCode = Number(result.rtnCode);
          delete result.rtnCode;
        }
        if (result?.rtnMsg) {
          result.resultMsg = result.rtnMsg;
          delete result.rtnMsg;
        }
        return result;
      },
    };
  }, {}) as AhcaType;
}

/**
 * 证书结果适配
 * @param result
 */
function applyCertResultAdapter(result: any): ApplyCertResult {
  if (Platform.OS === 'android') {
    if (result.stsUserInfo) {
      result.stsUserInfo = JSON.parse(result.stsUserInfo);
    }
    if (result.stsCertInfo) {
      result.stsCertInfo = JSON.parse(result.stsCertInfo);
    }
  }
  return result;
}

/**
 * 证书结果适配
 * @param result
 */
function signImgResultAdapter(result: any): SignImgResult {
  if (Platform.OS === 'ios') {
    if (result.base64) {
      result.signImg = result.base64;
      delete result.base64;
    }
  }
  return result;
}

export default commonResultAdapter({
  ...Ahca,
  ...platformApi(
    [
      'initThemeColor',
      'checkCert',
      'updateCompanyCert',
      'modifyPIN',
      'setPrivateKeyCacheTime',
      'getDepartmentNo',
      'downloadCert',
      'getFingerprintStatus',
      'openFingerprint',
    ],
    ['android']
  ),
  async applyPersonalCert(
    userInfo: Partial<UserInfo>
  ): Promise<ApplyCertResult> {
    let result = await Ahca.applyPersonalCert(userInfo);
    return applyCertResultAdapter(result);
  },
  async applyCompanyCert(
    companyInfo: Partial<CompanyInfo>
  ): Promise<ApplyCertResult> {
    let result = await Ahca.applyCompanyCert(companyInfo);
    return applyCertResultAdapter(result);
  },
  async setSignImgWithDrawingBoard(
    signImgSetting: Partial<SignImgSetting>
  ): Promise<SignImgResult> {
    let result = await Ahca.setSignImgWithDrawingBoard(signImgSetting);
    return signImgResultAdapter(result);
  },
  async getSignImgAndSetItIfNotExist(
    signImgSetting: Partial<SignImgSetting>
  ): Promise<SignImgResult> {
    let result = await Ahca.getSignImgAndSetItIfNotExist(signImgSetting);
    return signImgResultAdapter(result);
  },
  async getSignImgFromService(): Promise<SignImgResult> {
    let result = await Ahca.getSignImgFromService();
    return signImgResultAdapter(result);
  },
  async getSignImgWithDrawingBoard(
    signImgSetting: Partial<SignImgSetting>
  ): Promise<SignImgResult> {
    let result = await Ahca.getSignImgWithDrawingBoard(signImgSetting);
    return signImgResultAdapter(result);
  },
}) as AhcaType;
