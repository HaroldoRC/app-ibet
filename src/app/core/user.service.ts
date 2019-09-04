// import { Injectable } from '@angular/core';
// import { GlobalService } from './global.service';
// import { AngularFireAuth } from '@angular/fire/auth';
// import { GooglePlus } from '@ionic-native/google-plus/ngx';
// import { Platform } from '@ionic/angular';

// @Injectable({
//     providedIn: 'root'
// })
// export class UserService {

//     private userKey: string = 'IBETUserKey';

//     constructor(
//         private globalS: GlobalService,
//         private afAuth: AngularFireAuth,
//         private gplus: GooglePlus,
//         private platform: Platform
//     ) { }

//     doLogin(result) {
//         this.Token = result.credential.accessToken;
//         this.RefreshToken = result.user.refreshToken;
//         console.log(this.Token);
//         this.saveUser(result.user)
//         console.log(result.user);
//     }

//     doLogout() {
//         this.delToken()
//         this.delRefreshToken()
//         this.deleteUser()
//         this.afAuth.auth.signOut();
//         if (this.platform.is('cordova')) {
//             this.gplus.logout();
//         }
//     }

//     get Token(): string { return window.localStorage.getItem('IBETToken'); }
//     set Token(v: string) { window.localStorage.setItem('IBETToken', v); }
//     delToken(): void { window.localStorage.removeItem('IBETToken'); }

//     get RefreshToken(): string { return window.localStorage.getItem('IBETRefreshToken'); }
//     set RefreshToken(v: string) { window.localStorage.setItem('IBETRefreshToken', v); }
//     delRefreshToken(): void { window.localStorage.removeItem('IBETRefreshToken'); }

//     saveUser(user: Object) {
//         const enc = this.globalS.encrypt(JSON.stringify(user));
//         this.globalS.setStorage(this.userKey, enc);
//     }

//     getUser() {
//         const str = this.globalS.getStorage(this.userKey);
//         if (str) {
//             return JSON.parse(this.globalS.decrypt(str));
//         }
//         return false;
//     }

//     deleteUser() {
//         this.globalS.rmStorage(this.userKey);
//     }
// }
import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(
        public db: AngularFirestore,
        public afAuth: AngularFireAuth
    ) {
    }


    getCurrentUser() {
        return new Promise<any>((resolve, reject) => {
            var user = firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    resolve(user);
                } else {
                    reject('No user logged in');
                }
            })
        })
    }

    updateCurrentUser(value) {
        return new Promise<any>((resolve, reject) => {
            var user = firebase.auth().currentUser;
            user.updateProfile({
                displayName: value.name,
                photoURL: user.photoURL
            }).then(res => {
                resolve(res);
            }, err => reject(err))
        })
    }
}
