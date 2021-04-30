//
//  AXTouch.h
//  AnXinSDK
//
//  Created by 安徽省电子认证管理中心 on 2018/7/31.
//  Copyright © 2018年 mac. All rights reserved.
//

#import <Foundation/Foundation.h>

@protocol TouchDelegate <NSObject>
@optional
-(void)TouchAction;
-(void)passWordAction;
-(void)ShowMsg:(NSString *)Msg Can:(BOOL)use;
@end

@interface AXTouch : NSObject
-(void)touchid;
@property(nonatomic, assign)BOOL touchBool;
@property(nonatomic, weak)id<TouchDelegate>delegate;
@end
