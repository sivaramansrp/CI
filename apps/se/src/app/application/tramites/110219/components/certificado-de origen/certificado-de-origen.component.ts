import { AlertComponent,ConfiguracionColumna, InputFecha,InputFechaComponent,TablaDinamicaComponent, TablaSeleccion,TituloComponent, ValidacionesFormularioService } from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FECHA_VENCIMIENTO, FECHA_EXPEDICION, MercanciaCertificado, ProductoresAsociados } from '../../models/certificado.model';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReplaySubject, map, takeUntil } from 'rxjs';
import { Solicitud110219State, Tramite110219Store } from '../../estados/Tramite110219.store';
import { CertificadoService } from '../../services/certificado.service';
import { CommonModule } from '@angular/common';
import { Tramite110219Query } from '../../estados/Tramite110219.query';
/** 
 * Texto de alerta que se muestra para la tabla de mercancías del certificado.
 */
const TEXTO_DE_ALERTA_MERCANCIAS = 'Mercancias del Certificado';

/** 
 * Texto de alerta que se muestra para la tabla de productores asociados al certificado.
 */
const TEXTO_DE_ALERTA_PRODUCTORES = 'Productores asociados';

/**
 * Componente para gestionar el certificado de origen.
 */
@Component({
  selector: 'app-certificado-de-origen',
  standalone: true,
  imports: [CommonModule, TituloComponent, AlertComponent, TablaDinamicaComponent, ReactiveFormsModule, InputFechaComponent],
  templateUrl: './certificado-de-origen.component.html',
  styleUrl: './certificado-de-origen.component.css',
})
export class CertificadoDeOrigenComponent implements OnInit, OnDestroy {
  /** Formulario para la cancelación de certificados. */
  cancelacionForm!: FormGroup;

  /** Sujeto para manejar la destrucción del componente. */
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  /** Datos de la tabla de mercancías del certificado. */
  public mercanciaCertificadoTablaDatos: MercanciaCertificado[] = [];

  /** Datos de la tabla de productores asociados. */
  public productoresAsociadosTablaDatos: ProductoresAsociados[] = [];

  /** Texto de alerta para mercancías. */
  TEXTO_DE_ALERTA_MERCANCIAS = TEXTO_DE_ALERTA_MERCANCIAS;

  /** Texto de alerta para productores. */
  TEXTO_DE_ALERTA_PRODUCTORES = TEXTO_DE_ALERTA_PRODUCTORES;

  /** Fecha inicial para el formulario. */
  fechaInicialInput: InputFecha = FECHA_EXPEDICION;

  /** Fecha final para el formulario. */
  fechaFinalInput: InputFecha = FECHA_VENCIMIENTO;

  /** Estado de la solicitud actual. */
  public solicitudState!: Solicitud110219State;

  /** Selección de la tabla. */
  TablaSeleccion = TablaSeleccion;

  /** Encabezados de la tabla de mercancías. */
  public encabezadosMercancias: ConfiguracionColumna<MercanciaCertificado>[] = [
    { encabezado: 'Número de Orden', clave: (ele: MercanciaCertificado) => ele.numeroOrden, orden: 1 },
    { encabezado: 'Fracción Arancelaria', clave: (ele: MercanciaCertificado) => ele.fraccionArancelaria, orden: 2 },
    { encabezado: 'Nombre Técnico', clave: (ele: MercanciaCertificado) => ele.nombreTecnico, orden: 3 },
    { encabezado: 'Nombre Comercial', clave: (ele: MercanciaCertificado) => ele.nombreComercial, orden: 4 },
    { encabezado: 'Nombre en Ingles', clave: (ele: MercanciaCertificado) => ele.nombreIngles, orden: 5 },
    { encabezado: 'Complemento descripción', clave: (ele: MercanciaCertificado) => ele.complementoDescripcion, orden: 6 },
    { encabezado: 'Número de certificado', clave: (ele: MercanciaCertificado) => ele.numeroCertificado, orden: 7 },
    { encabezado: 'Pais/Bloque', clave: (ele: MercanciaCertificado) => ele.pais, orden: 8 },
    { encabezado: 'Tratado / Acuerdo', clave: (ele: MercanciaCertificado) => ele.tratado, orden: 9 },
    { encabezado: 'Fecha expedición', clave: (ele: MercanciaCertificado) => ele.fechaExpedicion, orden: 10 },
    { encabezado: 'Fecha vencimíento', clave: (ele: MercanciaCertificado) => ele.fechaVencimiento, orden: 11 },
  ];

