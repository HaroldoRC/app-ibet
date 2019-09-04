import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { GlobalService } from './global.service';
import { HttpService } from './http.service';


@Injectable({
  providedIn: 'root'
})
export class CultoService {

  constructor(
      private globalS: GlobalService,
      private httpS: HttpService
  ) { }


}
