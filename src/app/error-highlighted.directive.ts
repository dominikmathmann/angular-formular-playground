import { Directive, ElementRef, Renderer2, HostBinding, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';
import { identifierModuleUrl } from '@angular/compiler';
import { TouchSequence } from 'selenium-webdriver';

@Directive({
  selector: 'input'
})
export class ErrorHighlightedDirective {
  private static readonly ERROR_CLASS = ['badge', 'badge-warning'];

  parent: any;

  currentErrorElement: any;

  constructor(private el: ElementRef, private renderer: Renderer2, private formControlName: NgControl) {
    this.parent = renderer.parentNode(this.el.nativeElement);
  }

  @HostListener('change')
  private onChange() {
    if (this.formControlName.invalid && !this.currentErrorElement) {
      this.currentErrorElement = this.createErrorElement();
      this.renderer.appendChild(this.parent, this.currentErrorElement);
    } else if (this.currentErrorElement) {
      this.renderer.removeChild(this.parent, this.currentErrorElement);
      this.currentErrorElement = null;
    }
  }

  ngAfterViewInit() {
    console.log(this.formControlName);
  }

  private createErrorElement(msg: string = 'Fehlerhafte Eingabe'): any {
    let ep = this.renderer.createElement('span');
    ErrorHighlightedDirective.ERROR_CLASS.forEach(c => this.renderer.addClass(ep, c));

    this.renderer.setProperty(ep, 'innerHTML', msg);
    return ep;
  }
}
