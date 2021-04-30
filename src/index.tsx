import { NativeModules, Platform } from 'react-native';
import type { AhcaType, ApplyCertResult, CompanyInfo, UserInfo } from './types';

export * from './types';

const { Ahca } = NativeModules;

function platformApi(apiNames: string[] = [], supportPlatform: string[] = []) {
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
  return api;
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
}) as AhcaType;
