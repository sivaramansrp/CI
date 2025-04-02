import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CatalogoSelectComponent,
  CatalogosSelect,
  TableComponent,
  TituloComponent,
  ValidacionesFormularioService,
} from '@libs/shared/data-access-user/src';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  Catalogo,
  Solicitud10302State,
  Tramite10302Store,
} from '../estados/tramite10302.store';
import { Tramite10302Query } from '../estados/tramite10302.query';
import { ImportadorExportadorService } from '../services/importador-exportador.service';
import { map, Subject, Subscription, takeUntil } from 'rxjs';

@Component({
  selector: 'app-datos-tramite',
  standalone: true,
  imports: [
    CommonModule,
    TableComponent,
    TituloComponent,
    CatalogoSelectComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './datosTramite.component.html',
  styleUrl: './datosTramite.component.scss',
})
export class DatosTramiteComponent {
  /**
   * Formulario de trámite.
   */
  tramiteForm!: FormGroup;
  private destroyNotifier$: Subject<void> = new Subject();
  /**
   * Estado de la solicitud.
   */
  public solicitudState!: Solicitud10302State;
  /**
   * Suscripciones a observables.
   */
  private subscriptions: Subscription[] = [];
  showTabla = true;
  /**
   * Catálogo de aduanas.
   */
  aduana!: CatalogosSelect;
  /**
   * Suscripción para obtener el catálogo de aduanas.
   */
  getAduanaIngresaraSubscription!: Subscription;
  fechasSeleccionadas: Catalogo[] = [];

  /**
   * Encabezados de la tabla.
   */
  encabezadosTabla: string[] = [
    'Fines a los que se destinará la mercancía',
    'Tipo de mercancía',
    'Año',
    'Modelo',
    'Marca',
    'Número de serie',
    'Uso específico de la mercancía',
  ];

  constructor(
    private importarExportar: ImportadorExportadorService,
    private store: Tramite10302Store,
    private query: Tramite10302Query,
    private fb: FormBuilder,
    private validacionesService: ValidacionesFormularioService
  ) {
    // El constructor se utiliza para la inyección de dependencias.
  }

  ngOnInit(): void {
    this.getAduanaIngresara();

    this.query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
    this.donanteDomicilio();

    this.subscriptions.push(
      this.query.selectFechasSeleccionadas$.subscribe((fechas) => {
        this.fechasSeleccionadas = fechas ?? [];
      })
    );
    this.subscriptions.push(
      this.query.selectAduana$.subscribe((aduana) => {
        this.aduana = {
          labelNombre: 'Aduana por la que ingresará la mercancía',
          required: false,
          primerOpcion: 'Selecciona un valor',
          catalogos: aduana ?? [],
        };
      })
    );
  }

  /**
   * Inicializa el formulario de donante y domicilio con los valores del estado de la solicitud.
   */
  donanteDomicilio(): void {
    this.tramiteForm = this.fb.group({
      importadorExportador: this.fb.group({
        aduana: [this.solicitudState?.aduana, [Validators.required]],
        organismoPublico: [this.solicitudState?.organismoPublico, Validators.required],
        // nombre: [
        //   this.solicitudState?.nombre,
        //   [Validators.required, Validators.maxLength(50)],
        // ],
        // tipoMercancia: [
        //   this.solicitudState?.tipoMercancia,
        //   [Validators.required, Validators.maxLength(100)],
        // ],
        usoEspecifico: [
          this.solicitudState?.usoEspecifico,
          [Validators.required, Validators.maxLength(512)],
        ],
        // condicion: [this.solicitudState?.condicion, Validators.required],
        // marca: [
        //   this.solicitudState?.marca,
        //   [Validators.required, Validators.maxLength(50)],
        // ],
        // ano: [this.solicitudState?.ano, [Validators.required]],
        // modelo: [
        //   this.solicitudState?.modelo,
        //   [Validators.required, Validators.maxLength(50)],
        // ],
        // serie: [
        //   this.solicitudState?.serie,
        //   [Validators.required, Validators.maxLength(50)],
        // ],
        // calle: [
        //   this.solicitudState?.calle,
        //   [Validators.required, Validators.maxLength(100)],
        // ],
        // numeroExterior: [
        //   this.solicitudState?.numeroExterior,
        //   [Validators.required, Validators.maxLength(10)],
        // ],
        // numeroInterior: [
        //   this.solicitudState?.numeroInterior,
        //   [Validators.maxLength(10)],
        // ],
        // telefono: [
        //   this.solicitudState?.telefono,
        //   [Validators.required, Validators.pattern(/^\d{10}$/)],
        // ],
        // correoElectronico: [
        //   this.solicitudState?.correoElectronico,
        //   [Validators.required, Validators.email],
        // ],
        // pais: [this.solicitudState?.pais, Validators.required],
        // codigoPostal: [
        //   this.solicitudState?.codigoPostal,
        //   [Validators.required, Validators.pattern(/^\d{5}$/)],
        // ],
        // estado: [
        //   this.solicitudState?.estado,
        //   [Validators.required, Validators.maxLength(50)],
        // ],
        // colonia: [
        //   this.solicitudState?.colonia,
        //   [Validators.required, Validators.maxLength(50)],
        // ],
        // opcion: [this.solicitudState?.opcion],
      }),
    });
  }

  getAduanaIngresara(): void {
    this.getAduanaIngresaraSubscription = this.importarExportar
      .getAduanaIngresara()
      .subscribe((resp) => {
        if (resp.code === 200) {
          const RESPONSE = resp.data;
          this.store.setAduana(RESPONSE);
        }
      });
  }

  /**
   * Obtiene el grupo de formulario de importador/exportador.
   *
   * @returns {FormGroup} - El grupo de formulario de importador/exportador.
   */
  get importadorExportador(): FormGroup {
    return this.tramiteForm.get('importadorExportador') as FormGroup;
  }

  /**
   * Este método se utiliza para marcar los controles del formulario como tocados. - 10301
   */
  validarDestinatarioFormulario(): void {
    if (this.tramiteForm.invalid) {
      this.tramiteForm.markAllAsTouched();
    }
  }

  /**
   * Muestra la siguiente tabla.
   */
  nextTabla() {
    this.showTabla = false;
    this.store.setShowTabla(this.showTabla);
  }

  /**
   * Establece los valores en el store de tramite5701.
   *
   * @param {FormGroup} form - El formulario del cual se obtiene el valor.
   * @param {string} campo - El nombre del campo del formulario cuyo valor se va a obtener.
   * @param {string} metodoNombre - El nombre del método en el store que se va a invocar con el valor del campo.
   * @returns {void}
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite10302Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * Método de limpieza que se ejecuta cuando el componente se destruye.
   */
  ngOnDestroy(): void {
    if (this.getAduanaIngresaraSubscription) {
      this.getAduanaIngresaraSubscription.unsubscribe();
    }

    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
