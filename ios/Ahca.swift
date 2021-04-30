@objc(Ahca)
class Ahca: NSObject, CertDelegate {
    func certDictionary(_ dictionary: [AnyHashable : Any]!) {
        print(#function, dictionary ?? {})
        if self.resolve != nil {
            self.resolve!(dictionary)
        }
    }
    
    private var userId: String = "";
    private var resolve: RCTPromiseResolveBlock?;
    private var reject: RCTPromiseRejectBlock?;

    @objc(multiply:withB:withResolver:withRejecter:)
    func multiply(a: Float, b: Float, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        resolve(a*b)
    }
    
    @objc(init:withAppKey:withSecretKey:)
    func `init`(url: String, appKey: String, secretKey: String) -> Void {
        AXUserInfo.sharedInstance()?.app(withApp_key: appKey, secretKey: secretKey, baseURL: url)
    }
    
    @objc(initUseId:)
    func initUseId(userId: String) -> Void {
        self.userId = userId;
    }
    
    @objc(initFace:withLicenseName:withLicenseSuffix:)
    func initFace(licenseId: String, licenseName: String, licenseSuffix: String) -> Void {
        AXUserInfo.sharedInstance()?.face(withLicenseName: licenseName, licenseSuffix: licenseSuffix, licenseId: licenseId)
    }
    
    @objc(getDeviceID:withRejecter:)
    func getDeviceID(resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        resolve(AXUserInfo.getPhone_IDFV)
    }
    
    @objc(isLocalCertExist:withRejecter:)
    func isLocalCertExist(resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        let isExist = AXUserInfo.sharedInstance()?.isExistCert(withUserID: userId);
        resolve(isExist)
    }
    
    @objc(applyPersonalCert:withResolver:withRejecter:)
    func applyPersonalCert(userInfo: NSDictionary, resolve:@escaping RCTPromiseResolveBlock,reject:@escaping RCTPromiseRejectBlock) -> Void {
        self.resolve = resolve
        self.reject = reject
        
        let user_name = userInfo["userName"] as? String;
        let card_num = userInfo["cardNum"] as? String;
        let phone_num = userInfo["phoneNum"] as? String;
        let user_city = userInfo["userCity"] as? String;
        let user_email = userInfo["userEmail"] as? String;
        let cert_ext2 = userInfo["certExt2"] as? String;
        let cert_ext3 = userInfo["certExt3"] as? String;
        let cert_ext4 = userInfo["certExt4"] as? String;
        AXUserInfo.sharedInstance()?.apply(
            withPersonUserID: userId,
            user_name: user_name,
            card_num: card_num,
            phone_num: phone_num,
            card_type: CardType.IDCard, // TODO
            user_city: user_city,
            user_email: user_email,
            cert_ext2: cert_ext2,
            cert_ext3: cert_ext3,
            cert_ext4: cert_ext4,
            delegate: self)
    }
    
    @objc(applyCompanyCert:withResolver:withRejecter:)
    func applyCompanyCert(companyInfo: NSDictionary, resolve:@escaping RCTPromiseResolveBlock,reject:@escaping RCTPromiseRejectBlock) -> Void {
        self.resolve = resolve
        self.reject = reject
        
        let user_name = companyInfo["userName"] as? String;
        let legal_person = companyInfo["companyName"] as? String;
        let ent_register_no = companyInfo["companyNo"] as? String;
        let card_num = companyInfo["cardNum"] as? String;
        let phone_num = companyInfo["phoneNum"] as? String;
        let user_email = companyInfo["userEmail"] as? String;
        let cert_ext2 = companyInfo["certExt2"] as? String;
        let cert_ext3 = companyInfo["certExt3"] as? String;
        let cert_ext4 = companyInfo["certExt4"] as? String;
        AXUserInfo.sharedInstance()?.apply(
            withENTUserID: userId,
            user_name: user_name,
            legal_person: legal_person,
            ent_register_no: ent_register_no,
            card_num: card_num,
            phone_num: phone_num,
            user_email: user_email,
            cert_ext2: cert_ext2,
            cert_ext3: cert_ext3,
            cert_ext4: cert_ext4,
            delegate: self)
    }
    
    @objc(getUntieEquipmentQRcode:withRejecter:)
    func getUntieEquipmentQRcode(resolve:@escaping RCTPromiseResolveBlock, reject:@escaping RCTPromiseRejectBlock) -> Void {
        AXUserInfo.sharedInstance()?.getQrcodeWithUserID(
            userId,
            success: {result in
                resolve(result)
            }, error: {error in
                reject("-1", error?.localizedDescription, error)
            })
    }
    
    @objc(untieEquipment:withResolver:withRejecter:)
    func untieEquipment(qrData: String, resolve:@escaping RCTPromiseResolveBlock,reject:@escaping RCTPromiseRejectBlock) -> Void {
        self.resolve = resolve
        self.reject = reject
        
        AXUserInfo.sharedInstance()?.untiePhone(withUserID: userId, qcCode: qrData, delegate: self)
    }
    
    @objc(updatePersonalCert:withResolver:withRejecter:)
    func updatePersonalCert(userInfo: NSDictionary, resolve:@escaping RCTPromiseResolveBlock,reject:@escaping RCTPromiseRejectBlock) -> Void {
        let user_name = userInfo["userName"] as? String;
        let phone_num = userInfo["phoneNum"] as? String;
        let user_city = userInfo["userCity"] as? String;
        let user_email = userInfo["userEmail"] as? String;
        AXUserInfo.sharedInstance()?.certUpdate(
            withUserID: userId,
            user_name: user_name,
            phone_num: phone_num,
            user_city: user_city,
            user_email: user_email,
            success: {result in
                resolve(result)
            }, error: {error in
                reject("-1", error?.localizedDescription, error)
            })
    }
    
    @objc(resetPersonalPIN:withResolver:withRejecter:)
    func resetPersonalPIN(userInfo: NSDictionary, resolve:@escaping RCTPromiseResolveBlock,reject:@escaping RCTPromiseRejectBlock) -> Void {
        let user_name = userInfo["userName"] as? String;
        let phone_num = userInfo["phoneNum"] as? String;
        let card_num = userInfo["cardNum"] as? String;
        AXUserInfo.sharedInstance()?.pinRest(
            withUserID: userId,
            user_name: user_name,
            ent_register_no: nil,
            card_type: CardType.IDCard,
            card_num: card_num,
            phone_num: phone_num)
    }
    
    @objc(resetCompanyPIN:withResolver:withRejecter:)
    func resetCompanyPIN(companyInfo: NSDictionary, resolve:@escaping RCTPromiseResolveBlock,reject:@escaping RCTPromiseRejectBlock) -> Void {
        let user_name = companyInfo["userName"] as? String;
        let ent_register_no = companyInfo["companyNo"] as? String;
        let phone_num = companyInfo["phoneNum"] as? String;
        let card_num = companyInfo["cardNum"] as? String;
        AXUserInfo.sharedInstance()?.pinRest(
            withUserID: userId,
            user_name: user_name,
            ent_register_no: ent_register_no,
            card_type: CardType.IDCard,
            card_num: card_num,
            phone_num: phone_num)
    }
    
    @objc(certLogin:withDataFormat:withDataType:witPn:withResolver:withRejecter:)
    func certLogin(data: String, dataFormat: String, dataType: String, pn: String, resolve:@escaping RCTPromiseResolveBlock,reject:@escaping RCTPromiseRejectBlock) -> Void {
        AXUserInfo.sharedInstance()?.passLoginMobile(
            withUserID: userId,
            data: data,
            pn: pn,
            data_type: DataType.DataInitial,
            success: {result in
                resolve(result)
            }, error: {error in
                reject("-1", error?.localizedDescription, error)
            })
    }
    
    @objc(certSeal:withResolver:withRejecter:)
    func certSeal(pn: String, resolve:@escaping RCTPromiseResolveBlock,reject:@escaping RCTPromiseRejectBlock) -> Void {
        AXUserInfo.sharedInstance()?.passCertSeal(
            withUserID: userId,
            data: nil,
            pn: pn,
            data_type: DataType.DataInitial,
            success: {result in
                resolve(result)
            }, error: {error in
                reject("-1", error?.localizedDescription, error)
            })
    }
    
    @objc(certSign:withDataFormat:withDataType:witPn:withResolver:withRejecter:)
    func certSign(data: String, dataFormat: String, dataType: String, pn: String, resolve:@escaping RCTPromiseResolveBlock,reject:@escaping RCTPromiseRejectBlock) -> Void {
        AXUserInfo.sharedInstance()?.passSign(
            withUserID: userId,
            data: data,
            pn: pn,
            data_type: DataType.DataInitial,
            success: {result in
                resolve(result)
            }, error: {error in
                reject("-1", error?.localizedDescription, error)
            })
    }
    
    @objc(certVerifySign:withDataFormat:witSignData:withDataType:withResolver:withRejecter:)
    func certVerifySign(data: String, dataFormat: String, signData: String, dataType: String, resolve:@escaping RCTPromiseResolveBlock,reject:@escaping RCTPromiseRejectBlock) -> Void {
        AXUserInfo.sharedInstance()?.verify(
            withUserID: userId,
            data: data,
            sign_data: signData,
            data_type: DataType.DataInitial,
            success: {result in
                resolve(result)
            }, error: {error in
                reject("-1", error?.localizedDescription, error)
            })
    }
    
    @objc(certEncrypt:withDataFormat:withDataType:withResolver:withRejecter:)
    func certEncrypt(data: String, dataFormat: String, dataType: String, resolve:@escaping RCTPromiseResolveBlock,reject:@escaping RCTPromiseRejectBlock) -> Void {
        AXUserInfo.sharedInstance()?.encrypt(
            withUserID: userId,
            data: data,
            data_type: DataType.DataInitial,
            success: {result in
                resolve(result)
            }, error: {error in
                reject("-1", error?.localizedDescription, error)
            })
    }
    
    @objc(certDecrypt:withDataFormat:withDataType:withPn:withResolver:withRejecter:)
    func certDecrypt(data: String, dataFormat: String, dataType: String, pn: String, resolve:@escaping RCTPromiseResolveBlock,reject:@escaping RCTPromiseRejectBlock) -> Void {
        AXUserInfo.sharedInstance()?.encrypt(
            withUserID: userId,
            data: data,
            data_type: DataType.DataInitial,
            success: {result in
                resolve(result)
            }, error: {error in
                reject("-1", error?.localizedDescription, error)
            })
    }
    
    @objc(changeCertStatus:withResolver:withRejecter:)
    func changeCertStatus(statusType: CertStatus, resolve:@escaping RCTPromiseResolveBlock,reject:@escaping RCTPromiseRejectBlock) -> Void {
//        var status = CertStatus.Unfreeze
//        if statusType == 1 {
//            status === CertStatus.Freeze
//        } else if statusType == 2 {
//            status === CertStatus.Unfreeze
//        } else if statusType == 3 {
//            status === CertStatus.Revoke
//        }
        AXUserInfo.sharedInstance()?.certStatusUpdate(
            withUserID: userId,
            update_type: statusType,
            success: {result in
                resolve(result)
            }, error: {error in
                reject("-1", error?.localizedDescription, error)
            })
    }
    
    @objc(postponeCert:withRejecter:)
    func postponeCert(resolve:@escaping RCTPromiseResolveBlock,reject:@escaping RCTPromiseRejectBlock) -> Void {
        AXUserInfo.sharedInstance()?.certPostpone(
            withUserID: userId,
            success: {result in
                resolve(result)
            }, error: {error in
                reject("-1", error?.localizedDescription, error)
            })
    }
    
    @objc(clearPKCacheTime:withResolver:withRejecter:)
    func clearPKCacheTime(pn: String, resolve:@escaping RCTPromiseResolveBlock,reject:@escaping RCTPromiseRejectBlock) -> Void {
        AXUserInfo.sharedInstance()?.cancleCachePriKey(
            withUserID: userId,
            pn: pn,
            success: {result in
                resolve(result)
            }, error: {error in
                reject("-1", error?.localizedDescription, error)
            })
    }
    
    @objc(setSignImgWithDrawingBoard:withResolver:withRejecter:)
    func setSignImgWithDrawingBoard(signImgSetting: NSDictionary, resolve:@escaping RCTPromiseResolveBlock,reject:@escaping RCTPromiseRejectBlock) -> Void {
        AXUserInfo.sharedInstance()?.returnServerSignatureImage(
            withUserID: userId,
            success: {result in
                resolve(result)
            }, error: {error in
                reject("-1", error?.localizedDescription, error)
            })
    }
    
    @objc(getSignImgAndSetItIfNotExist:withResolver:withRejecter:)
    func getSignImgAndSetItIfNotExist(signImgSetting: NSDictionary, resolve:@escaping RCTPromiseResolveBlock,reject:@escaping RCTPromiseRejectBlock) -> Void {
        AXUserInfo.sharedInstance()?.passCertSignAndPicOrSign(
            withUserID: userId,
            data_base64: "",
            success: {result in
                resolve(result)
            }, error: {error in
                reject("-1", error?.localizedDescription, error)
            })
    }
    
    @objc(getSignImgFromService:withRejecter:)
    func getSignImgFromService(resolve:@escaping RCTPromiseResolveBlock,reject:@escaping RCTPromiseRejectBlock) -> Void {
        AXUserInfo.sharedInstance()?.getCertSignAndPicOrSign(
            withUserID: userId,
            success: {result in
                resolve(result)
            }, error: {error in
                reject("-1", error?.localizedDescription, error)
            })
    }
    
    @objc(getSignImgWithDrawingBoard:withResolver:withRejecter:)
    func getSignImgWithDrawingBoard(signImgSetting: NSDictionary, resolve:@escaping RCTPromiseResolveBlock,reject:@escaping RCTPromiseRejectBlock) -> Void {
        AXUserInfo.sharedInstance()?.returnSignImage({ (image) in
            resolve(image)
        })
    }
    
    @objc(getCert:withResolver:withRejecter:)
    func getCert(certType: String, resolve:@escaping RCTPromiseResolveBlock,reject:@escaping RCTPromiseRejectBlock) -> Void {
        AXUserInfo.sharedInstance()?.queryCertInfo(
            withUserID: userId,
            success: {result in
                resolve(result)
            }, error: {error in
                reject("-1", error?.localizedDescription, error)
            })
    }
    
    @objc(clearCert:withRejecter:)
    func clearCert(resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        AXUserInfo.sharedInstance()?.clearCertinfo(withUserID: userId)
        resolve(nil);
    }
}
