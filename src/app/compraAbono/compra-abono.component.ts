import { Component } from '@angular/core';
import { creditosServicios } from '../servicios/creditos.servicios';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-co-ab',
  templateUrl: './compra-abono.component.html'
})
export class CompraAbonoComponent {
  credito:any = {};
  id:any;
  total = 0;
  sumaAbono:any = 0;
  sumaCompra:any = 0;
  abonoCompra:any = {};
  credit:any ={};
  edit:any ={};
  pruebaServicio:any;
  cambioBD:any;
  diferencia:any;
  sumaAbonos:any;
  nuevoSubTotal;
  idEntradaCompra;
  idEntradaAbono;
  idEntrada;
  estadoCredito;
  estadoCreditoSegundoBucle;
  subTotalCreditoSegundoBucle;
  estadoCreditoTercerBucle;
  subTotalCreditoTercerBucle;
  idSegundoBucle;
  
  constructor(private creditosServicios: creditosServicios,private route: ActivatedRoute, private afDB: AngularFireDatabase){
    this.id = this.route.snapshot.params['id'];
   
    // this.creditosServicios.getcredito(this.id)
    // .valueChanges().subscribe((edit)=>{
    //   this.edit = edit;
    //   console.log(this.edit);
    // });

      this.creditosServicios.getcredito(this.id)
      .valueChanges().subscribe((credito)=>{
        this.credito = credito;
        this.credit = Object.keys(this.credito.abonoCompra).map((key) => this.credito.abonoCompra[key]);
        this.credito.abonoCompra = this.credit;
        this.total = 0;

        for (var i in this.credito.abonoCompra) {
          this.idEntrada = this.credito.abonoCompra[i].id;
          this.pruebaServicio = this.afDB.database.ref('creditos').child(this.id).child('abonoCompra').child(this.idEntrada);
          this.pruebaServicio.on('value', snap =>{this.estadoCredito = snap.val().estado})

          if(this.credito.abonoCompra[i].vlr_compra != null && this.estadoCredito == 'vig'){
           this.total += this.credito.abonoCompra[i].vlr_compra;
          }
          if(this.credito.abonoCompra[i].vlr_compra != null && this.estadoCredito == 'abo'){
           this.total += this.credito.abonoCompra[i].subTotal;
          }
          if(this.credito.abonoCompra[i].vlr_abono != null && this.estadoCredito == 'vig'){
           for(var a in this.credito.abonoCompra){
            this.idEntrada = this.credito.abonoCompra[a].id;
            this.pruebaServicio = this.afDB.database.ref('creditos').child(this.id).child('abonoCompra').child(this.idEntrada);
            this.pruebaServicio.on('value', snap =>{this.estadoCreditoSegundoBucle = snap.val().estado});
            this.pruebaServicio.on('value', snap =>{this.subTotalCreditoSegundoBucle = snap.val().subTotal});
            this.pruebaServicio.on('value', snap =>{this.idSegundoBucle = snap.val().id});

             if(this.credito.abonoCompra[i].vlr_abono >= this.credito.abonoCompra[a].vlr_compra && this.estadoCreditoSegundoBucle == 'vig' && this.estadoCredito == 'vig'){
               this.cambioBD = this.afDB.database.ref('creditos').child(this.id).child('abonoCompra').child(this.credito.abonoCompra[i]).child('estado');
               this.cambioBD.set('pag');
               this.cambioBD = this.afDB.database.ref('creditos').child(this.id).child('abonoCompra').child(this.credito.abonoCompra[a]).child('estado');
               this.cambioBD.set('pag');
               this.diferencia = this.credito.abonoCompra[a].vlr_compra - this.credito.abonoCompra[i].vlr_abono;
               this.total = this.total - this.credito.abonoCompra[i].vlr_abono;
             }
             if(this.credito.abonoCompra[i].vlr_abono <= this.credito.abonoCompra[a].subTotal && this.estadoCreditoSegundoBucle == 'abo' && this.estadoCredito == 'vig'){
               this.idEntradaCompra = this.credito.abonoCompra[a].id;
               this.idEntradaAbono = this.credito.abonoCompra[i].id; 
               this.nuevoSubTotal = this.credito.abonoCompra[a].subTotal
               this.cambioBD = this.afDB.database.ref('creditos').child(this.id).child('abonoCompra').child(this.idEntradaCompra).child('subTotal');
               this.cambioBD.set(this.nuevoSubTotal - this.credito.abonoCompra[i].vlr_abono);
               this.total = this.total - this.credito.abonoCompra[i].vlr_abono;
               this.cambioBD = this.afDB.database.ref('creditos').child(this.id).child('abonoCompra').child(this.idEntradaAbono).child('estado');
               this.cambioBD.set('pag');
             }
             if(this.credito.abonoCompra[i].vlr_abono <= this.credito.abonoCompra[a].vlr_compra && this.estadoCreditoSegundoBucle == 'vig' && this.estadoCredito == "vig"){
               this.nuevoSubTotal = this.credito.abonoCompra[a].subTotal;
               this.idEntradaCompra = this.credito.abonoCompra[a].id;
               this.idEntradaAbono = this.credito.abonoCompra[i].id;

               this.cambioBD = this.afDB.database.ref('creditos').child(this.id).child('abonoCompra').child(this.idEntradaAbono).child('estado');
               this.cambioBD.set('pag');

               this.cambioBD = this.afDB.database.ref('creditos').child(this.id).child('abonoCompra').child(this.idEntradaCompra).child('subTotal');
               this.cambioBD.set(this.nuevoSubTotal - this.credito.abonoCompra[i].vlr_abono);
             
               this.total = this.total - this.credito.abonoCompra[i].vlr_abono;
        
               this.cambioBD = this.afDB.database.ref('creditos').child(this.id).child('abonoCompra').child(this.idEntradaCompra).child('estado');
               this.cambioBD.set('abo');
               break;
             }
             if(this.credito.abonoCompra[i].vlr_abono == this.total && this.estadoCredito == 'vig'){
               for(var t in this.credito.abonoCompra){
                 if(this.credito.abonoCompra[i].vlr_compra != null){
                   this.cambioBD = this.afDB.database.ref('creditos').child(this.id).child('abonoCompra').child(this.credito.abonoCompra[t]).child('estado');
                   this.cambioBD.set('pag');
                 }
               }
             }
             if(this.credito.abonoCompra[i].vlr_abono >= this.subTotalCreditoSegundoBucle && this.estadoCreditoSegundoBucle == 'abo' && this.estadoCredito == 'vig'){
               this.idEntradaCompra = this.credito.abonoCompra[a].id;
               this.idEntradaAbono = this.credito.abonoCompra[i].id;
               this.cambioBD = this.afDB.database.ref('creditos').child(this.id).child('abonoCompra').child(this.idEntradaAbono).child('estado');
               this.cambioBD.set('pag');
               this.cambioBD = this.afDB.database.ref('creditos').child(this.id).child('abonoCompra').child(this.idEntradaCompra).child('estado');
               this.cambioBD.set('pag');
               this.cambioBD = this.afDB.database.ref('creditos').child(this.id).child('abonoCompra').child(this.idEntradaCompra).child('subTotal');
               this.cambioBD.set(0);
               this.diferencia = this.credito.abonoCompra[i].vlr_abono - this.credito.abonoCompra[a].subTotal;
               this.total = this.total - this.credito.abonoCompra[i].vlr_abono;
               break;
             }
           }
          }
      }
      if(this.diferencia > 0){
       for(var d in this.credito.abonoCompra){
        this.idEntrada = this.credito.abonoCompra[d].id;
        this.pruebaServicio = this.afDB.database.ref('creditos').child(this.id).child('abonoCompra').child(this.idEntrada);
        this.pruebaServicio.on('value', snap =>{this.estadoCreditoTercerBucle = snap.val().estado});
        this.pruebaServicio.on('value', snap =>{this.subTotalCreditoTercerBucle = snap.val().subTotal});

         if(this.credito.abonoCompra[d].vlr_compra != null && this.estadoCreditoTercerBucle == 'vig'){
           this.idEntradaCompra = this.credito.abonoCompra[d].id;
           this.nuevoSubTotal = this.credito.abonoCompra[d].subTotal
           this.cambioBD = this.afDB.database.ref('creditos').child(this.id).child('abonoCompra').child(this.idEntradaCompra).child('subTotal');
           this.cambioBD.set(this.nuevoSubTotal - this.diferencia);
           this.cambioBD = this.afDB.database.ref('creditos').child(this.id).child('abonoCompra').child(this.idEntradaCompra).child('estado');
           this.cambioBD.set('abo');
           this.cambioBD = this.afDB.database.ref('creditos').child(this.id).child('abonoCompra').child(this.idEntradaCompra).child('subTotal');
           this.cambioBD.set(this.nuevoSubTotal - this.diferencia);
           this.diferencia = 0;
         }
         if(this.credito.abonoCompra[d].vlr_compra != null && this.estadoCreditoTercerBucle == 'abo' && this.subTotalCreditoTercerBucle >= this.diferencia && this.diferencia != 0){
           this.nuevoSubTotal = this.credito.abonoCompra[d].subTotal
           this.idEntradaCompra = this.credito.abonoCompra[d].id;
           this.cambioBD = this.afDB.database.ref('creditos').child(this.id).child('abonoCompra').child(this.idEntradaCompra).child('subTotal');
           this.cambioBD.set(this.nuevoSubTotal - this.diferencia);
           this.diferencia = 0;
         }
       }
       
     }
      this.nuevoSubTotal =0;
        
      });

        
        
      

    

    //   this.creditosServicios.getcredito(this.id)
    //   .valueChanges().subscribe((credito)=>{
    //     this.credito = credito;
    //     this.credit = Object.keys(this.credito.abonoCompra).map((key) => this.credito.abonoCompra[key]);
    //     this.credito.abonoCompra = this.credit;
    //     console.log(this.credito);
    //     console.log(this.credit);

    //     for (var i in this.credito.abonoCompra) {
    //       if(this.credito.abonoCompra[i].vlr_abono != null){
    //         this.sumaAbono += parseInt(this.credito.abonoCompra[i].vlr_abono);
    //       }
    //       else if(this.credito.abonoCompra[i].vlr_compra != null){
    //         this.sumaCompra += parseInt(this.credito.abonoCompra[i].vlr_compra);
    //       }
    //       else{
    //         this.total += 0;
    //       }
    //      }
    //      console.log(this.sumaAbono);
    //      console.log(this.sumaCompra);
    //      this.total = this.sumaCompra-this.sumaAbono;
    //      this.sumaAbono = 0;
    //      this.sumaCompra = 0;
    //      console.log(this.total);
    //      this.fech = new Date();
    //      this.credito.saldoCredito = this.credit.vlr_compra;
         
    //     });
    //     this.pruebaServicio = this.afDB.database.ref('creditos').child(this.putamadre).child('abonoCompra').child('1540079313621').child('descripcion');
    //     this.pruebaServicio.set('lala');

    // console.log(this.ultimoRegistro);
    // console.log(this.total);
    
  }
  

 
  guardarAbono(){
    console.log("putaaa");
    this.abonoCompra.id = Date.now();
    this.abonoCompra.estado = 'vig';
    this.creditosServicios.guardarAbonoCompra(this.abonoCompra,this.credito);
    alert("Abono guardado satisfactoriamente");
    this.abonoCompra={};
    
  }

  pruebaEdicion(puta){
    // this.pruebaServicio = this.afDB.database.ref('creditos').child(this.id).child('abonoCompra').child(this.idEntradaCompra).child('estado');
    // this.pruebaServicio.set(3);

    // this.aa = this.afDB.database.ref('creditos').child(this.id).child('abonoCompra').child(this.idEntradaAbono).child('vlr_abono');
    // this.aa.set(this.nuevoSubTotal - this.vlrAbono);
    this.afDB.database.ref('creditos').on('value', function(database){
      this.pruebaServicio = database.child(puta).child('nombre').val();
      console.log(this.pruebaServicio);
    });

    
  }


  guardarCompra(){
    this.abonoCompra.id = Date.now();
    this.abonoCompra.estado = 'vig';
    this.abonoCompra.subTotal = 0;
    this.creditosServicios.guardarAbonoCompra(this.abonoCompra,this.credito);
    alert("Abono guardado satisfactoriamente");
    this.abonoCompra={};
  }

  // guardarCompra(){
  //   this.compra.id = Date.now();
  //   this.creditosServicios.guardarCompra(this.compra,this.credito);
  //   alert("Abono guardado satisfactoriamente");
  //   this.compra={};
  //   // console.log(this.abono);
  // }
}
