import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage } from "../pages/tabs/tabs";
import { GuardadosPage } from "../pages/guardados/guardados";

import { HistorialProvider } from '../providers/historial/historial';

//plugins
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import { AgmCoreModule } from '@agm/core';
import {MapasPage} from "../pages/mapas/mapas";
import {MapasPageModule} from "../pages/mapas/mapas.module";



@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    HomePage,
    GuardadosPage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBAgTyM_rY-bKJRPQnDZGZmM1gdP8sNooA'
    }),
    MapasPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    HomePage,
    GuardadosPage,
    MapasPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BarcodeScanner,
    HistorialProvider,
    InAppBrowser
  ]
})
export class AppModule {}
