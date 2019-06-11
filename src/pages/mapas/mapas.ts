import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import { AgmCoreModule } from '@agm/core';

/**
 * Generated class for the MapasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mapas',
  templateUrl: 'mapas.html',
})
export class MapasPage {
  lat:number;
  lng:number;
  constructor(public navParams: NavParams, private viewController: ViewController) {
    this.lat = 51.678418;
    this.lng = 7.809007;

    console.log(this.navParams.get("coords"));
  }

  cerrarModal(){
    this.viewController.dismiss();
  }
}
