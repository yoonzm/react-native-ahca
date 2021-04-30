//
//  FaceBaseViewController.h
//  IDLFaceSDKDemoOC
//
//  Created by 安徽省电子认证管理中心 on 2019/3/20.
//  Copyright © 2019 mac. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "CircleView.h"

typedef enum : NSUInteger {
    CommonStatus,
    PoseStatus,
    occlusionStatus
} WarningStatus;

@interface UnitidFaceBaseViewController : UIViewController

@property (nonatomic, readwrite, retain) UIImageView *displayImageView;
@property (nonatomic, readwrite, assign) BOOL hasFinished;
@property (nonatomic, readwrite, retain) UIImage* coverImage;
@property (nonatomic, readwrite, assign) CGRect previewRect;
@property (nonatomic, readwrite, assign) CGRect detectRect;
@property (nonatomic, readwrite, retain) CircleView * circleView;

- (void)faceProcesss:(UIImage *)image;

- (void)closeAction;

- (void)onAppWillResignAction;
- (void)onAppBecomeActive;

- (void)warningStatus:(WarningStatus)status warning:(NSString *)warning;
- (void)singleActionSuccess:(BOOL)success;

@end
