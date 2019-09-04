import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule, StorageBucket } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard';

import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { AuthGuard } from './auth/auth.guard';

@NgModule({
    imports: [
        BrowserModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule, // firestore
        AngularFireAuthModule, // auth
        AngularFireStorageModule, // storage
        AngularFireAuthGuardModule,
        AppRoutingModule,
        HttpClientModule,
        IonicModule.forRoot({
            mode: 'ios'
        }),
        IonicStorageModule.forRoot(),
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production
        })
    ],
    declarations: [AppComponent],
    providers: [
        GooglePlus,
        InAppBrowser,
        SplashScreen,
        StatusBar,
        AuthGuard,
        { provide: StorageBucket, useValue: 'ibetatuape' }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
