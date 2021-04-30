//
//  HHPayPasswordView.h
//  HHPayPasswordView
//
//  Created by mac on 2018/7/20.
//  Copyright © 2018年 mac. All rights reserved.
//

#import <UIKit/UIKit.h>
@class HHPayPasswordView;
@protocol HHPayPasswordViewDelegate <NSObject>

/**
 输入密码完毕的回调

 @param passwordView 输入密码视图
 @param password 回调输入的密码
 */
- (void)passwordView:(HHPayPasswordView *)passwordView didFinishInputPayPassword:(NSString *)password;

/**
 忘记密码
 */
@optional
- (void)forgetPayPassword;
@end

@interface HHPayPasswordView : UIView

@property (nonatomic, weak) id<HHPayPasswordViewDelegate> delegate;

- (void)showInView:(UIView *)view;

- (void)hide;

- (void)paySuccess;

- (void)payFailureWithPasswordError:(BOOL)passwordError withErrorLimit:(NSInteger)limit;

@end
