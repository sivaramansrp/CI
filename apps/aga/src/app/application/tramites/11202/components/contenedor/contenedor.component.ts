import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contenedor11202Query } from '../../../../estados/queries/contenedor11202.query';
import {Contenedor11202State, Contenedor11202Store} from '../../../../estados/tramites/contenedor11202.store';
import { DatosTramiteService } from 'libs/shared/data-access-user/src/core/services/11202/datos-tramite.service';
import { TEXTOS_REQUISITOS } from '../../../../constantes/11202/retorno-contenedores.enum';
import { Subject,map, takeUntil } from 'rxjs';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contenedor',
  templateUrl: './contenedor.component.html',
  styleUrl: './contenedor.component.scss',
})
export class ContenedorComponent implements OnInit, OnDestroy {
  public contenedorState!: Contenedor11202State;
  TEXTOS = TEXTOS_REQUISITOS;

  private subscription: Subscription = new Subscription();
  private destroyNotifier$: Subject<void> = new Subject();

  solicitudForm!: FormGroup;
  isAdjuntarArchivoVisible: boolean = false;
  seccionAduanaaFechaVisible: boolean = false;
  seccionContenedorVisible: boolean = false;
  seccionContenedor: boolean = false;
  agregarTipoContenedorVisible: boolean = false;
  seccionExcelVisible: boolean = false;
  catalogAduanas: any[] = [];
  catalogContenedores: any[] = [];
  contenedores: any[] = [];
  archivoSeleccionado: string = '';
  cargarArchivoVisible: boolean = false;
  exceptionCaught: boolean = false;
  actionBean = { requiereGuardadoParcial: false };
  nonSelectionTextTipoContendor: string = 'Selecciona un valor';
  cargarArchivo: boolean = false;
  currentIdx: number = 0;

  constructor(
    private fb: FormBuilder,
      private datosTramiteService: DatosTramiteService,
    private contenedorStore: Contenedor11202Store,
    private contenedorQuery: Contenedor11202Query
  ) {
    
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.destroyNotifier$.next();
  }

  ngOnInit(): void {
    this.subscription.add(
      this.contenedorQuery.selectSolicitud$
        .pipe(
          takeUntil(this.destroyNotifier$),
          map((seccionState) => {
            this.contenedorState = seccionState;
          })
        )
        .subscribe()
    );
    this.crearFormSolicitud();
    this.cargarCatalogAduanas();
    this.cargarCatalogContenedores();
    this.tabSeleccionado();
  }

  cargarCatalogAduanas(): void {
    this.datosTramiteService.getAduanas().subscribe({
      next: (data: string[]) => {
        this.catalogAduanas = data;
      },
      error: (error) => {
        console.error('Error al cargar aduanas', error);
      },
    });
  }

  cargarCatalogContenedores(): void {
    this.datosTramiteService.getContenedores().subscribe({
      next: (data: string[]) => {
        this.catalogContenedores = data;
      },
      error: (error) => {
        console.error('Error al cargar contenedores', error);
      },
    });
  }

  mostrarCampos(): void {
    const TIPO_BUSQUEDA = this.solicitudForm.get('tipoBusqueda')?.value;
    if (TIPO_BUSQUEDA === 'Contenedor') {
      this.seccionContenedorVisible = false;
      this.seccionContenedor = true;
      this.seccionAduanaaFechaVisible = true;
      this.cargarArchivoVisible = false;
      this.seccionExcelVisible = false;
      this.cargarArchivo = true;
    } else if (TIPO_BUSQUEDA === 'Archivo CSV') {
      this.seccionExcelVisible = true;
      this.seccionAduanaaFechaVisible = true;
      this.seccionContenedorVisible = true;
      this.seccionContenedor = false;
      this.cargarArchivo = true;
    } else {
      this.seccionAduanaaFechaVisible = false;
      this.seccionContenedorVisible = false;
      this.seccionExcelVisible = false;
    }
  }
  limpiarCampos(): void {
    this.solicitudForm.reset();
    this.contenedores = [];
    this.archivoSeleccionado = '';
    this.exceptionCaught = false;
  }
  //incomplete
  datosCaptura(): void {
    if (this.solicitudForm.valid) {
      this.datosTramiteService
        .submitSolicitud(this.solicitudForm.value)
        .subscribe(
          (response) => {
            console.log('Solicitud enviada correctamente', response);
          },
          (error) => {
            console.error('Error al enviar solicitud', error);
            this.exceptionCaught = true;
          }
        );
    } else {
      this.exceptionCaught = true;
    }
  }
  agregarAGrid(): void {
    const NUEVO_CONTENEDOR = {
      tipoContenedor: this.datosContenedor.get('tipoContenedor')?.value,
      digito: this.solicitudForm.get('digitoDeControl')?.value,
      aduana: this.datosGenerales.get('aduana')?.value,
      inicialesContenedor: this.datosContenedor.get('inicialesContenedor')
        ?.value,
      numeroContenedor: this.datosContenedor.get('numeroContenedor')?.value,
    };

    if (NUEVO_CONTENEDOR.aduana) {
      this.contenedores.push(NUEVO_CONTENEDOR);

      this.solicitudForm.patchValue({
        contenedores: '',
        digitoDeControl: '',
      });
    } else {
      this.exceptionCaught = true;
    }
  }
  

  adjuntarArchivo(): void {
    this.cargarArchivoVisible = true;
  }

  openModalCancelarTramite(): void {
    this.solicitudForm.reset();
    this.contenedores = [];
    this.archivoSeleccionado = '';
    this.exceptionCaught = false;
  }

  tabSeleccionado(): void {
    const currentIdx = localStorage.getItem('currentIdx');
    if (currentIdx !== null) {
      this.currentIdx = +currentIdx;
      // Implementar lógica para establecer la pestaña activa basada en currentIdx
      // Si se usa una librería de pestañas, establecer el índice activo según corresponda
    }
  }

  cancelarRadioButton(): void {
    this.solicitudForm.get('tipoBusqueda')?.setValue('');
    this.mostrarCampos();
  }

  mostrarTIpoContenedor(): void {
    this.agregarTipoContenedorVisible = true;
  }

  crearFormSolicitud(): void {
    this.solicitudForm = this.fb.group({
      idSolicitud: [this.contenedorState?.idSolicitud],
      tipoBusqueda: [this.contenedorState?.tipoBusqueda, Validators.required],

      datosGenerales: this.fb.group({
        aduana: [this.contenedorState?.aduana],
      }),

      datosContenedor: this.fb.group({
        inicialesContenedor: [this.contenedorState?.inicialesContenedor],
        numeroContenedor: [this.contenedorState?.numeroContenedor],
        tipoContenedor: [this.contenedorState?.tipoContenedor],
      }),
    });

    this.mostrarCampos();
    // Escuchar cambios en tipoBusqueda para mostrar secciones
    this.solicitudForm.get('tipoBusqueda')?.valueChanges.subscribe((value) => {
      this.setValoresStore(
        this.solicitudForm,
        'tipoBusqueda',
        'setTipoBusqueda'
      );
      this.mostrarCampos();
    });
  }

  setValoresStore(form: FormGroup,campo: string,metodoNombre: keyof Contenedor11202Store): void {
    const VALOR = form.get(campo)?.value;
    (this.contenedorStore[metodoNombre] as (value: string) => void)(VALOR);
  }

  get datosGenerales(): FormGroup {
    return this.solicitudForm.get('datosGenerales') as FormGroup;
  }

  get datosContenedor(): FormGroup {
    return this.solicitudForm.get('datosContenedor') as FormGroup;
  }
}
