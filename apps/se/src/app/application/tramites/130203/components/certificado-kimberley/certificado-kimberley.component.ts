import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';


import {
  Catalogo,
  CatalogoSelectComponent,
  TituloComponent,
} from '@ng-mf/data-access-user';
import { Validators } from '@angular/forms';

import {
  Tramite130203State,
  Tramite130203Store,
} from '../../estados/tramites/tramites130203.store';

import { Tramite130203Query } from '../../estados/queries/tramite130203.query';

import { ExportacionDeDiamantesEnBrutoService } from '../../services/exportacion-de-diamantes-en-bruto.service';

/**
 * @description
 * Componente para gestionar el formulario del Certificado Kimberley.
 * Este componente es standalone y utiliza Reactive Forms para la gestión de formularios.
 */
@Component({
  selector: 'app-certificado-kimberley',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    ReactiveFormsModule,
    CatalogoSelectComponent,
  ],
  templateUrl: './certificado-kimberley.component.html',
  styleUrl: './certificado-kimberley.component.scss',
})
export class CertificadoKimberleyComponent implements OnInit, OnDestroy {
  /**
   * @description
   * Formulario principal para la empresa.
   */
  public formularioEmpresa!: FormGroup;

  /**
   * @description
   * Estado actual del trámite.
   */
  public solicitudState!: Tramite130203State;

  /**
   * @description
   * Lista de países emisores.
   */
  public paisesEmisores: Catalogo[] = [];

  /**
   * @description
   * Lista de nombres en inglés.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public nombresIngles: any[] = [];

  /**
   * @description
   * Formulario para los datos del exportador.
   */
  datosDelExportador!: FormGroup;

  /**
   * @description
   * Formulario para los datos del importador.
   */
  datosDelImportador!: FormGroup;

  /**
   * @description
   * Formulario para los datos de la remesa.
   */
  datosDeLaRemesa!: FormGroup;

  /**
   * @description
   * Formulario para los datos de los diamantes.
   */
  datosDeLosDiamantes!: FormGroup;

  /**
   * @description
   * Observable para manejar la destrucción del componente.
   */
  private destroyed$ = new Subject<void>();

  paisId: number | null = null;
 
  /**
   * @description
   * Constructor del componente.
   * @param fb FormBuilder para la creación de formularios reactivos.
   * @param tramite130203Store Store para gestionar el estado del trámite.
   * @param tramite130203Query Query para obtener datos del estado del trámite.
   * @param exportacionDeDiamantesEnBrutoService Servicio para obtener datos relacionados con la exportación.
   */
  constructor(
    private fb: FormBuilder,
    private tramite130203Store: Tramite130203Store,
    private tramite130203Query: Tramite130203Query,
    private exportacionDeDiamantesEnBrutoService: ExportacionDeDiamantesEnBrutoService
  ) {
    this.inicializarFormulario();
  }

  /**
   * @description
   * Método de inicialización del componente.
   */
  ngOnInit(): void {
    this.loadData();
    this.subscribeToState();
    

  }

  /**
   * @description
   * Se suscribe al estado del store y actualiza los formularios con los valores del estado.
   */
   subscribeToState(): void {
    this.tramite130203Query.selectSolicitud$
    .pipe(takeUntil(this.destroyed$))
      .subscribe((seccionState) => {
        this.formularioEmpresa.patchValue({
          especifique: seccionState.especifique,
          numero: seccionState.numero,
          nombre: seccionState.nombre,
          tipoEmpresa: seccionState.tipoEmpresa,
          paisOrigen: seccionState.paisOrigen,
          lineaCheckbox: seccionState.lineaCheckbox
        });
        this.datosDelExportador.patchValue({
          direccionExportador: seccionState.direccionExportador,
          
        });
        this.datosDelImportador.patchValue({
          nombreImportador: seccionState.nombreImportador,
          direccionImportador: seccionState.direccionImportador,
        });
        this.datosDeLaRemesa.patchValue({
          numeroEnLetraDeLosLotes: seccionState.numeroEnLetraDeLosLotes,
          numeroEnLetraDeLosLotesEnIngles:
          seccionState.numeroEnLetraDeLosLotesEnIngles,
          numeroDeFactura: seccionState.numeroDeFactura,
       });  
        this.datosDeLosDiamantes.patchValue({
          cantidadEnQuilates: seccionState.cantidadEnQuilates,
          valorDeLosDiamantes: seccionState.valorDeLosDiamantes,
        });        
      })
    

    
  }

