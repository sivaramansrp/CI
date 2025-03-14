import { AnexoImportacionConfiguartion, AnexoImportacionEncabezado, AnexoUnoConfiguartion, AnexoUnoEncabezado } from '../../models/se-shared.model';
import { ANEXO_UNO_ALERTA } from '../../enum/anexo-dos-y-tres.enum';
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
  imports: [CommonModule, TituloComponent, AlertComponent, ReactiveFormsModule, TablaDinamicaComponent],
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
    @Input() anexoImportacionConfiguartion!: AnexoImportacionConfiguartion<AnexoImportacionEncabezado>;
    /**
     * Lista de tabla del Anexo Tres
     */
    @Input() anexoUnoTablaLista: AnexoUnoEncabezado[] = [];

    /**
     * Lista de tabla del Anexo Dos
     */
    @Input() anexoDosTablaLista: AnexoImportacionEncabezado[] = [];
    /**
     * Evento para devolver la llamada del Anexo Uno
     */
    @Output() obtenerAnexoUnoDevolverLaLlamada: EventEmitter<AnexoUnoEncabezado[]> = new EventEmitter<AnexoUnoEncabezado[]>(true);

  /**
   * Evento para devolver la llamada del Anexo Dos
   */
  @Output() obtenerAnexoDosDevolverLaLlamada: EventEmitter<AnexoImportacionEncabezado[]> = new EventEmitter<AnexoImportacionEncabezado[]>(true);

  constructor(private fb: FormBuilder){
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
          ENCABEZADO_FRACCION: this.anexoUnoFormGroup.get('fraccionArancelaria')?.value,
          ENCABEZADO_DESCRIPCION_COMERCIAL: this.anexoUnoFormGroup.get('descripcion')?.value,
          estatus: false,
          ENCABEZADO_FRACCION_ARANCELARIA: '',
          ENCABEZADO_ANEXO_II: '',
          ENCABEZADO_TIPO: '',
          ENCABEZADO_UMT: '',
          ENCABEZADO_CATEGORIA: '',
          ENCABEZADO_VALOR_EN_MERCADO: ''
        };
        this.anexoUnoTablaLista.push(OBJECTO_IDX);
        this.obtenerAnexoUnoDevolverLaLlamada.emit(this.anexoUnoTablaLista);
        this.anexoUnoFormGroup.reset();
      }

          /**
       * Agrega un nuevo elemento al Anexo Dos
       */
          agregarAnexoDos(): void {
            const OBJECTO_IDX: AnexoImportacionEncabezado = {
              ENCABEZADO_FRACCION: this.anexoDosFormGroup.get('fraccionArancelaria')?.value,
              ENCABEZADO_DESCRIPCION_COMERCIAL: this.anexoDosFormGroup.get('descripcion')?.value,
              ENCABEZADO_FRACCION_EXPORTACION: '',
              ENCABEZADO_FRACCION_IMPORTACION: '',
              estatus: false
            };
            this.anexoDosTablaLista.push(OBJECTO_IDX);
            this.obtenerAnexoDosDevolverLaLlamada.emit(this.anexoDosTablaLista);
            this.anexoUnoFormGroup.reset();
          }
    
    setAnexoUnoLista(event: AnexoUnoEncabezado[]): void {
      const LISTA_SELECCIONADA = event ? event : [];
      this.obtenerAnexoUnoDevolverLaLlamada.emit(LISTA_SELECCIONADA);
    }

    setAnexoDosLista(event: AnexoImportacionEncabezado[]): void {
      const LISTA_SELECCIONADA = event ? event : [];
      this.obtenerAnexoDosDevolverLaLlamada.emit(LISTA_SELECCIONADA);
    }
}
