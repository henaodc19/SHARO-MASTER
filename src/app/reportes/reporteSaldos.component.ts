import { Component } from '@angular/core';
import { creditosServicios } from '../servicios/creditos.servicios';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-report',
  templateUrl: './reporteSaldos.component.html'
})
export class reporteSaldos {
  credito = {};
  credit = {};
  abonoCompra = {};
  pba = [];
  pba2 = [];
  fecha_ini:any;
  fecha_fin:any;
  fecha_ini_min:any;
  fecha_fin_min:any;
  diferencia_fch:any;
  pruebaArray = [];
  ll = [1,2,3,4];
  dd:any;
  constructor(private creditosServicios: creditosServicios,private route: ActivatedRoute){
   
  }

  prueba(){
    alert(this.fecha_ini);
    this.fecha_ini_min = Date.parse(this.fecha_ini);
    this.fecha_fin_min = Date.parse(this.fecha_fin);
    this.diferencia_fch = this.fecha_ini_min - 2592000000;
    console.log(this.diferencia_fch);
    console.log(this.fecha_ini_min);

    this.creditosServicios.getcredito2()
    .valueChanges().subscribe((credito)=>{
      this.credito = credito;
      console.log(this.credito);
      for (var i in credito) { 
       this.credit = this.credito[i].abonoCompra;
       for (var a in this.credit) {
         if(this.credit[a].vlr_abono > 0){
          this.pruebaArray.push(this.credit[a]);
         }
         console.log(this.pruebaArray);
         this.dd = this.pruebaArray.pop();
         console.log(this.dd);
         if(this.credit[a].id < this.diferencia_fch){
          this.pba.push(this.credit[a]);
          this.pba2.push(this.credito[i]);
         }
        }
       }
       console.log(this.pba);
       console.log(this.pba2);
    });
  }
  
}
