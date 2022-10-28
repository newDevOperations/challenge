import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appShadowContainer]'
})




export class ShadowContainerDirective {

  //private defaultColor: string ="#E2E2E2";
 // private activeColor:  string ="#207CFF";

  constructor(private el: ElementRef) { 
   
  }
  

  @HostListener(`mouseenter`)
  onMouseEnter(){
    this.setBorderShadow("10px", "20px", "30px", "black");
    this.setBackground("red");
    
  }

  @HostListener(`mouseleave`)
  onMouseLeave(){
    this.setBorderShadow("none", "", "", "");
    this.setBackground("transparent");
  }

  setBackground(color: string){
    this.el.nativeElement.style.backgroundColor = `${color}`;
  }

  setBorderShadow(offsetX: string, offsetY: string, blur:string, color: string){
this.el.nativeElement.style.boxShadow = `${offsetX} ${offsetY} ${blur} ${color}`;
  }
}
