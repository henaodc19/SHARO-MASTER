import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { creditosServicios } from '../../servicios/creditos.servicios';

@Component({
  selector: 'app-editCredito',
  templateUrl: './editCreditos.component.html'
})
export class editCreditoComponent {
    id:any;
    edit = {};
    constructor(private creditosServicios: creditosServicios,private route: ActivatedRoute){
        this.id = this.route.snapshot.params['id'];
        this.creditosServicios.getcredito(this.id)
        .valueChanges().subscribe((edit)=>{
          this.edit = edit;
          console.log(this.edit);
        });
    }

    guardarEditCredito(){
        this.creditosServicios.guardarEditCredito(this.edit);
        alert("Credito editado satisfactoriamente");
      }
}