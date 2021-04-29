package com.reactnativeahca

import android.graphics.Color
import com.ahca.sts.STShield
import com.ahca.sts.listener.*
import com.ahca.sts.models.SignImgSetting
import com.ahca.sts.models.StsCompanyInfo
import com.ahca.sts.models.StsUserInfo
import com.alibaba.fastjson.JSON
import com.facebook.react.bridge.*

class AhcaModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String {
    return "Ahca"
  }

  /**
   * 配置服务地址、项目授权
   */
  @ReactMethod
  fun init(url: String, appKey: String, secretKey: String) {
    STShield.getInstance().init(reactApplicationContext, url, appKey, secretKey);
  }

  /**
   * 配置用户标识
   */
  @ReactMethod
  fun initUseId(userId: String) {
    STShield.getInstance().initUseId(reactApplicationContext, userId);
  }

  /**
   * 配置活体检测授权
   */
  @ReactMethod
  fun initFace(faceLicenseID: String, faceLicenseFileName: String) {
    STShield.getInstance().initFace(reactApplicationContext, faceLicenseID, faceLicenseFileName);
  }

  /**
   * 配置主题色
   */
  @ReactMethod
  fun initThemeColor(color: String) {
    STShield.getInstance().initThemeColor(reactApplicationContext, Color.parseColor(color));
  }

  /**
   * 获取设备唯一标识
   */
  @ReactMethod
  fun getDeviceID(promise: Promise) {
    val deviceID = STShield.getInstance().getDeviceID(reactApplicationContext);
    promise.resolve(deviceID);
  }

  /**
   * 查询本地证书是否存在
   */
  @ReactMethod
  fun isLocalCertExist(promise: Promise) {
    val localCertExist = STShield.getInstance().isLocalCertExist(reactApplicationContext);
    promise.resolve(localCertExist);
  }

  /**
   * 检查证书状态是否正常
   */
  @ReactMethod
  fun checkCert(promise: Promise) {
    STShield.getInstance().checkCert(reactApplicationContext.currentActivity, OnCheckCertListener { commonResult ->
        Utils.commonResponseHandle(promise, commonResult);
    });
  }

  /**
   * 申请个人证书
   */
  @ReactMethod
  fun applyPersonalCert(userInfo: ReadableMap, promise: Promise) {
    val stsUserInfo = JSON.toJavaObject(JSON.parseObject(JSON.toJSONString(userInfo.toHashMap())), StsUserInfo::class.java);
    STShield.getInstance().applyPersonalCert(reactApplicationContext.currentActivity, stsUserInfo, OnApplyCertResult { applyCertResult ->
      Utils.commonResponseHandle(promise, applyCertResult);
    });
  }

  /**
   * 申请企业证书
   */
  @ReactMethod
  fun applyCompanyCert(companyInfo: ReadableMap, promise: Promise) {
    val stsCompanyInfo = JSON.toJavaObject(JSON.parseObject(JSON.toJSONString(companyInfo.toHashMap())), StsCompanyInfo::class.java);
    STShield.getInstance().applyCompanyCert(reactApplicationContext.currentActivity, stsCompanyInfo, OnApplyCertResult { applyCertResult ->
      Utils.commonResponseHandle(promise, applyCertResult);
    });
  }

  /**
   * 获取更换设备二维码
   */
  @ReactMethod
  fun getUntieEquipmentQRcode(promise: Promise) {
    STShield.getInstance().getUntieEquipmentQRcode(reactApplicationContext.currentActivity, OnGetQRcodeResult { getQRcodeResult ->
      Utils.commonResponseHandle(promise, getQRcodeResult);
    });
  }

  /**
   * 更换设备
   */
  @ReactMethod
  fun untieEquipment(qrData: String, promise: Promise) {
    STShield.getInstance().untieEquipment(reactApplicationContext.currentActivity, qrData, OnApplyCertResult { applyCertResult ->
      Utils.commonResponseHandle(promise, applyCertResult);
    });
  }

  /**
   * 更新个人证书
   */
  @ReactMethod
  fun updatePersonalCert(userInfo: ReadableMap, promise: Promise) {
    val stsUserInfo = JSON.toJavaObject(JSON.parseObject(JSON.toJSONString(userInfo.toHashMap())), StsUserInfo::class.java);
    STShield.getInstance().updatePersonalCert(reactApplicationContext.currentActivity, stsUserInfo, OnUpdateCertResult { commonResult ->
      Utils.commonResponseHandle(promise, commonResult);
    });
  }

  /**
   * 更新企业证书
   */
  @ReactMethod
  fun updateCompanyCert(companyInfo: ReadableMap, promise: Promise) {
    val stsCompanyInfo = JSON.toJavaObject(JSON.parseObject(JSON.toJSONString(companyInfo.toHashMap())), StsCompanyInfo::class.java);
    STShield.getInstance().updateCompanyCert(reactApplicationContext.currentActivity, stsCompanyInfo, OnUpdateCertResult { commonResult ->
      Utils.commonResponseHandle(promise, commonResult);
    });
  }

  /**
   * 重置个人证书PIN码
   */
  @ReactMethod
  fun resetPersonalPIN(userInfo: ReadableMap, promise: Promise) {
    val stsUserInfo = JSON.toJavaObject(JSON.parseObject(JSON.toJSONString(userInfo.toHashMap())), StsUserInfo::class.java);
    STShield.getInstance().resetPersonalPIN(reactApplicationContext.currentActivity, stsUserInfo, OnResetPinResult { commonResult ->
      Utils.commonResponseHandle(promise, commonResult);
    });
  }

  /**
   * 重置企业证书PIN码
   */
  @ReactMethod
  fun resetCompanyPIN(companyInfo: ReadableMap, promise: Promise) {
    val stsCompanyInfo = JSON.toJavaObject(JSON.parseObject(JSON.toJSONString(companyInfo.toHashMap())), StsCompanyInfo::class.java);
    STShield.getInstance().resetCompanyPIN(reactApplicationContext.currentActivity, stsCompanyInfo, OnResetPinResult { commonResult ->
      Utils.commonResponseHandle(promise, commonResult);
    });
  }

  /**
   * 修改证书PIN码
   */
  @ReactMethod
  fun modifyPIN(promise: Promise) {
    STShield.getInstance().modifyPIN(reactApplicationContext.currentActivity, OnModifyPinResult { commonResult ->
      Utils.commonResponseHandle(promise, commonResult);
    });
  }

  /**
   * 证书登录
   */
  @ReactMethod
  fun certLogin(data: String, dataFormat: String, dataType: String, pn: String, promise: Promise) {
    STShield.DATA_FORMAT_P1
    STShield.getInstance().certLogin(reactApplicationContext.currentActivity, data, dataFormat, dataType, pn, OnCertLoginResult { certLoginResult ->
      Utils.commonResponseHandle(promise, certLoginResult);
    });
  }

  /**
   * 证书签章
   */
  @ReactMethod
  fun certSeal(pn: String, promise: Promise) {
    STShield.getInstance().certSeal(reactApplicationContext.currentActivity, pn, OnCertSealResult { certSealResult ->
      Utils.commonResponseHandle(promise, certSealResult);
    });
  }

  /**
   * 证书签名
   */
  @ReactMethod
  fun certSign(data: String, dataFormat: String, dataType: String, pn: String, promise: Promise) {
    STShield.getInstance().certSign(reactApplicationContext.currentActivity, data, dataFormat, dataType, pn, OnCertSignResult { certSignResult ->
      Utils.commonResponseHandle(promise, certSignResult);
    });
  }

  /**
   * 证书验签
   */
  @ReactMethod
  fun certVerifySign(data: String, dataFormat: String, signData: String, dataType: String, promise: Promise) {
    STShield.getInstance().certVerifySign(reactApplicationContext.currentActivity, data, dataFormat, signData, dataType, OnCertVerifySignResult { commonResult ->
      Utils.commonResponseHandle(promise, commonResult);
    });
  }

  /**
   * 证书加密
   */
  @ReactMethod
  fun certEncrypt(data: String, dataFormat: String, dataType: String, promise: Promise) {
    STShield.getInstance().certEncrypt(reactApplicationContext.currentActivity, data, dataFormat, dataType, OnCertEncryptResult { certEncryptResult ->
      Utils.commonResponseHandle(promise, certEncryptResult);
    });
  }

  /**
   * 证书解密
   */
  @ReactMethod
  fun certDecrypt(decData: String, dataFormat: String, dataType: String, pn: String, promise: Promise) {
    STShield.getInstance().certDecrypt(reactApplicationContext.currentActivity, decData, dataFormat, dataType, pn, OnCertDecryptResult { certDecryptResult ->
      Utils.commonResponseHandle(promise, certDecryptResult);
    });
  }

  /**
   * 变更证书状态
   */
  @ReactMethod
  fun changeCertStatus(statusType: Int, promise: Promise) {
    STShield.getInstance().changeCertStatus(reactApplicationContext.currentActivity, statusType, OnChangeCertStatusResult { commonResult ->
      Utils.commonResponseHandle(promise, commonResult);
    });
  }

  /**
   * 延期证书
   */
  @ReactMethod
  fun postponeCert(promise: Promise) {
    STShield.getInstance().postponeCert(reactApplicationContext.currentActivity, OnPostponeCertResult { commonResult ->
      Utils.commonResponseHandle(promise, commonResult);
    });
  }

  /**
   * 修改PIN缓存时间
   */
  @ReactMethod
  fun setPrivateKeyCacheTime(pn: String, promise: Promise) {
    STShield.getInstance().setPKCacheTime(reactApplicationContext.currentActivity, pn, OnPKCacheTimeResult {pkCacheResult ->
      Utils.commonResponseHandle(promise, pkCacheResult);
    });
  }

  /**
   * 清除PIN缓存时间
   */
  @ReactMethod
  fun clearPKCacheTime(pn: String, promise: Promise) {
    STShield.getInstance().clearPKCacheTime(reactApplicationContext.currentActivity, pn, OnPKCacheTimeResult {pkCacheResult ->
      Utils.commonResponseHandle(promise, pkCacheResult);
    });
  }

  /**
   * 保存签名图片（弹出签名面板）
   */
  @ReactMethod
  fun setSignImgWithDrawingBoard(signImgSetting: ReadableMap, promise: Promise) {
    val mSignImgSetting = JSON.toJavaObject(JSON.parseObject(JSON.toJSONString(signImgSetting.toHashMap())), SignImgSetting::class.java);
    STShield.getInstance().setSignImgWithDrawingBoard(reactApplicationContext.currentActivity, mSignImgSetting, OnSignImgResult { signImgResult ->
      Utils.commonResponseHandle(promise, signImgResult);
    });
  }

  /**
   * 获取/保存签名图片（永久性数据）
   */
  @ReactMethod
  fun getSignImgAndSetItIfNotExist(signImgSetting: ReadableMap, promise: Promise) {
    val mSignImgSetting = JSON.toJavaObject(JSON.parseObject(JSON.toJSONString(signImgSetting.toHashMap())), SignImgSetting::class.java);
    STShield.getInstance().getSignImgAndSetItIfNotExist(reactApplicationContext.currentActivity, mSignImgSetting, OnSignImgResult { signImgResult ->
      Utils.commonResponseHandle(promise, signImgResult);
    });
  }

  /**
   * 获取签名图片（永久性数据）
   */
  @ReactMethod
  fun getSignImgFromService(promise: Promise) {
    STShield.getInstance().getSignImgFromService(reactApplicationContext.currentActivity, OnSignImgResult { signImgResult ->
      Utils.commonResponseHandle(promise, signImgResult);
    });
  }

  /**
   * 获取签名图片（一次性数据）
   */
  @ReactMethod
  fun getSignImgWithDrawingBoard(signImgSetting: ReadableMap, promise: Promise) {
    val mSignImgSetting = JSON.toJavaObject(JSON.parseObject(JSON.toJSONString(signImgSetting.toHashMap())), SignImgSetting::class.java);
    STShield.getInstance().getSignImgWithDrawingBoard(reactApplicationContext.currentActivity, mSignImgSetting, OnSignImgResult { signImgResult ->
      Utils.commonResponseHandle(promise, signImgResult);
    });
  }

  /**
   * 获取证书
   */
  @ReactMethod
  fun getCert(certType: Int, promise: Promise) {
    STShield.getInstance().getCert(reactApplicationContext.currentActivity, certType, OnGetCertResult { getCertResult ->
      Utils.commonResponseHandle(promise, getCertResult);
    });
  }

  /**
   * 获取单位编号列表
   */
  @ReactMethod
  fun getDepartmentNo(promise: Promise) {
    STShield.getInstance().getDepartmentNo(reactApplicationContext.currentActivity, OnGetDepartmentNoResult { getDepartmentNoResult ->
      Utils.commonResponseHandle(promise, getDepartmentNoResult);
    });
  }

  /**
   * 下载预制证书
   */
  @ReactMethod
  fun downloadCert(phoneNum: String, departmentNo: String, certType: Int, promise: Promise) {
    STShield.getInstance().downloadCert(reactApplicationContext.currentActivity, phoneNum, departmentNo, certType, OnGetCertResult { getCertResult ->
      Utils.commonResponseHandle(promise, getCertResult);
    });
  }

  /**
   * 清理本地证书
   */
  @ReactMethod
  fun clearCert(promise: Promise) {
    val clearCert = STShield.getInstance().clearCert(reactApplicationContext);
    Utils.commonResponseHandle(promise, clearCert);
  }

  /**
   * 查询生物识别启用状态
   */
  @ReactMethod
  fun getFingerprintStatus(promise: Promise) {
    val fingerprintStatus = STShield.getInstance().getFingerprintStatus(reactApplicationContext.currentActivity);
    promise.resolve(fingerprintStatus)
  }

  /**
   * 开启/关闭生物识别
   */
  @ReactMethod
  fun openFingerprint(open: Boolean, promise: Promise) {
    val fingerprintStatus = STShield.getInstance().openFingerprint(reactApplicationContext.currentActivity, open, OnFingerprintResult { commonResult ->
      Utils.commonResponseHandle(promise, commonResult);
    });
  }
}
