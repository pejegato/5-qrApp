import {Component} from '@angular/core';
import {BarcodeScanner} from '@ionic-native/barcode-scanner';
import {Platform, ToastController} from "ionic-angular";
import {HistorialProvider} from "../../providers/historial/historial";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  constructor(
    private barcodeScanner: BarcodeScanner,
    private toastController: ToastController,
    private platform: Platform,
    private historialProvider: HistorialProvider


  ) {

  }

  scan(){
    if(!this.platform.is('cordova')){
      //this.historialProvider.agregar_historial("http://www.meristation.com");
      //this.historialProvider.agregar_historial("geo:33.455948,70.6651342,21,500");

      this.historialProvider.agregar_historial( `BEGIN:VCARD
VERSION:2.1
N:Kent;Clark
FN:Clark Kent
ORG:
TEL;HOME;VOICE:12345
TEL;TYPE=cell:67890
ADR;TYPE=work:;;;
EMAIL:clark@superman.com
END:VCARD` );
      return;

    }else{
      this.barcodeScanner.scan().then(barcodeData => {
        console.log('Data del scan', barcodeData);

        if(!barcodeData.cancelled && barcodeData.text){
          this.historialProvider.agregar_historial(barcodeData.text);
        }

      }).catch(err => {
        this.mostrarError('Error: '+ err);
      });

    }

  };

  mostrarError(mensaje:string){
    let toast = this.toastController.create({
      message:mensaje,
      duration:2000
    });

    toast.present();
  }

}
