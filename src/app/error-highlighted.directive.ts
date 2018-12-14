import {
  Directive,
  ElementRef,
  Renderer2,
  HostBinding,
  HostListener,
  ViewChild,
  ContentChild,
  Input
} from '@angular/core';
import { NgControl, FormControl, FormControlName } from '@angular/forms';
import { identifierModuleUrl } from '@angular/compiler';
import { TouchSequence } from 'selenium-webdriver';

@Directive({
  selector: '.form-group'
})
export class ErrorHighlightedDirective {
  private static readonly ERROR_CLASS = ['badge', 'badge-warning'];

  currentErrorElement: any;

  @ContentChild(FormControlName)
  formControlName: any;

  private boolean;

  private label: string = '';

  @Input()
  showLabel = true;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('change')
  private onChange() {
    if (this.formControlName.invalid && !this.currentErrorElement) {
      this.currentErrorElement = this.createErrorElement();
      this.renderer.appendChild(this.el.nativeElement, this.currentErrorElement);
    } else if (this.formControlName.valid && this.currentErrorElement) {
      this.renderer.removeChild(this.el.nativeElement, this.currentErrorElement);
      this.currentErrorElement = null;
    }
  }

  ngAfterViewInit() {
    for (let child of this.el.nativeElement.children) {
      if (child.nodeName == 'LABEL') {
        this.label = child.innerText;
      }
    }
    console.log(this.formControlName);
  }

  private createErrorElement(msg: string = 'Fehlerhafte Eingabe'): any {
    let ep = this.renderer.createElement('span');
    ErrorHighlightedDirective.ERROR_CLASS.forEach(c => this.renderer.addClass(ep, c));

    this.renderer.setProperty(ep, 'innerHTML', this.showLabel ? `${this.label} : ${msg}` : msg);
    return ep;
  }
}
