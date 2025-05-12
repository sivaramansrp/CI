import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import {
  AlertComponent,
  Catalogo,
  CatalogoSelectComponent,
  TablaDinamicaComponent,
  TablaSeleccion,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import {
  ANEXO_I_SERVICIO,
  ANEXO_IMPORTACION_SERVICIO,
  ANEXO_UNO_ALERTA,
} from '../../constantes/anexo-dos-y-tres.enum';
import {
  AnexoDosEncabezado,
  AnexoUnoEncabezado,
  RutaNombre,
} from '../../models/nuevo-programa-industrial.model';
import { ComplementosSeccionStore } from '../../../estados/tramites/complementos-seccion.store';
import { ComplementosSeccionQuery } from '../../../estados/queries/complementos-seccion.query';
import { AnexoUnoComponent } from '../anexo-uno/anexo-uno.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  ANEXO_I_SERVICIO_CATALOGO,
  PAIS_DESTINO_CATALOG,
  TABLA_ANEXO_PRODUCTO_FRACCION,
  TABLA_PROYECTO_IMMEX,
  TABLE_PROVEEDOR_CLIENTE,
} from '../../constantes/complementos-seccion.enum';
import {
  AnexoUnoProducto,
  ProveedorCliente,
  ProyectoImmex,
} from '../../models/complimentos-seccion.model';
import { ProyectoImmexComponent } from '../proyecto-immex/proyecto-immex.component';

@Component({
  selector: 'app-anexo-uno-seccion',
  standalone: true,
  imports: [
    CommonModule,
    TablaDinamicaComponent,
    FormsModule,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    TituloComponent,
    AlertComponent,
  ],
  templateUrl: './anexo-uno-seccion.component.html',
  styleUrl: './anexo-uno-seccion.component.scss',
})
export class AnexoUnoSeccionComponent implements OnInit, OnDestroy {
  /**
   * Notificador utilizado para manejar la destrucción o desuscripción de observables.
   * Se usa comúnmente para limpiar suscripciones cuando el componente es destruido.
   *
   * @property {Subject<void>} destroyNotifier$
   */
  private destroyNotifier$: Subject<void> = new Subject();
public anexoDosFormGroup!:FormGroup;
  public proyectoForm!: FormGroup;
  public anexoUnoFormGroup!: FormGroup;
  public formularioProveedorCliente!: FormGroup;
  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.crearFormularioAnexoUno();
  }
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
  proyectoImmexTablaLista: ProyectoImmex[] = [];
  anexoUnoTablaLista: AnexoUnoProducto[] = [];
  proveedorTablaLista: ProveedorCliente[] = [];
  fracionArancelaria: AnexoUnoEncabezado[] = [];
  public anexoUnoAlerta = ANEXO_UNO_ALERTA;
  /**
   * Formulario para complementar fracción.
   */
  public complimentarForm!: FormGroup;
  catagoriaSeleccionDatos!: Catalogo[];
  agregarAnexoUno(): void {
    if (this.anexoUnoFormGroup.valid) {
      const FORM_DATA = this.anexoUnoFormGroup.value;

      this.anexoUnoTablaLista.push(FORM_DATA);

      this.anexoUnoFormGroup.reset();
    }
  }
 agregarProyectoImmex(): void {
  if (this.proyectoForm.valid) {
    const formData = this.proyectoForm.value;

    // Map form data to match the table configuration
    const transformedData = {
      encabezadoFraccion: formData.descripcion, // Map 'descripcion' to 'encabezadoFraccion'
      encabezadoTipoDocument: formData.tipoDeDocumente, // Map 'tipoDeDocumente' to 'encabezadoTipoDocument'
      encabezadoDescripcionOtro: formData.descripcion, // Map 'descripcion' to 'encabezadoDescripcionOtro'
      encabezadoFechaFirma: formData.fechaDeFirma, // Map 'fechaDeFirma' to 'encabezadoFechaFirma'
      encabezadoFechaVigencia: formData.fechaDeVigencia, // Map 'fechaDeVigencia' to 'encabezadoFechaVigencia'
      encabezadoRfc: formData.rfcTaxId, // Map 'rfcTaxId' to 'encabezadoRfc'
      encabezadoRazonFirmante: formData.razonSocial, // Map 'razonSocial' to 'encabezadoRazonFirmante'
    };

    // Push the transformed data to the table array
    this.proyectoImmexTablaLista.push(transformedData);

    // Reset the form
    this.proyectoForm.reset();
  } else {
    console.warn('Form is invalid. Please fill all required fields.');
  }
}
  agregarProveedorCliente(): void {
    if (this.formularioProveedorCliente.valid) {
      const FORM_DATA = this.formularioProveedorCliente.value;

      this.proveedorTablaLista.push(FORM_DATA);
      this.formularioProveedorCliente.reset();
    }
  }
  /**
   * compodoc
   *
   * @property tablaSeleccion
   * Configuración para la tabla de selección.
   * @type {TablaSeleccion}
   */
  tablaSeleccion = TablaSeleccion;
  tablaSociaAccionistas = TABLA_ANEXO_PRODUCTO_FRACCION;
  tableProveedorCliente = TABLE_PROVEEDOR_CLIENTE;
  tableFracionAnarelaria = ANEXO_FRACION_ANARELARIA;
  tablaProyectoImmex = TABLA_PROYECTO_IMMEX;
  public paisDestinoCatalog = PAIS_DESTINO_CATALOG;
  public tipoDeDocumenteCatalog = ANEXO_I_SERVICIO_CATALOGO;
  crearFormularioAnexoUno(): void {
    this.anexoUnoFormGroup = this.fb.group({
      fraccionArancelaria: [''],
      descripcion: [''],
    });
    this.formularioProveedorCliente = this.fb.group({
      descripcionComercial: ['', Validators.required],
      paisDestino: ['', Validators.required],
      rfc: ['', Validators.required],
      razonSocialCliente: ['', Validators.required],
    });
    this.proyectoForm = this.fb.group({
      descripcion: ['', Validators.required],
      tipoDeDocumente: ['', Validators.required],
      fechaDeFirma: ['', Validators.required],
      fechaDeVigencia: ['', Validators.required],
      rfcTaxId: [0, Validators.required],
      razonSocial: ['', Validators.required],
    });
  }
}
