import { Catalogo, ProyectoImmexConfiguartion, ProyectoImmexEncabezado } from '../../models/se-shared.model';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Input } from '@angular/core';
import { Location } from '@angular/common';
import { OnInit } from '@angular/core';
import { Output } from '@angular/core';
import { PoryectoDatos } from '../../models/se-shared.model';
import { ReactiveFormsModule } from '@angular/forms';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';
import { Validators } from '@angular/forms';
@Component({
  selector: 'app-proyecto-immex',
  standalone: true,
  imports: [CommonModule, TituloComponent, ReactiveFormsModule, CatalogoSelectComponent,
    TablaDinamicaComponent
  ],
  templateUrl: './proyecto-immex.component.html',
  styleUrl: './proyecto-immex.component.scss',
})
export class ProyectoImmexComponent implements OnInit {

  @Input() proyectoImmexDatos!: PoryectoDatos;
  @Input() documentoCatalogDatos!: Catalogo[];
  @Input() proyectoImmexConfiguartion!: ProyectoImmexConfiguartion<ProyectoImmexEncabezado>;
  @Input() proyectoImmexTablaLista: ProyectoImmexEncabezado[] = [];
  
  @Output() obtenerProyectoTablaDevolverLaLlamada: EventEmitter<ProyectoImmexEncabezado[]> = new EventEmitter<ProyectoImmexEncabezado[]>(true);

  public proyectoForm!: FormGroup;
  public esTablaeleccionada: boolean = false;
  public seleccionList: ProyectoImmexEncabezado[] = [];

  // eslint-disable-next-line no-empty-function
  constructor(private fb: FormBuilder, private ubicaccion: Location) { }

  ngOnInit(): void {
    this.crearProyectoForm();
  }

  /**
     * Crea y configura el formulario del proyecto IMMEX.
     * 
     * Este método inicializa el formulario `proyectoForm` con los campos necesarios
     * y sus validaciones correspondientes. Los campos incluyen:
     * - descripcion: Descripción del proyecto, requerido.
     * - tipoDeDocumente: Tipo de documento, requerido.
     * - fechaDeFirma: Fecha de firma del proyecto, requerido.
     * - fechaDeVigencia: Fecha de vigencia del proyecto, requerido.
     * - rfcTaxId: RFC o Tax ID, requerido.
     * - razonSocial: Razón social, requerido.
     * 
     * @returns {void} No retorna ningún valor.
     */
  crearProyectoForm(): void {
    this.proyectoForm = this.fb.group({
      descripcion: [this.proyectoImmexDatos.descripcion, Validators.required],
      tipoDeDocumente: ['', Validators.required],
      fechaDeFirma: [this.proyectoImmexDatos.fechaDeFirma, Validators.required],
      fechaDeVigencia: [this.proyectoImmexDatos.fechaDeVigencia, Validators.required],
      rfcTaxId: [0, Validators.required],
      razonSocial: ['', Validators.required],
    })
  }

  /**
  * Establece la lista de proyectos seleccionados y emite un evento con la lista.
  * 
  * @param {ProyectoImmexEncabezado[]} event - La lista de proyectos seleccionados.
  * @returns {void}
  */
  setProyectpLista(event: ProyectoImmexEncabezado[]): void {
    const LISTA_SELECCIONADA = event ? event : [];
    this.obtenerProyectoTablaDevolverLaLlamada.emit(LISTA_SELECCIONADA);
    this.esTablaeleccionada = true;
  }

