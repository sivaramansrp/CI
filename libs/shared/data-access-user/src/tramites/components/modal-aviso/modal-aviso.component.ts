import { Component, ElementRef, Input, input, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ModalAvisoService } from '../../../core/services/shared/modal-aviso/modal-aviso.service';

@Component({
  selector: 'lib-modal-aviso',
  standalone: true,
  imports: [],
  templateUrl: './modal-aviso.component.html',
  styleUrl: './modal-aviso.component.scss',
})
export class ModalAvisoComponent implements OnInit, OnDestroy {
  @Input() id: string = '';
  abierto: boolean = false;

  private elemento: HTMLElement | null = null;

  constructor(
    private modalAvisoService: ModalAvisoService,
    private el: ElementRef,
  ) { }

  ngOnInit(): void {
    this.modalAvisoService.agrega(this);
    document.body.appendChild(this.el.nativeElement);
    this.elemento?.addEventListener('click', (e: MouseEvent) => {
      if (e.target && (e.target as HTMLElement).className === 'modal-aviso') {
        this.cerrar();
      }
    });
  }

  ngOnDestroy(): void {
    this.modalAvisoService.remover(this);
    this.elemento?.remove();
  }

  abrir(): void {
    if (this.elemento) {
      this.elemento.style.display = 'block';
    }
    document.body.classList.remove('modal-open');
    this.abierto = false;  
  }

  cerrar(): void {
    if (this.elemento) {
      this.elemento.style.display = 'none';
    }
    document.body.classList.add('modal-open');
    this.abierto = false;
  }








}
