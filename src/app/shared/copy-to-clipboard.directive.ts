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
    navigator.clipboard.writeText(el.value);
  }
}