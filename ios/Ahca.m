#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(Ahca, NSObject)

RCT_EXTERN_METHOD(multiply:(float)a
                  withB:(float)b
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(init:(NSString)url
                  withAppKey:(NSString)appKey
                  withSecretKey:(NSString)secretKey)

RCT_EXTERN_METHOD(initUseId:(NSString)userId)

// 配置活体检测授权
RCT_EXTERN_METHOD(initFace:(NSDictionary)withLicenseId
                  withLicenseName:(NSString)licenseName
                  withLicenseSuffix:(NSString)licenseSuffix)

// 获取设备唯一标识
RCT_EXTERN_METHOD(getDeviceID:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

// 查询本地证书是否存在
RCT_EXTERN_METHOD(isLocalCertExist:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)


// 申请个人证书
RCT_EXTERN_METHOD(applyPersonalCert:(NSDictionary)userInfo
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

// 申请企业证书
RCT_EXTERN_METHOD(applyCompanyCert:(NSDictionary)companyInfo
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

/**
 * 获取更换设备二维码
 */
RCT_EXTERN_METHOD(getUntieEquipmentQRcode:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

/**
 * 更换设备
 */
RCT_EXTERN_METHOD(untieEquipment:(NSString)qrData
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

// 更新个人证书
RCT_EXTERN_METHOD(updatePersonalCert:(NSDictionary)userInfo
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

// 重置个人证书PIN码
RCT_EXTERN_METHOD(resetPersonalPIN:(NSDictionary)userInfo
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

// 重置企业证书PIN码
RCT_EXTERN_METHOD(resetCompanyPIN:(NSDictionary)companyInfo
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

// 证书登录
RCT_EXTERN_METHOD(certLogin:(NSString)data
                  withDataFormat:(NSString)dataFormat
                  withDataType:(NSString)dataType
                  witPn:(NSString)pn
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

// 证书签章
RCT_EXTERN_METHOD(certSeal:(NSString)pn
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

// 证书签名
RCT_EXTERN_METHOD(certSign:(NSString)data
                  withDataFormat:(NSString)dataFormat
                  withDataType:(NSString)dataType
                  witPn:(NSString)pn
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

// 证书验签
RCT_EXTERN_METHOD(certVerifySign:(NSString)data
                  withDataFormat:(NSString)dataFormat
                  witSignData:(NSString)signData
                  withDataType:(NSString)dataType
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

// 证书加密
RCT_EXTERN_METHOD(certEncrypt:(NSString)data
                  withDataFormat:(NSString)dataFormat
                  withDataType:(NSString)dataType
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

// 证书解密
RCT_EXTERN_METHOD(certDecrypt:(NSString)data
                  withDataFormat:(NSString)dataFormat
                  withDataType:(NSString)dataType
                  witPn:(NSString)pn
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

// 变更证书状态
RCT_EXTERN_METHOD(changeCertStatus:(NSInteger)statusType
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

// 延期证书
RCT_EXTERN_METHOD(postponeCert:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

// 清除PIN缓存时间
RCT_EXTERN_METHOD(clearPKCacheTime:(NSInteger)pn
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

/**
 * 保存签名图片（弹出签名面板）
 */
RCT_EXTERN_METHOD(setSignImgWithDrawingBoard:(NSDictionary)signImgSetting
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

/**
 * 获取/保存签名图片（永久性数据）
 */
RCT_EXTERN_METHOD(getSignImgAndSetItIfNotExist:(NSDictionary)signImgSetting
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

/**
 * 获取签名图片（永久性数据）
 */
RCT_EXTERN_METHOD(getSignImgFromService:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

/**
 * 获取签名图片（一次性数据）
 */
RCT_EXTERN_METHOD(getSignImgWithDrawingBoard:(NSDictionary)signImgSetting
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

/**
 * 获取证书
 */
RCT_EXTERN_METHOD(getCert:(NSString)certType
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

/**
 * 清理本地证书
 */
RCT_EXTERN_METHOD(clearCert:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)


@end
