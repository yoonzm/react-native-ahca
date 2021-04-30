//
//  AXEnumType.h
//  AnXinSDK
//
//  Created by 安徽省电子认证管理中心 on 2019/9/5.
//  Copyright © 2019 mac. All rights reserved.
//

#ifndef AXEnumType_h
#define AXEnumType_h

/** 证件类型 */
typedef NS_ENUM(NSUInteger, CardType) {
    
    /** 身份证 */
    IDCard,
    /** 临时身份证 */
    InterimIDCard,
     /** 户口本 */
    HouseholdRegister,
     /** 护照 */
    Passport,
     /** 军人身份证 */
    SoldierIDCard,
     /** 武警身份证 */
    ArmedPoliceIDCard,

};

/** 数据类型 */
typedef NS_ENUM(NSUInteger, DataType) {
    
    /** 表示data是原文数据转成16进制 */
    Data16System,
    /** 表示data是byte类型数据（ 16进制编码） */
    DataByte,
    /** 表示data是中文转成16进制 */
    Data16CN,
    /** 表示data是原文数据 */
    DataInitial,
    /** 表示 data是byte类型数据（ Base64编码加密后的值） */
    DataBase64,

};

/** 证书状态 */
typedef NS_ENUM(NSUInteger, CertStatus) {
    
    /** 冻结*/
    Freeze,
    /** 解冻 */
    Unfreeze,
    /** 废除 */
    Revoke,
    
};

/** 证书状类型*/
typedef NS_ENUM(NSUInteger, Cert_category) {
    /** 个人*/
    USER,
    /** 企业 */
    ENT,
    /** 虚拟人 */
    VH,
};
#endif /* AXEnumType_h */
