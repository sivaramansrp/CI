import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'lib-preview-documento',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './preview-documento.component.html',
})
export class PreviewDocumentoComponent implements OnInit {
  title?: string;
  rutaPdf: any;
  ruta?: string;

  constructor(public bsModalRef: BsModalRef, private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.rutaPdf = this.sanitizer.bypassSecurityTrustResourceUrl(this.ruta || '');
  }
}
