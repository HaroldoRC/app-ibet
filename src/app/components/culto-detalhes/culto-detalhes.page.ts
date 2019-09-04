import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../../core';
import { NavParams, NavController, ModalController } from '@ionic/angular';
import * as moment from 'moment';
import 'moment/locale/pt-br';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
    selector: 'culto-detalhes',
    templateUrl: './culto-detalhes.page.html',
    styleUrls: ['./culto-detalhes.page.scss'],
})
export class CultoDetalhesPage {

    culto: any;
    url: Observable<string | null>;

    constructor(
        private navP: NavParams,
        private modalCtrl: ModalController,
    ) {
        const { culto } = this.navP.data;
        this.culto = culto;
    }

    formatDate(date) {
        return moment(date).format('DD/MM/YYYY dddd');
    }

    fechar() {
        // using the injected ModalController this page
        // can "dismiss" itself and optionally pass back data
        this.modalCtrl.dismiss();
    }
}
