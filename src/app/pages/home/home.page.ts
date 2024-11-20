/* eslint-disable no-trailing-spaces */
/* eslint-disable eqeqeq */
import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../../services/get-data.service';
import { ParametrosPagesService } from '../../services/parametros-pages.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { PeticionesDBService } from '../../services/peticiones-db.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  alumno: any;
  opcionesHome: any;
  matricula: string;


  constructor(
    private opciones: GetDataService,
    private recibirObj: ParametrosPagesService,
    private router: Router,
    private alertCtl: AlertController,
    private barcode:BarcodeScanner,
    private peticion:PeticionesDBService,
    private alertCrl: AlertController
  ) {
    this.opcionesHome = this.opciones.getOptions();
    
  }

  ngOnInit() {
    this.recibirObj.$getObjeto.subscribe((data: any) => {
      this.alumno = data;
      this.matricula = data.matriculaAlumn;
      // console.log(`Matricula ${this.matricula}`);
      if (this.alumno.nombre == null) {
        //this.router.navigate(['/inicio']);
      }
    });
  }

  async cerrarSesion(){
    // eslint-disable-next-line no-trailing-spaces
      const alert = await this.alertCtl.create({
        header: '¿Deseas Cerrar Sesion?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary'
          }, {
            text: 'Confirmar',
            handler: () => {
              this.router.navigate(['/inicio']);
            }
          }
        ]
      });
      await alert.present();

  }

  pasarListaCodigoQR(){
    this.barcode.scan().then((response)=>{
      let body={
        'matricula':this.matricula,
        'codigo':response.text
      }
      this.peticion.postCodigoClass(body).subscribe((data:any)=>{
        console.log(data);
        
        const {status, msj} = data;
        if(status){
          const {nomAlumn}=data;
          this.alertBien(msj, nomAlumn)
        }else{
          this.alertError(msj);
        }
        
      });
    });
  }

  
  async alertError(msj:string) {
    const alert = await this.alertCrl.create({
      header: 'Error',
      message: msj,
      buttons: ['OK']
    });
  
    await alert.present();
  }
  async alertBien(msj:string, nombre:string) {
    const alert = await this.alertCrl.create({
      header: `Alumno ${nombre}`,
      subHeader:`Matricula ${this.matricula}`,
      message: msj,
      buttons: ['OK']
    });
  
    await alert.present();
  }




}
