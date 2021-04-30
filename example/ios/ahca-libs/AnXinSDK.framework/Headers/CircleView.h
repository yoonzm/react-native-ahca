//
//  CircleView.h
//  IDLFaceSDKDemoOC
//
//  Created by 安徽省电子认证管理中心 on 2019/3/20.
//  Copyright © 2019 mac. All rights reserved.
//

#import <UIKit/UIKit.h>

#define OutSideColor [UIColor colorWithRed:246/255.0 green:166/255.0 blue:35/255.0 alpha:1]
#define BackgroundColor [UIColor colorWithRed:47/255.0 green:47/255.0 blue:51/255.0 alpha:1]

@interface CircleView : UIView

@property (nonatomic, assign) CGRect circleRect;

@property (nonatomic, assign) BOOL conditionStatusFit;

@end
