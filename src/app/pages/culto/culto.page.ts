import { Component, ViewChild } from '@angular/core';
import { IonList, ModalController, LoadingController, NavController } from '@ionic/angular';
import { HttpService, AuthService } from '../../core';
import { CultoDetalhesPage } from '../../components/culto-detalhes/culto-detalhes.page';
import * as moment from 'moment';
import 'moment/locale/pt-br';

@Component({
    selector: 'app-culto',
    templateUrl: 'culto.page.html',
    styleUrls: ['culto.page.scss'],
})
export class CultoPage {
    @ViewChild('scheduleList', { static: true }) scheduleList: IonList;

    queryText = '';
    shownSessions: any = [];
    groups: any = [];

    constructor(
        private httpS: HttpService,
        private loadingCtrl: LoadingController,
        private modalCtrl: ModalController,
        private authS: AuthService,
        private navCtrl: NavController
    ) { }
    ionViewWillEnter() {
        this.getItems();
    }

    async getItems() {
        this.shownSessions = 0;
        this.httpS.get('functions', `/cultos/groupedlist`).then(async (res: any) => {

            const queryText = this.queryText.toLowerCase().replace(/,|\.|-/g, ' ');
            const queryWords = queryText.split(' ').filter(w => !!w.trim().length);

            this.groups = res;
            this.groups.forEach(grupo => {
                grupo.hide = true
                grupo.sessions.forEach(session => {
                    console.log(session.data);
                    this.filterSession(session, queryWords);

                    session.diaDoMes = moment(session.data).format('DD')
                    session.diaDaSemana = moment(session.data).format('ddd')

                    if (!session.hide) {
                        // if this session is not hidden then this group should show
                        grupo.hide = false;
                        this.shownSessions++;
                    }
                });
                console.log(this.shownSessions);
            });
            console.log(this.groups);
        }).catch(async (error: any) => {
            console.log(error);
        });
    }

    presentCultoDetalhes = async (c) => {
        const culto = { ...c };
        const loading = await this.loadingCtrl.create({ spinner: 'crescent' });
        await loading.present();
        for (let index = 0; index < culto.referencias.length; index++) {
            let ref = culto.referencias[index];
            const livro = await this.httpS.get('functions', `/biblias/aa/livros/${ref.livro}`);
            ref.livro = livro;
            ref.versiculo = ref.versiculo ? `: ${ref.versiculo}` : ref.versiculo;
        }
        const modalDetalhes = await this.modalCtrl.create({
            component: CultoDetalhesPage,
            componentProps: { culto }
        });
        loading.dismiss();
        return await modalDetalhes.present();
    }


    filterSession(
        session: any,
        queryWords: string[],
    ) {
        let matchesQueryText = false;
        console.log(queryWords)
        if (queryWords.length) {
            // of any query word is in the session name than it passes the query test
            queryWords.forEach((queryWord: string) => {
                if (session.tema.toLowerCase().indexOf(queryWord) > -1) {
                    matchesQueryText = true;
                }
                if (session.preletor.toLowerCase().indexOf(queryWord) > -1) {
                    matchesQueryText = true;
                }
            });
        } else {
            // if there are no query words then this session passes the query test
            matchesQueryText = true;
        }

        // all tests must be true if it should not be hidden
        session.hide = !(matchesQueryText);
    }

    doLogout() {
        console.log('logout')
        this.authS.doLogout();
        this.navCtrl.navigateRoot('/login');
    }
}
