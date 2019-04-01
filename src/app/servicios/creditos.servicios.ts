import {Injectable} from "@angular/core";
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class creditosServicios{
    constructor(private afDB: AngularFireDatabase) {}
    public getCreditos(){
        return this.afDB.list('creditos/');
        // return this.creditos;
    }


    
    public guardarCredito(credito){
        console.log(credito);
        this.afDB.database.ref('creditos/'+ credito.id).set(credito);
    }

    public guardarEditCredito(credito){
        console.log(credito);
        this.afDB.database.ref('creditos/'+ credito.id).set(credito);
    }

    public guardarEditSaldo(credito){
        console.log(credito);
        this.afDB.database.ref('creditos/'+ credito.id).set(credito);
    }

    // public guardarAbono(abono,credito){
    //     console.log(abono);
    //     this.afDB.database.ref('creditos/'+ credito.id + '/abonoCompra/'+ abono.id).set(abono);
    // }

    public guardarAbonoCompra(abonoCompra,credito){
        this.afDB.database.ref('creditos/'+ credito.id + '/abonoCompra/'+ abonoCompra.id).set(abonoCompra);
    }

    public editarAbonoCompra(abonoCompra,credit){
        this.afDB.database.ref('creditos/'+ credit.id + '/abonoCompra/'+ abonoCompra.id).set(abonoCompra);
    }

    public pruebaEdicion(abonoCompra,credit){
        this.afDB.database.ref('creditos/'+ credit.id + '/abonoCompra/'+ abonoCompra.id).set(abonoCompra.direccion);
    }
    // public guardarCompra(compra,credito){
    //     console.log(compra);
    //     this.afDB.database.ref('creditos/'+ credito.id + '/abonoCompra/'+ compra.id).set(compra);
    // }

    public getcredito(id){
        return this.afDB.object('creditos/'+ id);
    }

    public getcredito2(){
        return this.afDB.object('creditos/');
    }
}