import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'ng-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent implements OnInit {
  @Input() CONTENIDO!: string;
  @Input() CUSTOMECLASS!: string;

  textoHTML: SafeHtml = '';

  constructor(
    private sanitizer: DomSanitizer,
   ) {}

   ngOnInit(): void {
    this.setHTML(this.CONTENIDO);
   }

   setHTML(html: string): void {
    this.textoHTML = this.sanitizer.bypassSecurityTrustHtml(html);
   }

}
