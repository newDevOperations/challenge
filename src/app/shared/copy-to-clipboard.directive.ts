import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appCopyToClipboard]'
})
export class CopyToClipboardDirective {
  @Output() clickAndCopy = new EventEmitter();

  constructor(private elementRef: ElementRef) { }

  @HostListener('click') onClick() {
    const el = document.createElement('textarea');
    el.value = this.elementRef.nativeElement.innerText;
   // document.body.appendChild(el);
    //el.select();
    
    navigator.clipboard.writeText(el.value);
   // document.execCommand('copy');
   //document.body.removeChild(el);
  }
}