//
//  UserInfo.h
//  AnXinSDK
//
//  Created by mac on 2018/6/13.
//  Copyright © 2018年 mac. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "HHPayPasswordView.h"
#import "AXTouch.h"
#import "AuthoView.h"
#import "AXSignatureVC.h"
#import "LiveDetectionSDKFrame.h"
#import "AXEnumType.h"




@protocol CertDelegate <NSObject>

-(void)CertDictionary:(NSDictionary *)dictionary;

@end


typedef void (^CallBack)(id response);
typedef void (^ErrorBack)(NSError *error);

@interface AXUserInfo : NSObject<HHPayPasswordViewDelegate, TouchDelegate, TimeDelegate, UNITIDLivenessResultControllerDelegate>



+ (AXUserInfo*) sharedInstance;

@property(nonatomic, weak)id<CertDelegate>delegate;



@property(nonatomic, strong)NSString *cert_category;

@property(nonatomic, strong)NSString *unique_id;

@property(nonatomic, strong)NSString *userID;


@property(nonatomic, strong)NSString *baseURL;

@property(nonatomic, strong)NSString *app_key;

@property(nonatomic, strong)NSString *secretKey;

@property(nonatomic, strong)NSString *LicenseName;

@property(nonatomic, strong)NSString *LicenseSuffix;

@property(nonatomic, strong)NSString *LicenseId;


@property(nonatomic, strong)AuthoView *KeyAlertView;

@property(nonatomic, assign)BOOL touchBool;

@property(nonatomic, copy)CallBack success;

@property(nonatomic, copy)ErrorBack err;



typedef void (^BackImage)(UIImage* image);
typedef void (^NSStringError)(NSString *error);



/**
 项目配置

 @param app_key app_key
 @param secretKey secretKey
 */
-(void)AppWithApp_key:(NSString *)app_key SecretKey:(NSString *)secretKey baseURL:(NSString *)baseURL;


/**
 获取设备唯一标识

 @return 返回设备唯一标识
 */
+(NSString *)GetPhone_IDFV;


/**
 个人证书申请
 @param userID 用户唯一标识
 @param user_name 用户名（必传）
 @param card_num 证件号（必传）
 @param phone_num 手机号
 @param card_type 证件类型（必传）
 @param user_city 城市
 @param user_email 邮箱

 */
-(void)ApplyWithPersonUserID:(NSString *)userID
                       User_name:(NSString *)user_name
                       card_num:(NSString *)card_num
                      phone_num:(NSString *)phone_num
                      card_type:(CardType)card_type
                      user_city:(NSString *)user_city
                     user_email:(NSString *)user_email
                      cert_ext2:(NSString *)cert_ext2
                      cert_ext3:(NSString *)cert_ext3
                      cert_ext4:(NSString *)cert_ext4
                       delegate:(id<CertDelegate>)delegate;


/**
 企业证书申请
 @param userID 用户唯一标识
 @param user_name 企业名称（必传）
 @param legal_person 法人姓名
 @param ent_register_no 统一社会代码号
 @param card_num 法人身份证号
 @param phone_num 法人联系电话
 @param user_email 企业邮箱

 */
-(void)ApplyWithENTUserID:(NSString *)userID
                   User_name:(NSString *)user_name
                legal_person: (NSString *)legal_person
             ent_register_no:(NSString *)ent_register_no
                    card_num:(NSString *)card_num
                   phone_num:(NSString *)phone_num
                  user_email:(NSString *)user_email
                   cert_ext2:(NSString *)cert_ext2
                   cert_ext3:(NSString *)cert_ext3
                   cert_ext4:(NSString *)cert_ext4
                    delegate:(id<CertDelegate>)delegate;


/**
 虚拟证书申请
 @param userID 用户唯一标识
 @param user_name 用户名（必传）
 @param cert_ou nil
 @param cert_o nil
 @param cert_s nil
 @param cert_l nil
 @param cert_e nil

 */
