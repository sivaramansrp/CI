import { Injectable } from '@angular/core';
import { ModalAvisoComponent } from '../../../../tramites/components/modal-aviso/modal-aviso.component';

@Injectable({
  providedIn: 'root'
})
export class ModalAvisoService {
  private modalAviso: ModalAvisoComponent[] = [];

  agrega(modal: ModalAvisoComponent): void {
    if (modal.id || this.modalAviso.find(x=> x.id === modal.id)) {
      throw new Error('El modal debe tener un id único');
    }

    this.modalAviso.push(modal);
  }

  remover(modal: ModalAvisoComponent): void {
    this.modalAviso = this.modalAviso.filter(x => x !== modal);
  }

  abrir(id: string): void {    
    const MODAL = this.modalAviso.find(x => x.id === id);
    if (!MODAL) {
      throw new Error('Modal no encontrado');
    }

    MODAL.abrir();
  }

  cerrar(): void {
    const MODAL = this.modalAviso.find(x => x.abierto);
    MODAL?.cerrar();
  }

}