  /** Encabezados de la tabla de productores asociados. */
  public encabezadosProductores: ConfiguracionColumna<ProductoresAsociados>[] = [
    { encabezado: 'Nombre del productor', clave: (ele: ProductoresAsociados) => ele.nombreProductor, orden: 1 },
    { encabezado: 'Número de registro fiscal', clave: (ele: ProductoresAsociados) => ele.numeroRegistroFiscal, orden: 2 },
    { encabezado: 'Dirección', clave: (ele: ProductoresAsociados) => ele.direccion, orden: 3 },
    { encabezado: 'Correo Electrónico', clave: (ele: ProductoresAsociados) => ele.correoElectronico, orden: 4 },
    { encabezado: 'Teléfono', clave: (ele: ProductoresAsociados) => ele.telefono, orden: 5 },
    { encabezado: 'Razón Social', clave: (ele: ProductoresAsociados) => ele.razonSocial, orden: 6 },
  ];

  /**
   * Constructor del componente.
   * @param certificadoService Servicio para gestionar certificados.
   * @param fb Constructor de formularios.
   * @param validacionesService Servicio para validar formularios.
   * @param store Almacén de datos del trámite.
   * @param query Consulta de datos del trámite.
   */
  constructor(
    private certificadoService: CertificadoService,
    private fb: FormBuilder,
    private validacionesService: ValidacionesFormularioService,
    private store: Tramite110219Store,
    private query: Tramite110219Query
  ) {
    // El constructor se utiliza para la inyección de dependencias.
  }

  /** Inicializa el componente. */
  ngOnInit(): void {
    this.cancelacionForm = new FormGroup({
      motivoCancelacion: new FormControl(''),
    });
    this.getMercanciaCertificadoTabla();

    this.query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
    this.donanteDomicilio();

  }

  /** Valida el formulario del destinatario. */
  validarDestinatarioFormulario(): void {
    if (this.cancelacionForm.invalid) {
      this.cancelacionForm.markAllAsTouched();
    }
  }

  /** Obtiene los datos de la tabla de mercancías del certificado. */
  public getMercanciaCertificadoTabla(): void {
    this.certificadoService.getMercanciaCertificadoTabla().pipe(takeUntil(this.destroyed$)).subscribe((data) => {
      this.mercanciaCertificadoTablaDatos = data;
    });
  }

  /**
   * Verifica si un campo del formulario es válido.
   * @param form Formulario.
   * @param field Campo a verificar.
   * @returns `true` si el campo es válido, de lo contrario `false`.
   */
  isValid(form: FormGroup, field: string): boolean {
    return this.validacionesService.isValid(form, field) || false;
  }

  /**
   * Establece valores en el almacén de datos.
   * @param form Formulario.
   * @param campo Campo del formulario.
   * @param metodoNombre Nombre del método en el almacén.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite110219Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /** Obtiene el formulario de validación. */
  get validacionForm(): FormGroup {
    return this.cancelacionForm.get('validacionForm') as FormGroup;
  }

  /** Inicializa el formulario con los datos del estado de la solicitud. */
  donanteDomicilio(): void {
    this.cancelacionForm = this.fb.group({
      validacionForm: this.fb.group({
        motivoCancelacion: [this.solicitudState?.motivoCancelacion, [Validators.required]],
        fechaExpedicion: [this.solicitudState?.fechaExpedicion, [Validators.required]],
        fechaVencimiento: [this.solicitudState?.fechaVencimiento, [Validators.required]],
      }),
    });

    if (this.cancelacionForm.invalid) {
      this.cancelacionForm.markAllAsTouched();
      this.cancelacionForm.markAsDirty();
    }
  }

  /** Limpia los recursos al destruir el componente. */
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}