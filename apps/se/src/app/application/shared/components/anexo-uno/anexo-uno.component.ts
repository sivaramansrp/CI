import { ActivatedRoute, Router } from '@angular/router';
import {
  AnexoDosEncabezado,
  AnexoImportacionConfiguartion,
  AnexoUnoConfiguartion,
  AnexoUnoEncabezado,
  RutaNombre,
} from '../../models/nuevo-programa-industrial.model';
import { ANEXO_UNO_ALERTA } from '../../constantes/anexo-dos-y-tres.enum';
import { AlertComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-anexo-uno',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    AlertComponent,
    ReactiveFormsModule,
    TablaDinamicaComponent,
  ],
  templateUrl: './anexo-uno.component.html',
  styleUrl: './anexo-uno.component.scss',
})
export class AnexoUnoComponent {
  public anexoUnoAlerta = ANEXO_UNO_ALERTA;
  public anexoUnoFormGroup!: FormGroup;
  public anexoDosFormGroup!: FormGroup;

  /**
   * Configuración de Anexo 1 y 3
   */
  @Input() anexoConfiguartion!: AnexoUnoConfiguartion<AnexoUnoEncabezado>;
  /**
   * Configuración de Anexo 1 y 3
   */
  @Input()
  anexoImportacionConfiguartion!: AnexoImportacionConfiguartion<AnexoDosEncabezado>;
  /**
   * Lista de tabla del Anexo Tres
   */
  @Input() anexoUnoTablaLista: AnexoUnoEncabezado[] = [];

  /**
   * Lista de tabla del Anexo Dos
   */
  @Input() anexoDosTablaLista: AnexoDosEncabezado[] = [];
  /**
   * Evento para devolver la llamada del Anexo Uno
   */
  @Output() obtenerAnexoUnoDevolverLaLlamada: EventEmitter<
    AnexoUnoEncabezado[]
  > = new EventEmitter<AnexoUnoEncabezado[]>(true);

  /**
   * Evento para devolver la llamada del Anexo Dos
   */
  @Output() obtenerAnexoDosDevolverLaLlamada: EventEmitter<
    AnexoDosEncabezado[]
  > = new EventEmitter<AnexoDosEncabezado[]>(true);
  @Output() rutaLaFraccionDeComplemento: EventEmitter<RutaNombre> =
    new EventEmitter<RutaNombre>();

  public datosImportacionSeleccionados!: AnexoDosEncabezado | AnexoUnoEncabezado;

  public datosExportacionSeleccionados!: AnexoDosEncabezado | AnexoUnoEncabezado;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.createAnexoUnoForm();
    this.createAnexoDosForm();
  }

  /**
   * Crea el formulario del Anexo Uno
   */
  createAnexoUnoForm(): void {
    this.anexoUnoFormGroup = this.fb.group({
      fraccionArancelaria: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }

  /**
   * Crea el formulario del Anexo Uno
   */
  createAnexoDosForm(): void {
    this.anexoDosFormGroup = this.fb.group({
      fraccionArancelaria: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }
  /**
   * Elimina elementos del Anexo Tres que no tienen estatus
   */
  eliminarAnexoUno(): void {
    this.anexoUnoTablaLista = this.anexoUnoTablaLista.filter((idx) => {
      return !idx.estatus;
    });
    this.obtenerAnexoUnoDevolverLaLlamada.emit(this.anexoUnoTablaLista);
  }

  /**
   * Elimina elementos del Anexo Tres que no tienen estatus
   */
  eliminarAnexoDos(): void {
    this.anexoDosTablaLista = this.anexoDosTablaLista.filter((idx) => {
      return !idx.estatus;
    });
    this.obtenerAnexoDosDevolverLaLlamada.emit(this.anexoDosTablaLista);
  }

  /**
   * Agrega un nuevo elemento al Anexo Uno
   */
  agregarAnexoUno(): void {
    const OBJECTO_IDX: AnexoUnoEncabezado = {
      encabezadoFraccion: this.anexoUnoFormGroup.get('fraccionArancelaria')
        ?.value,
        encabezadoDescripcionComercial:
        this.anexoUnoFormGroup.get('descripcion')?.value,
      estatus: false,
      encabezadoFraccionArancelaria: '',
      encabezadoAnexoII: '',
      encabezadoTipo: '',
      encabezadoUmt: '',
      encabezadoCategoria: '',
      encabezadoValorEnMercado: '',
    };
    this.anexoUnoTablaLista.push(OBJECTO_IDX);
    this.obtenerAnexoUnoDevolverLaLlamada.emit(this.anexoUnoTablaLista);
    this.anexoUnoFormGroup.reset();
  }

  /**
   * Agrega un nuevo elemento al Anexo Dos
   */
  agregarAnexoDos(): void {
    const OBJECTO_IDX: AnexoDosEncabezado = {
      encabezadoFraccion: this.anexoDosFormGroup.get('fraccionArancelaria')
        ?.value,
        encabezadoDescripcionComercial:
        this.anexoDosFormGroup.get('descripcion')?.value,
        encabezadoFraccionExportacion: '',
        encabezadoFraccionImportacion: '',
      estatus: false,
    };
    this.anexoDosTablaLista.push(OBJECTO_IDX);
    this.obtenerAnexoDosDevolverLaLlamada.emit(this.anexoDosTablaLista);
    this.anexoDosFormGroup.reset();
  }

  /**
   * Establece la lista de Anexo Uno y emite un evento con la lista seleccionada.
   *
   * @param {AnexoUnoEncabezado[]} event - La lista de encabezados de Anexo Uno.
   * Si no se proporciona, se utilizará una lista vacía.
   * @returns {void}
   */
  setAnexoUnoLista(event: AnexoUnoEncabezado): void {
    this.datosImportacionSeleccionados = event;
  }

  /**
   * Establece la lista de Anexo Dos y emite un evento con la lista seleccionada.
   *
   * @param {AnexoDosEncabezado[]} event - La lista de encabezados de importación de anexo.
   * Si no se proporciona, se utilizará una lista vacía.
   * @returns {void}
   */
  setAnexoDosLista(event: AnexoDosEncabezado): void {
   this.datosExportacionSeleccionados = event;
  }

  /**
   * Establece la ruta con el nombre proporcionado y emite el evento `rutaLaFraccionDeComplemento`.
   *
   * @param {string} nombre - El nombre de la categoría para establecer la ruta.
   * @returns {void}
   */
  setRuta(nombre: string,id:string): void {
    if (nombre) {
      const RUTA_NOMBRE: RutaNombre = {
        catagoria: nombre,
        id: id,
        datos:id ==='IMPORT'? this.datosImportacionSeleccionados:this.datosExportacionSeleccionados
      };
      this.rutaLaFraccionDeComplemento.emit(RUTA_NOMBRE);
    }
  }
}
