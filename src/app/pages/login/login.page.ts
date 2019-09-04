import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
// import { AngularFireAuth } from '@angular/fire/auth'
import * as firebase from 'firebase/app';
// import { UserService } from '../../core/user.service';
// import { Platform } from '@ionic/angular';
import { Observable } from 'rxjs';
// import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { AuthService } from '../../core';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage {

    isSaveEmail = false;
    user: Observable<firebase.User>;

    constructor(
        private navCtrl: NavController,
        //     private afAuth: AngularFireAuth,
        private authS: AuthService,
        //     private gplus: GooglePlus,
        // private platform: Platform
    ) {
        // this.user = this.afAuth.authState
    }

    //     logarComGoogle() {
    //         if (this.platform.is('cordova')) {
    //             this.nativeGoogleLogin();
    //         } else {
    //             this.webGoogleLogin();
    //         }
    //     }
    //     async nativeGoogleLogin() {
    //         try {
    //             const gplusUser = await this.gplus.login({
    //                 'webClientId': 'd08b82cca93555b62a9accf36cdce09c00bf13a0',
    //                 'offline': true,
    //                 'scopes': 'profile email'
    //             });

    //             this.afAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken))
    //                 .then(result => {
    //                     this.userS.doLogin(result);
    //                     this.navCtrl.navigateRoot('/cultos');
    //                 })
    //                 .catch(function (error) {
    //                     console.log(error)
    //                     // Handle Errors here.
    //                     var errorCode = error.code;
    //                     var errorMessage = error.message;
    //                     // The email of the user's account used.
    //                     var email = error.email;
    //                     // The firebase.auth.AuthCredential type that was used.
    //                     var credential = error.credential;
    //                     // ...
    //                 });
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }

    //     async webGoogleLogin() {
    //         try {
    //             const provider = new firebase.auth.GoogleAuthProvider();
    //             this.afAuth.auth.signInWithPopup(provider)
    //                 .then(result => {
    //                     this.userS.doLogin(result);
    //                     this.navCtrl.navigateRoot('/cultos');
    //                 })
    //                 .catch(function (error) {
    //                     console.log(error)
    //                     // Handle Errors here.
    //                     var errorCode = error.code;
    //                     var errorMessage = error.message;
    //                     // The email of the user's account used.
    //                     var email = error.email;
    //                     // The firebase.auth.AuthCredential type that was used.
    //                     var credential = error.credential;
    //                     // ...
    //                 });
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }

    //     logarComFacebook() {

    //     }
    tryGoogleLogin() {
        this.authS.doGoogleLogin()
            .then(res => {
                console.log('res', res)
                console.log('navigateRoot')
                console.log('navigateRoot')
                console.log('navigateRoot')
                console.log('navigateRoot')
                this.navCtrl.navigateRoot('/cultos');
            })
    }

    tryLogin(value) {
        this.authS.doLogin(value)
            .then(res => {
                this.navCtrl.navigateRoot('/cultos');
            }, err => {
                console.log(err);
                // this.errorMessage = err.message;
            })
    }
}
