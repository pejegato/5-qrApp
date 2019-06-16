import {Injectable} from '@angular/core';
import {ScanData} from "../../scan-data.model";
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {Contact, Contacts} from '@ionic-native/contacts';//Modal
import {ModalController, Platform, ToastController} from "ionic-angular";
import {ContactField, ContactName} from "@ionic-native/contacts";
import { EmailComposer } from '@ionic-native/email-composer';

/*
  Generated class for the HistorialProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HistorialProvider {

  private _historial: ScanData[] = [];

  constructor(private inAppBrowser: InAppBrowser,
              private modalController: ModalController,
              private contacts: Contacts,
              private platform: Platform,
              private toastController:ToastController,
              private emailComposer: EmailComposer)
  {

  }

  agregar_historial(texto: string) {
    let data = new ScanData(texto);
    this._historial.unshift(data);
    console.log(this._historial);
    this.abrirScan(0);
  }

  abrirScan(index: number) {
    let scanData = this._historial[index];
    switch (scanData.tipo) {
      case 'http':
        this.inAppBrowser.create(scanData.info, "_system");
      case 'mapa':
        //la pagina que abriré como modal y los datos que le pasaré
        this.modalController.create("MapasPage", {coords: scanData.info}).present();
      case 'contacto':
        this.crear_contacto(scanData.info);
      case 'mail':
        this.modalController.create("MailPage", {mail: scanData.info}).present();


    }
  }

  cargar_historial() {
    return this._historial;
  }

  private crear_contacto(texto: string) {
    let campos: any = this.parse_vcard(texto);

    let nombre = campos["fn"];
    let fono = campos["tel"][0]["value"][0];

    if(!this.platform.is("cordova")){
      console.log("No se puede crear contacto por estar en el pc");
      return
    }
    console.log(campos);

    let contact: Contact = this.contacts.create();

    contact.name = new ContactName(null, nombre);
    contact.phoneNumbers = [new ContactField('mobile', fono)];

    contact.save().then(()=> this.crear_toast("Contacto "+nombre+" creado")),
      (error)=> this.crear_toast("Error: "+error);
  }

  private crear_toast(mensaje: string){
    
    this.toastController.create({
      message: mensaje,
      duration: 5500
    }).present()
  }

  private parse_vcard(input: string) {

    var Re1 = /^(version|fn|title|org):(.+)$/i;
    var Re2 = /^([^:;]+);([^:]+):(.+)$/;
    var ReKey = /item\d{1,2}\./;
    var fields = {};

    input.split(/\r\n|\r|\n/).forEach(function (line) {
      var results, key;

      if (Re1.test(line)) {
        results = line.match(Re1);
        key = results[1].toLowerCase();
        fields[key] = results[2];
      } else if (Re2.test(line)) {
        results = line.match(Re2);
        key = results[1].replace(ReKey, '').toLowerCase();

        var meta = {};
        results[2].split(';')
          .map(function (p, i) {
            var match = p.match(/([a-z]+)=(.*)/i);
            if (match) {
              return [match[1], match[2]];
            } else {
              return ["TYPE" + (i === 0 ? "" : i), p];
            }
          })
          .forEach(function (p) {
            meta[p[0]] = p[1];
          });

        if (!fields[key]) fields[key] = [];

        fields[key].push({
          meta: meta,
          value: results[3].split(';')
        })
      }
    });

    return fields;
  };
}
