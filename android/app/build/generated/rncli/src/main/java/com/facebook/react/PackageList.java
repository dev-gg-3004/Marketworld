
package com.facebook.react;

import android.app.Application;
import android.content.Context;
import android.content.res.Resources;

import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainPackageConfig;
import com.facebook.react.shell.MainReactPackage;
import java.util.Arrays;
import java.util.ArrayList;

// @bam.tech/react-native-image-resizer
import com.reactnativeimageresizer.ImageResizerPackage;
// @react-native-async-storage/async-storage
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
// @react-native-community/geolocation
import com.reactnativecommunity.geolocation.GeolocationPackage;
// @react-native-community/netinfo
import com.reactnativecommunity.netinfo.NetInfoPackage;
// @react-native-firebase/app
import io.invertase.firebase.app.ReactNativeFirebaseAppPackage;
// @react-native-firebase/dynamic-links
import io.invertase.firebase.dynamiclinks.ReactNativeFirebaseDynamicLinksPackage;
// @react-native-firebase/messaging
import io.invertase.firebase.messaging.ReactNativeFirebaseMessagingPackage;
// react-native-device-info
import com.learnium.RNDeviceInfo.RNDeviceInfo;
// react-native-fs
import com.rnfs.RNFSPackage;
// react-native-gesture-handler
import com.swmansion.gesturehandler.RNGestureHandlerPackage;
// react-native-image-picker
import com.imagepicker.ImagePickerPackage;
// react-native-image-size
import com.existfragger.rnimagesize.RNImageSizePackage;
// react-native-maps
import com.airbnb.android.react.maps.MapsPackage;
// react-native-pager-view
import com.reactnativepagerview.PagerViewPackage;
// react-native-reanimated
import com.swmansion.reanimated.ReanimatedPackage;
// react-native-safe-area-context
import com.th3rdwave.safeareacontext.SafeAreaContextPackage;
// react-native-screens
import com.swmansion.rnscreens.RNScreensPackage;
// react-native-splash-screen
import org.devio.rn.splashscreen.SplashScreenReactPackage;
// react-native-vector-icons
import com.oblador.vectoricons.VectorIconsPackage;
// react-native-webview
import com.reactnativecommunity.webview.RNCWebViewPackage;
// realm
import io.realm.react.RealmReactPackage;
// rn-fetch-blob
import com.RNFetchBlob.RNFetchBlobPackage;

public class PackageList {
  private Application application;
  private ReactNativeHost reactNativeHost;
  private MainPackageConfig mConfig;

  public PackageList(ReactNativeHost reactNativeHost) {
    this(reactNativeHost, null);
  }

  public PackageList(Application application) {
    this(application, null);
  }

  public PackageList(ReactNativeHost reactNativeHost, MainPackageConfig config) {
    this.reactNativeHost = reactNativeHost;
    mConfig = config;
  }

  public PackageList(Application application, MainPackageConfig config) {
    this.reactNativeHost = null;
    this.application = application;
    mConfig = config;
  }

  private ReactNativeHost getReactNativeHost() {
    return this.reactNativeHost;
  }

  private Resources getResources() {
    return this.getApplication().getResources();
  }

  private Application getApplication() {
    if (this.reactNativeHost == null) return this.application;
    return this.reactNativeHost.getApplication();
  }

  private Context getApplicationContext() {
    return this.getApplication().getApplicationContext();
  }

  public ArrayList<ReactPackage> getPackages() {
    return new ArrayList<>(Arrays.<ReactPackage>asList(
      new MainReactPackage(mConfig),
      new ImageResizerPackage(),
      new AsyncStoragePackage(),
      new GeolocationPackage(),
      new NetInfoPackage(),
      new ReactNativeFirebaseAppPackage(),
      new ReactNativeFirebaseDynamicLinksPackage(),
      new ReactNativeFirebaseMessagingPackage(),
      new RNDeviceInfo(),
      new RNFSPackage(),
      new RNGestureHandlerPackage(),
      new ImagePickerPackage(),
      new RNImageSizePackage(),
      new MapsPackage(),
      new PagerViewPackage(),
      new ReanimatedPackage(),
      new SafeAreaContextPackage(),
      new RNScreensPackage(),
      new SplashScreenReactPackage(),
      new VectorIconsPackage(),
      new RNCWebViewPackage(),
      new RealmReactPackage(),
      new RNFetchBlobPackage()
    ));
  }
}
