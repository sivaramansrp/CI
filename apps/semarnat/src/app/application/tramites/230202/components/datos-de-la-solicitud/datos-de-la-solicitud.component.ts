import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Catalogo, CatalogoSelectComponent, CrosslistComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { map, merge, Subject, Subscription, takeUntil } from 'rxjs';
import { Solicitud230202State, Tramite230202Store } from '../../estados/tramite230202.store';
import { Tramite230202Query } from '../../estados/tramite230202.query';
import { PhytosanitaryReexportacionService } from '../../services/phytosanitary-reexportacion.service';
import { SELECCION } from '../../constantes/importador-exportador.enum';

@Component({
  selector: 'app-datos-de-la-solicitud',
  standalone: true,
  imports: [CommonModule, TituloComponent, FormsModule, ReactiveFormsModule, CatalogoSelectComponent, CrosslistComponent],
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrl: './datos-de-la-solicitud.component.scss',
})
export class DatosDeLaSolicitudComponent {
  /**
   * Formulario principal del trámite.
   */
  solicitudForm!: FormGroup;

  /**
   * Estado actual de la solicitud.
   */
  public solicitudState!: Solicitud230202State;

  /**
   * Sujeto para manejar la destrucción de observables.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Lista de numeroDeCertificado disponibles.
   * @type {Catalogo[]}
   */
  numeroDeCertificado!: Catalogo[];
  aduana!: Catalogo[];
  pais!: Catalogo[];
  selectRangoDias: [] = [];
  fechasSeleccionadas: Catalogo[] = [];
  fechasDatos: Catalogo[] = [];
  fecha: FormControl = new FormControl('');
  fechaSeleccionada: FormControl = new FormControl('');
  getPaisSubscription!: Subscription;

  botonField = [
    {
      btnNombre: 'Agregar ',
      class: 'btn-primary',
      funcion: () => this.agregar(''),
    },
    {
      btnNombre: 'Agregar todo',
      class: 'btn-default',
      funcion: () => this.agregar(SELECCION.SELECT_ALL),
    },
    {
      btnNombre: 'Remover',
      class: 'btn-danger',
      funcion: () => this.quitar(''),
    },
    {
      btnNombre: 'Remover todo',
      class: 'btn-default',
      funcion: () => this.quitar(SELECCION.SELECT_ALL),
    },
  ];

  constructor(
    private phytosanitaryReexportacionService: PhytosanitaryReexportacionService,
    private store: Tramite230202Store,
    private query: Tramite230202Query,
    public fb: FormBuilder
  ) {}

  /**
   * Método de inicialización del componente.
   */
  ngOnInit(): void {
    this.inicializaCatalogos();
    this.inicializarFormulario();
    // this.getPais();

    this.query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {

          this.solicitudState = seccionState;
        })
      )
      .subscribe();
  }

  /**
   * Obtiene el grupo de formulario de exención de impuestos.
   */
  get reexportacionForm(): FormGroup {
    return this.solicitudForm.get('reexportacionForm') as FormGroup;
  }

  inicializarFormulario(): void {
    this.solicitudForm = this.fb.group({
      reexportacionForm: this.fb.group({
        numeroDeCertificado: [this.solicitudState?.numeroDeCertificado, [Validators.required]],
        aduana: [this.solicitudState?.aduana, [Validators.required]],
      }),
      // Otros grupos de formulario pueden ir aquí
    });
  }

  /**
   * Inicializa los catálogos necesarios para el componente.
   */
  inicializaCatalogos(): void {
    const NUMERODECERTIFICADO$ = this.phytosanitaryReexportacionService.getNumeroDeCertificado().pipe(
      map((resp) => {
        this.numeroDeCertificado = resp.data;
      })
    );

    const ADUANA$ = this.phytosanitaryReexportacionService.getAduana().pipe(
      map((resp) => {
        this.aduana = resp.data;
      })
    );

    const PAIS$ = this.phytosanitaryReexportacionService.getPais().pipe(
      map((resp) => {
        this.pais = resp.data;
      })
    );

    merge(
      NUMERODECERTIFICADO$,
      ADUANA$,
      PAIS$
    )
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe();
  }

  numeroDeCertificadoSeleccion(): void {
    const NUMERODECERTIFICADO = this.solicitudForm.get('reexportacionForm.numeroDeCertificado')?.value;
    this.store.setNumeroDeCertificado(NUMERODECERTIFICADO);
  }

  aduanaSeleccion(): void {
    const ADUANA = this.solicitudForm.get('reexportacionForm.aduana')?.value;
    this.store.setAduana(ADUANA);
  }

  paisSeleccion(): void {
    const PAIS = this.solicitudForm.get('reexportacionForm.pais')?.value;
    this.store.setPais(PAIS);
  }

  // getPais(): void {
  //   this.getPaisSubscription = this.phytosanitaryReexportacionService
  //     .getPais()
  //     .subscribe((resp) => {
  //       if (resp.code === 200) {
  //         const RESPONSE = resp.data;
  //         this.store.setPais(RESPONSE);
  //       }
  //     });
  // }

  agregar(tipo: string) {
    if (tipo === SELECCION.SELECT_ALL) {
      this.fechasSeleccionadas = [...this.selectRangoDias];
      this.fechasDatos = [];
    } else {
      const FECHA_VALOR = this.fecha.value;
      const SELECTEDFECHA = this.fechasDatos.find(
        (fecha) => fecha.id === FECHA_VALOR
      );
      if (SELECTEDFECHA) {
        this.fechasSeleccionadas.push(SELECTEDFECHA);
        this.fechasDatos = this.fechasDatos.filter(
          (fecha) => fecha.id !== FECHA_VALOR
        );
      }
    }
    this.store.setFechasSeleccionadas(this.fechasSeleccionadas);
  }

  quitar(tipo: string = '') {
    if (tipo === SELECCION.SELECT_ALL) {
      this.fechasDatos = [...this.fechasSeleccionadas];
      this.fechasSeleccionadas = [];
    } else {
      const FECHA_VALOR = this.fechaSeleccionada.value;
      const SELECTEDFECHA = this.fechasSeleccionadas.find(
        (fecha) => fecha.id === FECHA_VALOR
      );
      if (SELECTEDFECHA) {
        this.fechasDatos.push(SELECTEDFECHA);
        this.fechasSeleccionadas = this.fechasSeleccionadas.filter(
          (fecha) => fecha.id !== FECHA_VALOR
        );
      }
    }
    this.store.setFechasSeleccionadas(this.fechasSeleccionadas);
  }
  
  /**
   * Método que se ejecuta al destruir el componente.
   * Se utiliza para limpiar las suscripciones.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
  
}
