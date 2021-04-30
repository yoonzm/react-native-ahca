//
//  LivenessViewController.h
//  IDLFaceSDKDemoOC
//
//  Created by 安徽省电子认证管理中心 on 2019/3/20.
//  Copyright © 2019 mac. All rights reserved.
//
#import "UnitidFaceBaseViewController.h"


@protocol UNITIDLivenessResultControllerDelegate <NSObject>

@optional
/**
 活体检测返回结果代理方法
 

 */
- (void)livenessDetectionControllerDidGetResult: (UIImage *)bestImage;


@end



@interface UnitidLivenessViewController : UnitidFaceBaseViewController

@property (nonatomic, weak) id <UNITIDLivenessResultControllerDelegate> delegate;


- (void)livenesswithList:(NSArray *)livenessArray order:(BOOL)order numberOfLiveness:(NSInteger)numberOfLiveness;

@end
