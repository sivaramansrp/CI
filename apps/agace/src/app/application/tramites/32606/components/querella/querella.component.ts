import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputRadioComponent, TituloComponent, InputCheckComponent, TablaDinamicaComponent, TablaSeleccion, Pedimento, Notificacion, NotificacionesComponent } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { QUERELLA_TABLA, RADIO_08 } from '../../constantes/adace32606.enum';
import { EconomicoService } from '../../services/economico.service';
import { Tramite32606Store } from '../../state/Tramite32606.store';
import { Tramite32606Query } from '../../state/Tramite32606.query';
import { Modal } from 'bootstrap';
import { Querella } from '../../models/adace.model';
import { ReplaySubject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-querella',
  standalone: true,
  imports: [CommonModule, TituloComponent, ReactiveFormsModule, InputRadioComponent, InputCheckComponent,
    TablaDinamicaComponent, NotificacionesComponent
  ],
  templateUrl: './querella.component.html',
  styleUrl: './querella.component.css',
})
export class QuerellaComponent implements OnInit, OnDestroy {
  public querellaForm!: FormGroup;
  radioOpcions08 = RADIO_08;
  TablaSeleccion = TablaSeleccion;
  public querellaTabla = QUERELLA_TABLA;
  @ViewChild('modalAlerta') modalElement!: ElementRef;
  public pedimentos: Array<Pedimento> = [];
  public elementoParaEliminar!: number;
  public nuevaNotificacion!: Notificacion;
  public querellaDatos: Querella[] = [];
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(private economico: EconomicoService,
    public query: Tramite32606Query,
    public store: Tramite32606Store,
    private fb: FormBuilder) { }



  ngOnInit(): void {
    this.donanteDomicilio();
    this.obtenerTablaQuerella();
  }

  public seleccionarAgregar(): void {
    if (this.modalElement) {
      const MODAL_INSTANCE = new Modal(this.modalElement.nativeElement);
      MODAL_INSTANCE.show();
    }
    this.abrirModal();
  }

  eliminarPedimento(borrar: boolean): void {
    if (borrar) {
      this.pedimentos.splice(this.elementoParaEliminar, 1);
    }
  }

  // Abre el modal y configura la notificación para eliminar un pedimento.
  abrirModal(i: number = 0): void {
    this.nuevaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: '',
      mensaje: 'Datos guardados correctamente.',
      cerrar: false,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: '',
    }
    this.elementoParaEliminar = i;
  }

    public obtenerTablaQuerella(): void {
    this.economico
      .obtenerTablaQuerella()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.querellaDatos = data;
      });
  }

  donanteDomicilio(): void {
    this.querellaForm = this.fb.group({
      tipoRadio18: [''],
      tipoRadio19: [''],
      tipoRadio20: [''],
      sistemaIdentificacion: [''],
      lugarRadicacion: [''],
      sistemaControlInventarios: [false],
    });
  }

  ngOnDestroy(): void {
  }
}
