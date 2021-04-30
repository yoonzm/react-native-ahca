//
//  AuthoView.h
//  AnXinSDK
//
//  Created by 安徽省电子认证管理中心 on 2019/3/28.
//  Copyright © 2019 mac. All rights reserved.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN
@protocol TimeDelegate <NSObject>

-(void)passTime:(NSString *)timestr postInt:(NSInteger)postponeInt;

@end
@interface AuthoView : UIView

@property(nonatomic, weak)id<TimeDelegate>delegate;

@property(nonatomic, assign)NSInteger hour;



-(instancetype)initWithFrame:(CGRect)frame UserID:(NSString *)UserID;

@end

NS_ASSUME_NONNULL_END
