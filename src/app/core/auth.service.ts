import { Injectable } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Platform } from '@ionic/angular';
@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        public afAuth: AngularFireAuth,
        private gplus: GooglePlus,
        private platform: Platform
    ) { }

    doFacebookLogin() {
        return new Promise<any>((resolve, reject) => {
            let provider = new firebase.auth.FacebookAuthProvider();
            this.afAuth.auth
                .signInWithPopup(provider)
                .then(res => {
                    resolve(res);
                }, err => {
                    console.log(err);
                    reject(err);
                })
        })
    }

    doTwitterLogin() {
        return new Promise<any>((resolve, reject) => {
            let provider = new firebase.auth.TwitterAuthProvider();
            this.afAuth.auth
                .signInWithPopup(provider)
                .then(res => {
                    resolve(res);
                }, err => {
                    console.log(err);
                    reject(err);
                })
        })
    }

    async doGoogleLogin() {
        return new Promise<any>(async (resolve, reject) => {
            console.log('doGoogleLogin');
            let provider = new firebase.auth.GoogleAuthProvider();
            provider.addScope('profile');
            provider.addScope('email');
            if (this.platform.is('cordova')) {
                console.log('if cordova')
                try {
                    const gplusUser = await this.gplus.login({
                        'webClientId': 'd08b82cca93555b62a9accf36cdce09c00bf13a0',
                        'offline': true,
                        'scopes': 'profile email'
                    });
                    console.log(gplusUser);
                    this.afAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken))
                        .then(res => {
                            console.log('signInWithCredential', res);
                            resolve(res);
                        }, err => {
                            console.log(err);
                            reject(err);
                        })
                } catch (error) {
                    console.log(error);
                }
            } else {
                this.afAuth.auth
                    .signInWithPopup(provider)
                    .then(res => {
                        console.log('ressssss', res);
                        resolve(res);
                    }, err => {
                        console.log(err);
                        reject(err);
                    })
            }
        })
    }

    doRegister(value) {
        return new Promise<any>((resolve, reject) => {
            firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
                .then(res => {
                    resolve(res);
                }, err => reject(err))
        })
    }

    doLogin(value) {
        return new Promise<any>((resolve, reject) => {
            firebase.auth().signInWithEmailAndPassword(value.email, value.password)
                .then(res => {
                    resolve(res);
                }, err => reject(err))
        })
    }

    doLogout() {
        return new Promise((resolve, reject) => {
            if (firebase.auth().currentUser) {
                this.afAuth.auth.signOut();
                resolve();
            }
            else {
                reject();
            }
        });
    }


}