  /**
   * @description
   * Método para limpiar las suscripciones al destruir el componente.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  /**
   * @description
   * Carga los datos iniciales desde el servicio.
   */
  loadData(): void {
    this.exportacionDeDiamantesEnBrutoService
      .getPaisesEmisores()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((paises) => {
        this.paisesEmisores = paises;
      });

    this.exportacionDeDiamantesEnBrutoService
      .getNombresIngles()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((nombres) => {
        this.nombresIngles = nombres;
      });

      this.exportacionDeDiamantesEnBrutoService.getNombreExporter()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((nombreExportador) => {
        this.datosDelExportador.patchValue({
          nombreExportador: nombreExportador,
        });
      })

  }

  /**
   * @description
   * Inicializa el formulario principal.
   */
  public inicializarFormulario(): void {
    this.formularioEmpresa = this.fb.group({
      especifique: [
        {disabled: true, value: ''},
        Validators.maxLength(20),
      ],
      numero: ['', [Validators.required]],
      tipoEmpresa: [
        '',
        Validators.required,
      ],
      nombre: ['', [Validators.required]],
      lineaCheckbox: [''],
      paisOrigen: [
        '',
        Validators.required,
      ],
    });
    this.datosDelExportador = this.fb.group({
      nombreExportador: [{
          value: '',
          disabled: true,
        }
      ],
      direccionExportador: ['', [Validators.required]],
    })
    this.datosDelImportador = this.fb.group({
      nombreImportador: ['', [Validators.required]],
      direccionImportador: ['', [Validators.required]],
    });
    this.datosDeLaRemesa = this.fb.group({
      numeroEnLetraDeLosLotes: ['', [Validators.required]],
      numeroEnLetraDeLosLotesEnIngles: ['', [Validators.required]],
      numeroDeFactura: ['', [Validators.required]],
    });
    this.datosDeLosDiamantes = this.fb.group({
      cantidadEnQuilates: ['', [Validators.required]],
      valorDeLosDiamantes: ['', [Validators.required]],
    });
  }

  /**
   * @description
   * Actualiza el nombre en inglés basado en el ID del país.
   * @param paisId ID del país seleccionado.
   */
  public updateNombreIngles(paisId: number): void {
    this.paisId = paisId;
    const MATCHING_ITEMS = this.nombresIngles.filter(
      (item) => item.idDelPais === this.paisId
    );
    const NOMBRE = MATCHING_ITEMS.length > 0 ? MATCHING_ITEMS[0].name : '';

    this.formularioEmpresa.get('nombre')?.setValue(NOMBRE);
    this.setValoresStore(this.formularioEmpresa, 'nombre');
  }

  /**
   * @description
   * Actualiza el valor en el store basado en el formulario.
   * @param form Formulario reactivo.
   * @param campo Nombre del campo en el formulario.
   */
  setValoresStore( form: FormGroup, campo: string ): void {
    const VALOR = form.get(campo)?.value;
    this.tramite130203Store.actualizarEstado({ [campo]: VALOR });
    if(campo === 'tipoEmpresa'){
      this.updateNombreIngles(Number(VALOR));
    }
    
  }

  /**
   * @description
   * Verifica si un control del formulario es inválido.
   * @param controlName Nombre del control.
   * @returns `true` si el control es inválido, de lo contrario `false`.
   */
  isInvalid(controlName: string): boolean {
    const CONTORL = this.formularioEmpresa.get(controlName);
    return CONTORL
      ? CONTORL.invalid && (CONTORL.dirty || CONTORL.touched)
      : false;
  }

}
