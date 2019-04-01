import { Component } from '@angular/core';
import { creditosServicios } from '../servicios/creditos.servicios';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-credito',
  templateUrl: './creditos.component.html'
})
export class CreditoComponent {
  credito:any = {};
  abono:any = {};
  creditos = null;
  total:any = 0;
  saldoCredito;
  buscar:any;
  id:any;
  edit = {};
  constructor(private creditosServicios: creditosServicios,private route: ActivatedRoute){
    // this.creditos = creditosServicios.getCreditos();
    creditosServicios.getCreditos()
    .valueChanges().subscribe(creditos =>{
      this.creditos = creditos;
      console.log(this.creditos);
      
    });

    
  
  }

  editarCredito(){
    this.creditosServicios.getcredito(this.id)
    .valueChanges().subscribe((edit)=>{
      this.edit = edit;
      console.log(this.edit);
    });
  }
  
  guardarCredito(){
    this.credito.id = Date.now();
    this.credito.abono = Date.now();
    this.credito.saldoCredito = 0;
    this.creditosServicios.guardarCredito(this.credito);
    alert("Credito guardado satisfactoriamente");
    this.credito={};
  }
}
