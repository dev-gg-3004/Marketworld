package com.marketworld;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;

import android.view.WindowManager;

import static com.facebook.react.bridge.UiThreadUtil.runOnUiThread;

public class PreventScreenModule extends ReactContextBaseJavaModule {
  private static final String PREVENT_SCREENSHOT_ERROR_CODE = "PREVENT_SCREENSHOT_ERROR_CODE";
  private final ReactApplicationContext reactContext;

  PreventScreenModule(ReactApplicationContext context) {
    super(context);
    reactContext = context;
  }

  @Override
  public String getName() {
    return "PreventScreenModule";
  }

  @ReactMethod
  public void forbid() {
    runOnUiThread(new Runnable() {
      @Override
      public void run() {
        try {
          getCurrentActivity().getWindow().addFlags(WindowManager.LayoutParams.FLAG_SECURE);
        } catch(Exception e) {
        }
      }
    });
  }

  @ReactMethod
  public void allow() {
    runOnUiThread(new Runnable() {
      @Override
      public void run() {
        try {
          getCurrentActivity().getWindow().clearFlags(WindowManager.LayoutParams.FLAG_SECURE);
        } catch (Exception e) {
        }
      }
    });
  }
}