-(void)ApplyWithVHUserID:(NSString *)userID
                    User_name:(NSString *)user_name
                    cert_ou: (NSString *)cert_ou
                     cert_o:(NSString *)cert_o
                     cert_s:(NSString *)cert_s
                     cert_l:(NSString *)cert_l
                     cert_e:(NSString *)cert_e
                  cert_ext2:(NSString *)cert_ext2
                  cert_ext3:(NSString *)cert_ext3
                  cert_ext4:(NSString *)cert_ext4
                   delegate:(id<CertDelegate>)delegate;





/**
 原文签名
 
 @param userID 用户唯一标识
 @param data 签名数据
 @param data_type 签名数据类型
 @param success success
 @param error error
 */
-(void)passSignWithUserID:(NSString *)userID
                        data:(NSString *)data
                       pn:(NSString *)pn
                   data_type:(DataType)data_type
                  success:(CallBack)success
                    error:(ErrorBack)error;



/**
 原文验签

 @param userID 用户唯一标识

 @param data 原文
 @param sign_data 签名结果数据
 @param data_type 数据类型
 @param success success
 @param err err

 */
-(void)VerifyWithUserID:(NSString *)userID
                      data:(NSString *)data
                 sign_data:(NSString *)sign_data
                 data_type:(DataType)data_type
                success:(CallBack)success
                  error:(ErrorBack)err;


/**
 原文加密

 @param userID 用户唯一标识

 @param data 加密数据
 @param data_type 数据类型
 @param success success
 @param err err
 */
-(void)EncryptWithUserID:(NSString *)userID
                       data:(NSString *)data
                  data_type:(DataType)data_type
                 success:(CallBack)success
                   error:(ErrorBack)err;


/**
 原文解密

 @param userID 用户唯一标识
 @param data 解密数据
 @param data_type 数据类型
 @param success success
 @param err err
 */
-(void)passDecryptWithUserID:(NSString *)userID
                           data:(NSString *)data
                      data_type:(DataType)data_type
                     success:(CallBack)success
                       error:(ErrorBack)err;

/**
 重置PIN码

 @param userID 用户唯一标识
 @param user_name 用户名/企业名
 @param ent_register_no 企业税号
 @param card_type 证件类型
 @param card_num 证件号码
 @param phone_num 手机号码
 */
-(void)PINRestWithUserID:(NSString *)userID
                 user_name:(NSString *)user_name
           ent_register_no:(NSString *)ent_register_no
                 card_type:(CardType)card_type
                  card_num:(NSString *)card_num
                 phone_num:(NSString *)phone_num;





-(void)PasswordResetWithUserID:(NSString *)userID
                        user_name:(NSString *)user_name
                  ent_register_no:(NSString *)ent_register_no
                        card_type:(CardType)card_type
                         card_num:(NSString *)card_num
                        phone_num:(NSString *)phone_num
                           handle:(id)handle
                         callback:(SEL)callback
                            error:(SEL)err;



-(void)PasswordResetResultWithUserID:(NSString *)userID
                           unique_reset:(NSString *)unique_reset
                                 handle:(id)handle
                               callback:(SEL)callback
                                  error:(SEL)err;


-(void)Password102ResetWithuserID:(NSString *)userID
                     unique_reset:(NSString *)unique_reset
                      verify_code:(NSString *)verify_code
                          success:(CallBack)success
                            error:(ErrorBack)err;
/**
 更新证书

 @param userID 用户唯一标识
 @param user_name 用户名
 @param phone_num 手机号码
 @param success success
 @param err err
 */
-(void)CertUpdateWithUserID:(NSString *)userID
                     user_name:(NSString *)user_name
                     phone_num:(NSString *)phone_num
                     user_city:(NSString *)user_city
                    user_email:(NSString *)user_email
                    success:(CallBack)success
                      error:(ErrorBack)err;

/**
 变更证书状态

 @param userID 用户唯一标识
 @param update_type 变更类型
 @param success success
 @param err err
 */
-(void)CertStatusUpdateWithUserID:(NSString *)userID
                         update_type:(CertStatus)update_type
                          success:(CallBack)success
                            error:(ErrorBack)err;

/**
 延期证书

 @param userID 用户唯一标识
 @param success success
 @param err err
 */
