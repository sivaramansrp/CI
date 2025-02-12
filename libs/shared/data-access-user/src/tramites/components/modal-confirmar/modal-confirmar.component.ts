import { Component, Input, input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-modal-confirmar',
  standalone: true,
  imports: [],
  templateUrl: './modal-confirmar.component.html',
  styleUrl: './modal-confirmar.component.scss',
})
export class ModalConfirmarComponent {
  @Input() cancelarBtnTxt: string = '';
  @Input() confirmarBtnTxt: string = '';
  @Input() txtMensaje: string = '';
  @Input() txtCuerpoHtml: string = '';


  txtHtml: SafeHtml | string = '';

  constructor( private sanitizier : DomSanitizer ) {}


  get getHtml() {
    return this.txtCuerpoHtml !== '' ? true : false;
  }

  ngOnInit() : void {
    this.setHtml(this.txtCuerpoHtml);
  }

  cerrarModal( result: boolean): void {
  //  Cerrar Modal
  }

  setHtml( html: string): void {
    this.txtHtml = this.sanitizier.bypassSecurityTrustHtml(html);
  }



}
