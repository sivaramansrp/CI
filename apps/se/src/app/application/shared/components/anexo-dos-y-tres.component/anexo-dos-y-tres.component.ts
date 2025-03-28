import { ANEXO_TRES_ALERTA } from '../../constantes/anexo-dos-y-tres.enum';
import { AlertComponent } from '@ng-mf/data-access-user';
import { Anexo1y3Configuartion } from '../../models/nuevo-programa-industrial.model';
import { AnexoEncabezado } from '../../models/nuevo-programa-industrial.model';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-anexo-dos-y-tres',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    ReactiveFormsModule,
    TablaDinamicaComponent,
    AlertComponent,
  ],
  templateUrl: './anexo-dos-y-tres.component.html',
  styleUrl: './anexo-dos-y-tres.component.scss',
})
/**
 * Componente AnexoDosYTresComponent
 */
export class AnexoDosYTresComponent {
  /**
   * Formulario del Anexo Dos
   */
  public anexoDosFormGroup!: FormGroup;

  /**
   * Formulario del Anexo Tres
   */
  public anexoTresFormGroup!: FormGroup;

  /**
   * Lista de anexos
   */
  public anexoLista = [];

  /**
   * Alerta del Anexo Tres
   */
  public anexoTresAlerta = ANEXO_TRES_ALERTA;

  /**
   * Configuración de Anexo 1 y 3
   */
  @Input() anexo1y3Configuartion!: Anexo1y3Configuartion<AnexoEncabezado>;

  /**
   * Lista de tabla del Anexo Dos
   */
  @Input() anexoDosTablaLista: AnexoEncabezado[] = [];

  /**
   * Lista de tabla del Anexo Tres
   */
  @Input() anexoTresTablaLista: AnexoEncabezado[] = [];

  /**
   * Evento para devolver la llamada del Anexo Dos
   */
  @Output() obtenerAnexoDosDevolverLaLlamada: EventEmitter<AnexoEncabezado[]> =
    new EventEmitter<AnexoEncabezado[]>(true);

  /**
   * Evento para devolver la llamada del Anexo Tres
   */
  @Output() obtenerAnexoTresDevolverLaLlamada: EventEmitter<AnexoEncabezado[]> =
    new EventEmitter<AnexoEncabezado[]>(true);

  /**
   * Constructor del componente
   * @param fb FormBuilder para crear formularios
   */
  constructor(private fb: FormBuilder) {
    this.crearFormularioAnexoDos();
    this.crearFormularioAnexoTres();
  }

  /**
   * Crea el formulario del Anexo Dos
   */
  crearFormularioAnexoDos(): void {
    this.anexoDosFormGroup = this.fb.group({
      fraccionArancelaria: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }

  /**
   * Crea el formulario del Anexo Tres
   */
  crearFormularioAnexoTres(): void {
    this.anexoTresFormGroup = this.fb.group({
      fraccionArancelaria: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }

  /**
   * Elimina elementos del Anexo Dos que no tienen estatus
   */
  eliminarAnexoDos(): void {
    this.anexoDosTablaLista = this.anexoDosTablaLista.filter((idx) => {
      return !idx.estatus;
    });
    this.obtenerAnexoDosDevolverLaLlamada.emit(this.anexoDosTablaLista);
  }

  /**
   * Agrega un nuevo elemento al Anexo Dos
   */
  agregarAnexoDos(): void {
    const OBJECTO_IDX: AnexoEncabezado = {
      encabezadoFraccion: this.anexoDosFormGroup.get('fraccionArancelaria')
        ?.value,
      encabezadoDescripcion: this.anexoDosFormGroup.get('descripcion')?.value,
      estatus: false,
    };
    this.anexoDosTablaLista.push(OBJECTO_IDX);
    this.obtenerAnexoDosDevolverLaLlamada.emit(this.anexoDosTablaLista);
    this.anexoDosFormGroup.reset();
  }

  /**
   * Elimina elementos del Anexo Tres que no tienen estatus
   */
  eliminarAnexoTres(): void {
    this.anexoTresTablaLista = this.anexoTresTablaLista.filter((idx) => {
      return !idx.estatus;
    });
    this.obtenerAnexoTresDevolverLaLlamada.emit(this.anexoTresTablaLista);
  }

  /**
   * Agrega un nuevo elemento al Anexo Tres
   */
  agregarAnexoTres(): void {
    const OBJECTO_IDX: AnexoEncabezado = {
      encabezadoFraccion: this.anexoTresFormGroup.get('fraccionArancelaria')
        ?.value,
      encabezadoDescripcion: this.anexoTresFormGroup.get('descripcion')?.value,
      estatus: false,
    };
    this.anexoTresTablaLista.push(OBJECTO_IDX);
    this.obtenerAnexoTresDevolverLaLlamada.emit(this.anexoTresTablaLista);
    this.anexoTresFormGroup.reset();
  }

  /**
   * Establece la lista del Anexo Dos
   * @param event Lista de encabezados del Anexo Dos
   */
  setAnexoDosLista(event: AnexoEncabezado[]): void {
    const LISTA_SELECCIONADA = event ? event : [];
    this.anexoDosTablaLista = this.anexoDosTablaLista.map((idx) => {
      const INDICE = LISTA_SELECCIONADA.findIndex(
        (obj) => obj.encabezadoFraccion === idx.encabezadoFraccion
      );
      if (INDICE !== -1) {
        idx.estatus = true;
      }
      return idx;
    });
    this.obtenerAnexoDosDevolverLaLlamada.emit(this.anexoDosTablaLista);
  }

  /**
   * Establece la lista del Anexo Tres
   * @param event Lista de encabezados del Anexo Tres
   */
  setAnexoTresLista(event: AnexoEncabezado[]): void {
    const LISTA_SELECCIONADA = event ? event : [];
    this.anexoTresTablaLista = this.anexoTresTablaLista.map((idx) => {
      const INDICE = LISTA_SELECCIONADA.findIndex(
        (obj) => obj.encabezadoFraccion === idx.encabezadoFraccion
      );
      if (INDICE !== -1) {
        idx.estatus = true;
      }
      return idx;
    });
    this.obtenerAnexoTresDevolverLaLlamada.emit(this.anexoTresTablaLista);
  }
}
