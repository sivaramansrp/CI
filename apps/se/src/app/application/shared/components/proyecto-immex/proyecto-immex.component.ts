import {
  Catalogo,
  ProyectoImmexConfiguartion,
  ProyectoImmexEncabezado,
} from '../../models/nuevo-programa-industrial.model';
import { OnInit, Output } from '@angular/core';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Input } from '@angular/core';
import { Location } from '@angular/common';
import { PoryectoDatos } from '../../models/nuevo-programa-industrial.model';
import { ReactiveFormsModule } from '@angular/forms';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';
import { Validators } from '@angular/forms';
@Component({
  selector: 'app-proyecto-immex',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    TablaDinamicaComponent,
  ],
  templateUrl: './proyecto-immex.component.html',
  styleUrl: './proyecto-immex.component.scss',
})
/**
 * Componente para gestionar los proyectos IMMEX.
 */
export class ProyectoImmexComponent implements OnInit {
  /**
   * Datos del proyecto IMMEX.
   * @type {PoryectoDatos}
   */
  @Input() proyectoImmexDatos!: PoryectoDatos;

  /**
   * Datos del catálogo de documentos.
   * @type {Catalogo[]}
   */
  @Input() documentoCatalogDatos!: Catalogo[];

  /**
   * Configuración del proyecto IMMEX.
   * @type {ProyectoImmexConfiguartion<ProyectoImmexEncabezado>}
   */
  @Input()
  proyectoImmexConfiguartion!: ProyectoImmexConfiguartion<ProyectoImmexEncabezado>;

  /**
   * Lista de encabezados del proyecto IMMEX.
   * @type {ProyectoImmexEncabezado[]}
   */
  @Input() proyectoImmexTablaLista: ProyectoImmexEncabezado[] = [];

  /**
   * Emisor de eventos para devolver la lista de encabezados del proyecto IMMEX.
   * @type {EventEmitter<ProyectoImmexEncabezado[]>}
   */
  @Output() obtenerProyectoTablaDevolverLaLlamada: EventEmitter<
    ProyectoImmexEncabezado[]
  > = new EventEmitter<ProyectoImmexEncabezado[]>(true);

  /**
   * Formulario reactivo para gestionar los datos del proyecto IMMEX.
   * @type {FormGroup}
   */
  public proyectoForm!: FormGroup;

  /**
   * Indica si la tabla está seleccionada.
   * @type {boolean}
   */
  public esTablaeleccionada: boolean = false;

  /**
   * Lista de encabezados seleccionados del proyecto IMMEX.
   * @type {ProyectoImmexEncabezado[]}
   */
  public seleccionList: ProyectoImmexEncabezado[] = [];

  /**
   * Constructor de la clase ProyectoImmexComponent.
   * @param {FormBuilder} fb - FormBuilder para la creación del formulario reactivo.
   * @param {Location} ubicaccion - Servicio de Angular para manejar la ubicación del navegador.
   */
  constructor(private fb: FormBuilder, private ubicaccion: Location) {
    //El constructor requiere inyección de dependencias, pero se ha mantenido vacío debido a una regla de ESLint.
  }

  ngOnInit(): void {
    this.crearProyectoForm();
  }

  /**
   * Crea el formulario reactivo para el proyecto IMMEX.
   * @returns {void}
   */
  crearProyectoForm(): void {
    this.proyectoForm = this.fb.group({
      descripcion: [this.proyectoImmexDatos.descripcion, Validators.required],
      tipoDeDocumente: ['', Validators.required],
      fechaDeFirma: [this.proyectoImmexDatos.fechaDeFirma, Validators.required],
      fechaDeVigencia: [
        this.proyectoImmexDatos.fechaDeVigencia,
        Validators.required,
      ],
      rfcTaxId: [0, Validators.required],
      razonSocial: ['', Validators.required],
    });
  }

  /**
   * Establece la lista de proyectos seleccionados.
   * @param {ProyectoImmexEncabezado[]} event - Lista de encabezados seleccionados.
   * @returns {void}
   */
  setProyectpLista(event: ProyectoImmexEncabezado[]): void {
    const LISTA_SELECCIONADA = event ? event : [];
    this.seleccionList = LISTA_SELECCIONADA;
    this.seleccionList.map((ele) => {
      ele.estatus = true;
      return ele;
    });
    this.obtenerProyectoTablaDevolverLaLlamada.emit(LISTA_SELECCIONADA);
    this.esTablaeleccionada = true;
  }

