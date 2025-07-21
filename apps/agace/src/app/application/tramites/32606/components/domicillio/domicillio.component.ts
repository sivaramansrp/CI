import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Catalogo, CatalogoSelectComponent, InputRadioComponent, Notificacion, NotificacionesComponent, Pedimento, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { DOMICILIO_CATALOGO, DOMICILLIO_TABLA, ENTIDAD_CATALOGO, ENTIDAD_TABLA, RADIO_07 } from '../../constantes/adace32606.enum';
import { Domicillio, EntidadFederativa } from '../../models/adace.model';
import { EconomicoService } from '../../services/economico.service';
import { Tramite32606Query } from '../../state/Tramite32606.query';
import { Tramite32606Store } from '../../state/Tramite32606.store';
import { ReplaySubject, takeUntil } from 'rxjs';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-domicillio',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CatalogoSelectComponent, TablaDinamicaComponent, InputRadioComponent, TituloComponent,
    NotificacionesComponent],
  templateUrl: './domicillio.component.html',
  styleUrl: './domicillio.component.css',
})
export class DomicillioComponent implements OnInit, OnDestroy {

  public domicillioForm!: FormGroup;
  public domicillio = DOMICILIO_CATALOGO;
  public entidadFederativa = ENTIDAD_CATALOGO;
  public TablaSeleccion = TablaSeleccion;
  public domicillioTabla = DOMICILLIO_TABLA;
  public entidadTabla = ENTIDAD_TABLA;
  public domicillioDatos: Domicillio[] = [];
  radioOpcions07 = RADIO_07;
  nombreArchivo: string = '';
  nombreArchivo2: string = '';
  public nuevaNotificacion!: Notificacion;
  public elementoParaEliminar!: number;
  public pedimentos: Array<Pedimento> = [];
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  @ViewChild('modalAgregar') modalElement!: ElementRef;
  @ViewChild('closeModal') closeModalButton!: ElementRef;
  public entidadTablaDatos: EntidadFederativa[] = [];

  constructor(private economico: EconomicoService,
    public query: Tramite32606Query,
    public store: Tramite32606Store,
    private fb: FormBuilder
  ) {
    this.domicillioDatos = [];
   }

  ngOnInit(): void {
    this.donanteDomicilio();
    this.obtenerDomicillio();
    this.obtenerEntidad();
    this.obtenerTablaEntidad();
    this.obtenerTablaDomicillio();

  }

  public seleccionarModificar(): void {
    this.abrirModal();
  }

  public onAgregarClick(): void {
    if (this.modalElement) {
      const MODAL_INSTANCE = new Modal(this.modalElement.nativeElement);
      MODAL_INSTANCE.show();
    }
  }

  eliminarPedimento(borrar: boolean): void {
    if (borrar) {
      this.pedimentos.splice(this.elementoParaEliminar, 1);
    }

  }

  abrirModal(i: number = 0): void {
    this.nuevaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: '',
      mensaje: 'No se encontró información',
      cerrar: false,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: '',
    }
    this.elementoParaEliminar = i;
  }

  obtenerDomicillio(): void {
    this.economico
      .obtenerDomicillio()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((resp): void => {
        this.domicillio.catalogos = resp as Catalogo[];
      });
  }

  obtenerEntidad(): void {
    this.economico
      .obtenerEntidad()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((resp): void => {
        this.entidadFederativa.catalogos = resp as Catalogo[];
      });
  }

  public obtenerTablaEntidad(): void {
    this.economico
      .obtenerTablaEntidad()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.entidadTablaDatos = data;
      });
  }

  public obtenerTablaDomicillio(): void {
    this.economico
      .obtenerTablaDomicillio()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.domicillioDatos = data;
      });
  }

   donanteDomicilio(): void {
    this.domicillioForm = this.fb.group({
      domicillio: [''],
      entidadFederativa: [''],
      tipoRadio12: [''],
      tipoRadio13: [''],
      file1: [''],
      file2: [''],
      actualmente: [''],
      actualmente2: [''],

    });
  }

  alSeleccionarArchivo(event: Event): void {
    const TARGET = event.target as HTMLInputElement;
    const FILE = TARGET?.files ? TARGET.files[0] : null;
    this.nombreArchivo = FILE ? FILE.name : '';
    this.domicillioForm.patchValue({
      archivo: FILE,
    });
  }

  alSeleccionarArchivo2(event: Event): void {
    const TARGET = event.target as HTMLInputElement;
    const FILE = TARGET?.files ? TARGET.files[0] : null;
    this.nombreArchivo2 = FILE ? FILE.name : '';
    this.domicillioForm.patchValue({
      archivo2: FILE,
    });
  }

  public onAceptarAgregar(): void {
  // const seleccionados = this.entidadTablaDatos.filter((row: any) => row.selected);

  // if (seleccionados.length > 0) {
   
  //   this.domicillioDatos = seleccionados as Domicillio[];
    
  // } else {
  //   Domicillio[] = [];
  // }
}

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
