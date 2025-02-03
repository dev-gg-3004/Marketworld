package com.marketworld;  // replace com.your-app-name with your app’s name
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;
import android.widget.Toast; 

public class ToastModule extends ReactContextBaseJavaModule {
   ToastModule(ReactApplicationContext context) {
       super(context);
   }
    @Override
    public String getName() {
    return "Toast";
    }

    @ReactMethod
    public void showToast(String msg){
        Toast.makeText(getReactApplicationContext(),msg,Toast.LENGTH_SHORT).show();  
    }
}