  /**
   * Agrega un nuevo proyecto IMMEX a la lista.
   * @returns {void}
   */
  aggregar(): void {
    if (this.esTablaeleccionada && this.seleccionList.length) {
      const OBJECTO_IDX: ProyectoImmexEncabezado = {
        ...this.seleccionList[0],
        encabezadoDescripcionOtro: this.proyectoForm.get('descripcion')?.value,
        encabezadoTipoDocument: this.proyectoForm.get('tipoDeDocumente')?.value,
        encabezadoFechaFirma: this.proyectoForm.get('fechaDeFirma')?.value,
        encabezadoFechaVigencia:
          this.proyectoForm.get('fechaDeVigencia')?.value,
        encabezadoRfc: this.proyectoForm.get('rfcTaxId')?.value,
        encabezadoRazonFirmante: this.proyectoForm.get('razonSocial')?.value,
        estatus: this.seleccionList[0].estatus,
        encabezadoFraccion: this.proyectoImmexDatos?.fraccionArancelaria,
      };
      const OBJECTO_INDICE = this.proyectoImmexTablaLista.findIndex((idx) => {
        return idx.encabezadoRfc === OBJECTO_IDX.encabezadoRfc;
      });
      this.proyectoImmexTablaLista.splice(OBJECTO_INDICE, 1, OBJECTO_IDX);
      this.obtenerProyectoTablaDevolverLaLlamada.emit(
        this.proyectoImmexTablaLista
      );
      this.esTablaeleccionada = !this.esTablaeleccionada;
      this.seleccionList = [];
      this.proyectoForm.reset();
      return;
    }
    const OBJECTO_IDX: ProyectoImmexEncabezado = {
      encabezadoDescripcionOtro: this.proyectoForm.get('descripcion')?.value,
      encabezadoTipoDocument: this.proyectoForm.get('tipoDeDocumente')?.value,
      encabezadoFechaFirma: this.proyectoForm.get('fechaDeFirma')?.value,
      encabezadoFechaVigencia: this.proyectoForm.get('fechaDeVigencia')?.value,
      encabezadoRfc: this.proyectoForm.get('rfcTaxId')?.value,
      encabezadoRazonFirmante: this.proyectoForm.get('razonSocial')?.value,
      estatus: false,
      encabezadoFraccion: this.proyectoImmexDatos?.fraccionArancelaria,
    };
    this.proyectoImmexTablaLista.push(OBJECTO_IDX);
    this.obtenerProyectoTablaDevolverLaLlamada.emit(
      this.proyectoImmexTablaLista
    );
    this.proyectoForm.reset();
  }

  /**
   * Limpia el formulario del proyecto IMMEX.
   * @returns {void}
   */
  limpar(): void {
    this.proyectoForm.reset();
  }

  /**
   * Elimina los proyectos IMMEX seleccionados de la lista.
   * @returns {void}
   */
  elimiar(): void {
    this.proyectoImmexTablaLista = this.proyectoImmexTablaLista.filter(
      (idx) => {
        return !idx.estatus;
      }
    );
  }

  /**
   * Edita el proyecto IMMEX seleccionado en el formulario.
   * @returns {void}
   */
  eidtar(): void {
    this.seleccionList = this.proyectoImmexTablaLista.filter((idx) => {
      return idx.estatus;
    });
    this.proyectoForm.patchValue({
      descripcion: this.seleccionList[0]?.encabezadoDescripcionOtro,
      tipoDeDocumente: this.seleccionList[0]?.encabezadoTipoDocument,
      fechaDeFirma: this.seleccionList[0].encabezadoFechaFirma,
      fechaDeVigencia: this.seleccionList[0].encabezadoFechaVigencia,
      rfcTaxId: this.seleccionList[0].encabezadoRfc,
      razonSocial: this.seleccionList[0].encabezadoRazonFirmante,
    });
  }

  /**
   * Regresa a la ubicación anterior en el historial del navegador.
   * @returns {void}
   */
  regresar(): void {
    this.ubicaccion.back();
  }
}
