import { Component, Input, SimpleChange } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'ng-alert',
  standalone: true,
  imports: [],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent {
  @Input() CONTENIDO!: string;

  textoHTML: SafeHtml = '';

  constructor(
    private sanitizer: DomSanitizer,
   ) {}

   ngOnInit(): void {
    console.log('AlertComponent ' + this.CONTENIDO);

    this.setHTML(this.CONTENIDO);
   }

   setHTML(html: string): void {
    this.textoHTML = this.sanitizer.bypassSecurityTrustHtml(html);
   }
}
