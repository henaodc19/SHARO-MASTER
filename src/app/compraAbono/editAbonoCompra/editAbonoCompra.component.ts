import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { creditosServicios } from '../../servicios/creditos.servicios';


@Component({
  selector: 'app-detCom',
  templateUrl: './editAbonoCompra.component.html'
})
export class editAbonoCompraComponent {
  edit = {};
  credito:any = {};
  cre = {};
  regulador = false;
  id:any;
  credit = {};
  abonoCompra = {};

  constructor(private creditosServicios: creditosServicios,private route: ActivatedRoute){
    this.id = this.route.snapshot.params['id'];

    this.creditosServicios.getcredito2()
    .valueChanges().subscribe((credito)=>{
      this.credito = credito;
      console.log(this.credito);
      for (var i in credito) {
       this.cre = credito[i]; 
       this.credit = this.credito[i].abonoCompra;
       for (var a in this.credit) {
        if(this.credit[a].id == this.id){
          this.abonoCompra = this.credit[a];
          this.regulador = true;
          }
        }
        if(this.regulador != false){
          break;
        }
       }
       console.log(this.abonoCompra);
    });

  }
  editarAbonoCompra(){
    this.creditosServicios.editarAbonoCompra(this.abonoCompra,this.cre);
    alert("Editado correctamente");
  }
}