-(void)certPostponeWithUserID:(NSString *)userID
                      success:(CallBack)success
                        error:(ErrorBack)err;



/**
 查询证书

 @param userID 用户唯一标识
 @param success success
 @param err err
 */
-(void)QueryCertInfoWithUserID:(NSString *)userID
                       success:(CallBack)success
                         error:(ErrorBack)err;






/**
 密码缓存取消
 
 @param userID 用户唯一标识
 
 @param success success
 @param err err
 */
-(void)CancleCachePriKeyWithUserID:(NSString *)userID
                                pn:(NSString *)pn
                           success:(CallBack)success
                             error:(ErrorBack)err;



/**
 FaceConfi

 @param LicenseName FileName
 @param LicenseSuffix FileSuffix
 @param LicenseId ID
 */
-(void)faceWithLicenseName:(NSString *)LicenseName
             LicenseSuffix:(NSString *)LicenseSuffix
                 LicenseId:(NSString *)LicenseId;



-(void)FACEImageWithNSArray:(NSArray *)livenessArray
                 completion:(CallBack)result;

/**
 登录

 @param userID 用户唯一标识
 @param data 数据
 @param data_type 数据类型
 @param success success
 @param err err
 */
-(void)PassLoginMobileWithUserID:(NSString *)userID
                           data:(NSString *)data
                              pn:(NSString *)pn
                      data_type:(DataType)data_type
                         success:(CallBack)success
                           error:(ErrorBack)err;


/**
 签章

 @param userID 用户唯一标识
 @param pn 项目编号
 @param success success
 @param err err
 */
-(void)PassCertSealWithUserID:(NSString *)userID
                         data:(NSString *)data
                           pn:(NSString *)pn
                    data_type:(DataType)data_type
                      success:(CallBack)success
                        error:(ErrorBack)err;

/**
 二维码接口

 @param userID 用户唯一标识
 @param success success
 @param err err
 */
-(void)GetQrcodeWithUserID:(NSString *)userID
                   success:(CallBack)success
                     error:(ErrorBack)err;

/**
 解绑

 @param QCCodeString 二维码数据
 @param delegate 回调
 */
-(void)UntiePhoneWithUserID:(NSString *)userID
                     QCCode:(NSString *)QCCodeString
                 delegate:(id<CertDelegate>)delegate;



/**
签名数据存储

 @param userID 用户唯一标识（签名图片ID）
 @param data_base64 签名图片base64编码字符串
 @param success success
 @param err err
 */
-(void)passCertSignAndPicOrSignWithUserID:(NSString *)userID
                    data_base64:(NSString *)data_base64
                          success:(CallBack)success
                            error:(ErrorBack)err;

/**
 签章数据存储
 
 @param pn 项目编号

 @param success success
 @param err err
 */
-(void)passCertSealAndPicOrSignWithUserID:(NSString *)userID
                                   pn:(NSString *)pn
                              success:(CallBack)success
                                error:(ErrorBack)err;


/**
签名图片获取数据

 @param userID 用户唯一标识（签名图片ID）
 @param success success
 @param err err
 */
-(void)GetCertSignAndPicOrSignWithUserID:(NSString *)userID
                              success:(CallBack)success
                                error:(ErrorBack)err;


/**
 签名面板（设置后存储到服务器）

 @param userID 用户唯一标识
 @param success success
 @param err err
 */
-(void)ReturnServerSignatureImageWithUserID:(NSString *)userID
                              success:(CallBack)success
                                error:(ErrorBack)err;


/**
 签名面板（本地设置返回签名图片）
 
 */
-(void)ReturnSignImage:(void (^)(UIImage *Image))Image;




/**
 获取证书信息

 @param userID 用户唯一标识
 @return 证书信息
 */
-(NSDictionary *)GetCertDictionaryWithUserID:(NSString *)userID;

/**
 判断证书是否存在
 
 @param userID 用户唯一标识
 @return 返回信息
 */
-(BOOL)isExistCertWithUserID:(NSString *)userID;


/**
 清除本地证书信息

 @param userID 用户唯一标识
 */
-(BOOL)clearCertinfoWithUserID:(NSString *)userID;
@end
