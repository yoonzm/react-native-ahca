//
//  AXSignatureVC.h
//  AnXinSDK
//
//  Created by 安徽省电子认证管理中心 on 2019/4/23.
//  Copyright © 2019 mac. All rights reserved.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN
@protocol AXSignatureViewDelegate<NSObject>

- (void)getSignImage:(UIImage*)signImage;

@end

typedef void(^ImageBlock)(UIImage *);
@interface AXSignatureVC : UIViewController
@property(nonatomic, copy)ImageBlock returnResultImage;
@property (nonatomic,weak) id<AXSignatureViewDelegate> delegate;
@end

NS_ASSUME_NONNULL_END
