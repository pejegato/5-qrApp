import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ScanData} from "../../scan-data.model";
import {InAppBrowser} from "@ionic-native/in-app-browser/ngx";

/*
  Generated class for the HistorialProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HistorialProvider {

  private _historial:ScanData[] = [];

  constructor(private inAppBrowser: InAppBrowser) {

  }

  agregar_historial(texto:string){
    let data = new ScanData(texto);
    this._historial.unshift(data);
    console.log(this._historial);
    this.abrirScan(0);
  }

  abrirScan(index:number){
    let scanData = this._historial[index];
    switch (scanData.tipo) {
      case 'http':
      this.inAppBrowser.create(scanData.info, "_system");
    }
  }
  cargar_historial(){
    return this._historial;
  }

}
