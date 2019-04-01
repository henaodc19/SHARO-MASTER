import {Directive, OnInit, ElementRef, Renderer2,Input} from "@angular/core";
@Directive({
    selector: '[resaltar]'
})
 export class ResaltarDirective implements OnInit{
     constructor(private elRef: ElementRef, private renderer: Renderer2){}
     @Input('credito') estado: string = '';
     ngOnInit(){
        if(this.estado === 'pagado'){
            this.renderer.setStyle(this.elRef.nativeElement,'background-color','red');
        }
     }
 }