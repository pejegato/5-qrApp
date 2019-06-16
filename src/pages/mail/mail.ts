import {Component} from '@angular/core';
import {IonicPage, NavParams, ViewController} from 'ionic-angular';

/**
 * Generated class for the MapasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mail',
  templateUrl: 'mail.html',
})
export class MailPage {
  to:string;
  sub:string;
  body:string;
  constructor(public navParams: NavParams, private viewController: ViewController) {
    // this.lat = 51.678418;
    // this.lng = 7.809007;
    let coordsArray = this.navParams.get("mail").split(";");

    this.to = coordsArray[0].replace("MATMSG:TO:","");
    this.sub = coordsArray[1].replace("SUB:","");
    this.body = coordsArray[2].replace("BODY:","");

    console.log(this.to);
    console.log(this.sub);
    console.log(this.body);
  }

  cerrarModal(){
    this.viewController.dismiss();
  }
}
