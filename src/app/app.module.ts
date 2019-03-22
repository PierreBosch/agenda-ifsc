import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";

import { MyApp } from "./app.component";
import { HomePage } from "../pages/home/home";
import { ContactProvider } from "../providers/contact/contact";
import { ContactEditPage } from "../pages/contact-edit/contact-edit";
import { BrMaskerModule } from "brmasker-ionic-3";
import { ContactDetailsPage } from "../pages/contact-details/contact-details";
import { HttpClientModule } from "@angular/common/http";
import { Camera } from "@ionic-native/camera";

@NgModule({
  declarations: [MyApp, HomePage, ContactEditPage, ContactDetailsPage],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrMaskerModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, HomePage, ContactEditPage, ContactDetailsPage],
  providers: [
    StatusBar,
    Camera,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ContactProvider
  ]
})
export class AppModule {}
