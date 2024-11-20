import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { PeticionesDBService } from '../../../services/peticiones-db.service';

@Component({
  selector: 'app-pasar-lista-m',
  templateUrl: './pasar-lista-m.page.html',
  styleUrls: ['./pasar-lista-m.page.scss'],
})
export class PasarListaMPage implements OnInit {

  matricula:string;
  codigo:string;

  constructor(
    private router:Router,
    private peticiones:PeticionesDBService,
    private alertCrl: AlertController
  ) { }

  ngOnInit() {
    let ArrayURL=this.router.url.split('/');
    this.matricula=ArrayURL[2];
    console.log(this.matricula);
    
    
  }

  registrar(){
    let body={
      'matricula':this.matricula,
      'codigo':this.codigo
    }
    this.peticiones.postCodigoClass(body).subscribe((data:any)=>{
      console.log(data);
      
      const {status, msj} = data;
      if(status){
        const {nomAlumn}=data;
        this.alertBien(msj, nomAlumn)
      }else{
        this.alertError(msj);
      }
      
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
