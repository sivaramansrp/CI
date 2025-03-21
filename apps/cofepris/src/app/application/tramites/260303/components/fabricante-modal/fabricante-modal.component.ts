/* eslint-disable sort-imports */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Catalogo } from '@libs/shared/data-access-user/src';

@Component({
  selector: 'app-fabricante-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fabricante-modal.component.html',
  styleUrl: './fabricante-modal.component.scss',
})
export class FabricanteModalComponent {

  titulo: string;
  public paisCatalogo!: Catalogo[];
  
  constructor(
    public bsModalRef: BsModalRef,
  ) {
    this.titulo = '';
  }
  
}
