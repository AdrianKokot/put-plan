import { Injectable, NgModule } from '@angular/core';
import {
  BrowserModule,
  HammerGestureConfig,
  HammerModule,
  HAMMER_GESTURE_CONFIG
} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import 'hammerjs';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { PwaAppModule } from './modules/pwa-app/pwa-app.module';
import { TimetableModule } from './modules/timetable/timetable.module';
import { SharedModule } from './shared/shared.module';

@Injectable({providedIn: 'root'})
class HammerConfig extends HammerGestureConfig {
  overrides = <any>{
    swipe: {enabled: true, direction: Hammer.DIRECTION_ALL},
    pan: {enabled: true},
    rotate: {enabled: false},
    pinch: {enabled: false},
    tap: {enabled: false},
    press: {enabled: false}
  }
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    SharedModule,
    BrowserModule,
    CoreModule,
    TimetableModule,

    // AngularFireModule.initializeApp(firebaseConfig),
    // AngularFireAnalyticsModule,
    // AngularFireDatabaseModule,

    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js',
      {
        enabled: environment.production,
        registrationStrategy: 'registerImmediately'
      }
    ),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:30000'
    }),

    HammerModule,
    PwaAppModule
  ],
  providers: [
    {provide: HAMMER_GESTURE_CONFIG, useClass: HammerConfig}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
