/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

@interface AppDelegate ()

@property (nonatomic, strong) UILabel *urlLabel;
@end

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;

  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"Demo"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  self.window.backgroundColor = [UIColor whiteColor];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  
  UIButton *button = [UIButton buttonWithType:UIButtonTypeSystem];
  [button setTitle:@"OpenURL" forState:UIControlStateNormal];
  button.frame = CGRectMake(20, 100, 100, 40);
  [button addTarget:self action:@selector(openURL) forControlEvents:UIControlEventTouchUpInside];
  [rootViewController.view addSubview:button];
  
  self.urlLabel = [[UILabel alloc] initWithFrame:CGRectMake(20, 150, 200, 50)];
  self.urlLabel.numberOfLines = 0;
  [self.window.rootViewController.view addSubview:self.urlLabel];
  
  [self.window makeKeyAndVisible];
  return YES;
}

- (void)openURL {
  NSURL *url = [NSURL URLWithString:@"dkwapp://order/list?id=123"];
  if ([[UIApplication sharedApplication] canOpenURL:url]) {
    [[UIApplication sharedApplication] openURL:url];
  }
}

#if __IPHONE_OS_VERSION_MAX_ALLOWED >= __IPHONE_9_0
- (BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
  NSString *scheme = [url scheme];
  NSLog(@"url => %@， %@", url.absoluteString, scheme);
  self.urlLabel.text = url.absoluteString;
  return YES;
}
#else
- (BOOL)application:(UIApplication *)application handleOpenURL:(NSURL *)url {
  return YES;
}
#endif

@end
