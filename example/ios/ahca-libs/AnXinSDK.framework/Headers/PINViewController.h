//
//  PINViewController.h
//  Jiemian
//
//  Created by mac on 2018/6/20.
//  Copyright © 2018年 mac. All rights reserved.
//

#import <UIKit/UIKit.h>





typedef void (^ReturnCert)(NSDictionary *);




@interface PINViewController : UIViewController


@property(nonatomic, copy)ReturnCert returnCertBlock;

@property(nonatomic, strong)NSString *app_key;

@property(nonatomic, strong)NSString *userID;

@property(nonatomic, strong)NSString *secretKey;

@property(nonatomic, strong)NSString *baseURL;

@property(nonatomic, strong)NSString *user_name;// 用户名/企业名

@property(nonatomic, strong)NSString *card_num;//证件号

@property(nonatomic, strong)NSString *phone_num;//手机号

@property(nonatomic, strong)NSString *card_type;



@property(nonatomic, strong)NSString *legal_person;//法人姓名

@property(nonatomic, strong)NSString *ent_register_no;//统一社会代码号

@property(nonatomic, strong)NSString *user_email;//用户邮箱

@property(nonatomic, strong)NSString *user_city;//城市

@property(nonatomic, strong)NSString *cert_ou, *cert_s, *cert_l, *cert_e, *cert_o;//证书项（虚拟人证书）

@property(nonatomic, strong)NSString *cert_ext2, *cert_ext3, *cert_ext4;//扩展项

@property(nonatomic, strong)NSString *unique_mark;

@property(nonatomic, strong)NSString *cert_categroy;//证书类型标识 个人证书：USER；企业证书：ENT；虚拟人证书：VH

@property(nonatomic, strong)NSString *QRCodeIdent;

@property(nonatomic, strong)NSString *qcid;

@property(nonatomic, strong)NSString *QRUrl;


@end
