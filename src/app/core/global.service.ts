import { Injectable } from '@angular/core';
import { AlertController, Platform } from '@ionic/angular';
import * as CryptoJS from 'crypto-js';
import * as $ from 'jquery';

export interface IErrorError {
    retTexto: string;
}
export interface IError {
    error: IErrorError;
    message?: string;
}

@Injectable({
    providedIn: 'root'
})
export class GlobalService {

    private SECRET_KEY: string = 'IBETt@tu@pe';

    public ultimoNumCartaoPesquisado = '';

    constructor(
        private alertCtrl: AlertController,
        public plt: Platform

    ) { }

    encrypt(str: string) {
        return CryptoJS.AES.encrypt(str, this.SECRET_KEY);
    }

    decrypt(data: string) {
        const decryptedData = CryptoJS.AES.decrypt(data.toString(), this.SECRET_KEY);
        return decryptedData.toString(CryptoJS.enc.Utf8);
    }

    /**
     *
     * @param key
     * @param str
     * @description Favor encriptar antes de salvar no LocalStorage
     */
    setStorage(key: string, str: string) {
        localStorage.setItem(key, str);
    }

    getStorage(key: string) {
        return localStorage.getItem(key);
    }

    rmStorage(key: string) {
        localStorage.removeItem(key);
    }

    setFocus(where, who) {
        $(where).toArray()[0].shadowRoot.querySelector(who).focus();
    }

}
