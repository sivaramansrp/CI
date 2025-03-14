import { Component, Input, input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'lib-modal-confirmar',
  standalone: true,
  imports: [],
  templateUrl: './modal-confirmar.component.html',
  styleUrl: './modal-confirmar.component.scss'
})
export class ModalConfirmarComponent {

  cancelarBtnTxt = 'Cancelar';
  confirmarBtnTxt = 'Confirmar';
  txtCuerpoHtml = '';
  titulo?: string;

  txtHtml: SafeHtml | string = '';

  constructor(private sanitizier: DomSanitizer, public bsModalRef: BsModalRef) {
  }

  get getHtml() {
    return this.txtCuerpoHtml !== '';
  }

  ngOnInit(): void {
    this.setHtml(this.txtCuerpoHtml);
  }

  cerrarModal(result: boolean): void {
    console.log(result);
    this.bsModalRef.onHide?.emit(result);
    this.bsModalRef.hide();
  }

  setHtml(html: string): void {
    this.txtHtml = this.sanitizier.bypassSecurityTrustHtml(html);
  }


}
