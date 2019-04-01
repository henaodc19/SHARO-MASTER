import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import {ResaltarDirective} from "./directivas/resaltar.directivas";
import {AccordionModule} from 'primeng/accordion';    
import {MenuItem} from 'primeng/api';
import {Routes, RouterModule} from '@angular/router'; 
import {CreditoComponent} from "./creditos/creditos.component";
import {CompraAbonoComponent} from "./compraAbono/compra-abono.component"; 
import {DetalleAbonoComponent} from "./compraAbono/detalleAbono/detalleAbono.component";import { AngularFirestoreModule } from '@angular/fire/firestore';
import { creditosServicios } from './servicios/creditos.servicios';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FilterPipe } from './pipes/filter.pipe';
import { editAbonoCompraComponent } from './compraAbono/editAbonoCompra/editAbonoCompra.component';
import { editCreditoComponent } from './creditos/editCreditos/editCreditos.component';
import { reporteSaldos } from './reportes/reporteSaldos.component';








export const firebaseConfig = {
    apiKey: "AIzaSyAFgS-k6pV5dEiYgBMb6ppuk-OTIg50Hiw",
    authDomain: "sharo-ffc0a.firebaseapp.com",
    databaseURL: "https://sharo-ffc0a.firebaseio.com",
    storageBucket: "sharo-ffc0a.appspot.com",
    messagingSenderId: "113254230354"
};

const appRoutes: Routes =[
  {path:'creditos', component: CreditoComponent},
  {path:'creditos/edit/:id', component: editCreditoComponent},
  {path:'compra-abono/:id', component: CompraAbonoComponent},
  {path:'compraAbono-edit/:id', component: editAbonoCompraComponent},
  {path:'reportes', component: reporteSaldos}
  // {path:'compra-abono/detalleAbono', component: DetalleAbonoComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    ResaltarDirective,
    CreditoComponent,
    CompraAbonoComponent,
    editAbonoCompraComponent,
    DetalleAbonoComponent,
    editCreditoComponent,
    FilterPipe,
    reporteSaldos,
    
    
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
    
    
  ],
  providers: [creditosServicios],
  bootstrap: [AppComponent]
})
export class AppModule { }
