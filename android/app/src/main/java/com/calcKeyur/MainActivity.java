package com.calcKeyur;

import android.app.Application;
import android.util.Log;
import java.util.Arrays;
import java.util.List;

import com.facebook.react.ReactApplication;
import com.github.yamill.orientation.OrientationPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.facebook.react.ReactActivity;
import com.sbugert.rnadmob.RNAdMobPackage;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override

    protected String getMainComponentName() {
        return "Calculator";
    }


    protected List<ReactPackage> getPackages() {
     return Arrays.<ReactPackage>asList(
    new MainReactPackage(),
    new RNAdMobPackage()
  );
 }

}
