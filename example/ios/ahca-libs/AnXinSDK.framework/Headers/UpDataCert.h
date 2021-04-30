//
//  UpDataCert.h
//  AnXinSDK
//
//  Created by 安徽省电子认证管理中心 on 2018/7/3.
//  Copyright © 2018年 mac. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface UpDataCert : NSObject

+(NSDictionary *)dictionary:(id)responseObject userID:(NSString *)userID;
@end