  /**
   * Agrega un nuevo objeto a la lista `proyectoImmexTablaLista` o actualiza uno existente.
   * 
   * Si `esTablaeleccionada` es verdadero y `seleccionList` no está vacío, actualiza el objeto existente en la lista.
   * De lo contrario, agrega un nuevo objeto a la lista.
   * 
   * El objeto se crea utilizando los valores del formulario `proyectoForm`.
   * 
   * Después de agregar o actualizar el objeto, se emite un evento `obtenerProyectoTablaDevolverLaLlamada` con la lista actualizada.
   * 
   * Finalmente, el formulario `proyectoForm` se restablece.
   * 
   * @returns {void}
   */
  aggregar(): void {
    if (this.esTablaeleccionada && this.seleccionList.length) {
      const OBJECTO_IDX: ProyectoImmexEncabezado = {
        ...this.seleccionList[0],
        ENCABEZADO_DESCRIPCION_OTRO: this.proyectoForm.get('descripcion')?.value,
        ENCABEZADO_TIPO_DOCUMENT: this.proyectoForm.get('tipoDeDocumente')?.value,
        ENCABEZADO_FECHA_FIRMA: this.proyectoForm.get('fechaDeFirma')?.value,
        ENCABEZADO_FECHA_VIGENCIA: this.proyectoForm.get('fechaDeVigencia')?.value,
        ENCABEZADO_RFC: this.proyectoForm.get('rfcTaxId')?.value,
        ENCABEZADO_RAZON_FIRMANTE: this.proyectoForm.get('razonSocial')?.value,
        estatus: this.seleccionList[0].estatus,
        ENCABEZADO_FRACCION: this.seleccionList[0].ENCABEZADO_FRACCION
      }
      const OBJECTO_INDICE = this.proyectoImmexTablaLista.findIndex((idx) => {
        return idx.ENCABEZADO_RFC === OBJECTO_IDX.ENCABEZADO_RFC;
      })
      this.proyectoImmexTablaLista.splice(OBJECTO_INDICE, 1, OBJECTO_IDX);
      this.obtenerProyectoTablaDevolverLaLlamada.emit(this.proyectoImmexTablaLista);
      this.esTablaeleccionada = !this.esTablaeleccionada;
      this.seleccionList = [];
      this.proyectoForm.reset();
      return;
    }
    const OBJECTO_IDX: ProyectoImmexEncabezado = {
      ENCABEZADO_DESCRIPCION_OTRO: this.proyectoForm.get('descripcion')?.value,
      ENCABEZADO_TIPO_DOCUMENT: this.proyectoForm.get('tipoDeDocumente')?.value,
      ENCABEZADO_FECHA_FIRMA: this.proyectoForm.get('fechaDeFirma')?.value,
      ENCABEZADO_FECHA_VIGENCIA: this.proyectoForm.get('fechaDeVigencia')?.value,
      ENCABEZADO_RFC: this.proyectoForm.get('rfcTaxId')?.value,
      ENCABEZADO_RAZON_FIRMANTE: this.proyectoForm.get('razonSocial')?.value,
      estatus: false,
      ENCABEZADO_FRACCION: ''
    }
    this.proyectoImmexTablaLista.push(OBJECTO_IDX);
    this.obtenerProyectoTablaDevolverLaLlamada.emit(this.proyectoImmexTablaLista);
    this.proyectoForm.reset();
  }

  /**
   * Restablece el formulario del proyecto a su estado inicial.
   * 
   * Este método limpia todos los campos del formulario `proyectoForm` 
   * y los restablece a sus valores predeterminados.
   */
  limpar(): void {
    this.proyectoForm.reset();
  }

  /**
   * Elimina los elementos de la lista `proyectoImmexTablaLista` que no tienen el estatus activo.
   * 
   * Filtra la lista `proyectoImmexTablaLista` y elimina los elementos cuyo campo `estatus` es falso.
   * 
   * @returns {void} No retorna ningún valor.
   */
  elimiar(): void {
    this.proyectoImmexTablaLista = this.proyectoImmexTablaLista.filter((idx) => {
      return !idx.estatus;
    });
  }

  /**
   * Filtra la lista de proyectos Immex para seleccionar aquellos con estatus activo
   * y actualiza el formulario del proyecto con los valores del primer elemento seleccionado.
   *
   * @remarks
   * Este método filtra la lista `proyectoImmexTablaLista` para obtener los elementos
   * cuyo estatus es verdadero. Luego, actualiza los campos del formulario `proyectoForm`
   * con los valores del primer elemento de la lista filtrada.
   *
   * @returns {void}
   */
  eidtar(): void {
    this.seleccionList = this.proyectoImmexTablaLista.filter((idx) => {
      return idx.estatus;
    });
    this.proyectoForm.patchValue({
      descripcion: this.seleccionList[0].ENCABEZADO_DESCRIPCION_OTRO,
      tipoDeDocumente: this.seleccionList[0].ENCABEZADO_TIPO_DOCUMENT,
      fechaDeFirma: this.seleccionList[0].ENCABEZADO_FECHA_FIRMA,
      fechaDeVigencia: this.seleccionList[0].ENCABEZADO_FECHA_VIGENCIA,
      rfcTaxId: this.seleccionList[0].ENCABEZADO_RFC,
      razonSocial: this.seleccionList[0].ENCABEZADO_RAZON_FIRMANTE
    })
  }


  /**
   * Navega a la ubicación anterior en el historial de navegación.
   * Utiliza el servicio de ubicación para retroceder una página.
   */
  goBack(): void {
    this.ubicaccion.back();
  }
}
