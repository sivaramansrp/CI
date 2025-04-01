import { CatalogoSelectComponent, TableComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {Subject, distinctUntilChanged,takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormularioQuery } from '../../../../core/queries/tramite104.query';
import { FormularioStore } from '../../../../core/estados/tramites/tramite104.store';
import { MENSAJEDEALERTA } from '@libs/shared/data-access-user/src/core/enums/104/104.enum';
import { TableData } from '@libs/shared/data-access-user/src/core/models/104/model-104';
import destinatarioTableData from '@libs/shared/theme/assets/json/104/table-104.json'
import dropDown from '@libs/shared/theme/assets/json/104/selector-104.json'

@Component({
  selector: 'app-datos-del-inmueble',
  standalone: true,
  imports: [CommonModule, TituloComponent,
    TableComponent,
    CatalogoSelectComponent,
    ReactiveFormsModule],
  templateUrl: './datos-del-inmueble.component.html',
  styleUrl: './datos-del-inmueble.component.css',
})
export class DatosDelInmuebleComponent implements OnInit,OnDestroy {

  /**
   * **Evento de cierre**  
   * 
   * Se emite cuando el usuario hace clic en cerrar.  
   * Puede utilizarse para manejar el cierre del componente desde el padre.
   */
  @Output() cerrarClicado = new EventEmitter();

  /**
   * **Formulario de Fomento a la Exportación**  
   * 
   * Contiene los campos relacionados con la solicitud de fomento a la exportación.
   */
  fomentoExportacionForm!: FormGroup;

  /**
   * **Formulario de Dirección**  
   * 
   * Almacena los datos de dirección asociados a la solicitud.
   */
  formularioDireccion!: FormGroup;

  private destroy$ = new Subject<void>();

  /**
   * **Indicador de alerta**  
   * 
   * Determina si se debe mostrar una alerta en la interfaz de usuario.
   */
  mostrarAlerta: boolean = false;


  /**
   * **Mensaje de alerta**  
   * 
   * Contiene el texto del mensaje de alerta que se mostrará en la interfaz.
   */
  mensajeDeAlerta = '';

  /**
   * **Encabezados de la tabla de establecimientos**  
   * 
   * Almacena los nombres de las columnas de la tabla de establecimientos.
   */
  public establecimientoHeaderData: string[] = [];

  /**
   * **Datos del cuerpo de la tabla de establecimientos**  
   * 
   * Contiene la información detallada de los establecimientos.  
   * Se usa `unknown` hasta definir su estructura específica.
   */
  public establecimientoBodyData: unknown = [];

  /**
   * **Datos de la tabla de destinatarios**  
   * 
   * Contiene los encabezados y el cuerpo de la tabla de destinatarios.
   */
  destinatarioTableData: TableData = { encabezadoDeTabla: [], cuerpoTabla: [] };

  /**
   * **Constructor del componente**  
   * 
   * - Inicializa el `FormBuilder` para la creación de formularios reactivos.
   */
  // eslint-disable-next-line no-empty-function
  constructor(private fb: FormBuilder, private formularioStore: FormularioStore, private formularioQuery: FormularioQuery) {
  }

  /**
   * **Método de inicialización**  
   * 
   * Este método se ejecuta cuando el componente se inicializa. Realiza las siguientes acciones:
   * 1. Llama a `inicializarFormularioTratados` para configurar el formulario de tratados.
   * 2. Llama a `inicializarFormulario` para configurar el formulario principal.
   * 3. Asigna los datos de la tabla de destinatarios a `destinatarioTableData`.
   * 4. Llama a `getEstablecimiento` para obtener la información necesaria de los establecimientos.
   * 5. Se suscribe a los cambios del campo `tipoPrograma` del formulario `fomentoExportacionForm`.  
   *    Si el valor cambia a `'1'`, se muestra una alerta con el mensaje correspondiente.
   */
  ngOnInit(): void {
    this.inicializarFormularioTratados(); // Inicializa el formulario de tratados.
    this.inicializarFormulario(); // Inicializa el formulario principal.
    this.destinatarioTableData.encabezadoDeTabla = destinatarioTableData?.encabezadoDeTabla; // Asigna los encabezados de la tabla de destinatarios.
    this.destinatarioTableData.cuerpoTabla = destinatarioTableData?.cuerpoTabla; // Asigna los datos del cuerpo de la tabla de destinatarios.
    this.getEstableCimiento(); // Obtiene la información de los establecimientos.
    this.fomentoExportacionForm.get('tipoPrograma')?.valueChanges.subscribe(value => { // Se suscribe a los cambios en 'tipoPrograma' del formulario.
      if (value === '1') {
        this.mostrarAlerta = true; // Muestra la alerta si el valor es '1'.
        this.mensajeDeAlerta = MENSAJEDEALERTA.ADJUNTAR; // Asigna el mensaje de alerta correspondiente.
      }
    });
    this.cargarDatosGuardados(); // Carga los datos guardados en el formulario.
    this.escucharCambiosFormulario();
  }


  /**
   * **Inicializa el formulario de Tratados**  
   * 
   * Este método configura el formulario `fomentoExportacionForm` utilizando `FormBuilder`. 
   * Se definen dos campos:
   * - `tipoPrograma`: Un campo obligatorio que representa el tipo de programa.
   * - `folioAutorizacion`: Un campo obligatorio que representa el número de folio de autorización.
   */
  inicializarFormularioTratados(): void {
    this.fomentoExportacionForm = this.fb.group({
      tipoPrograma: ['', Validators.required], // Campo obligatorio para el tipo de programa.
      folioAutorizacion: ['', Validators.required], // Campo obligatorio para el folio de autorización.
    });
  }

  /**
   * **Configuraciones de dropdown**  
   * 
   * Define un arreglo de configuraciones para los dropdowns. Cada objeto contiene 
   * un catálogo de opciones que se utilizará para llenar los dropdowns en el formulario.
   * - `tipoPrograma`: Opciones disponibles para el tipo de programa.
   * - `folioAutorizacion`: Opciones disponibles para el folio de autorización.
   */
  configuracionesDropdown = [
    { catalogos: dropDown.tipoPrograma }, // Dropdown para el tipo de programa.
    { catalogos: dropDown.folioAutorizacion }, // Dropdown para el folio de autorización.
  ];

  /**
   * **Obtiene los datos de establecimiento**  
   * 
   * Este método asigna los datos de los encabezados y cuerpos de tabla a las propiedades 
   * `establecimientoHeaderData` y `establecimientoBodyData`, respectivamente. 
   * Estos datos se usan para visualizar la tabla de destinatarios.
   */
  private getEstableCimiento(): void {
    this.establecimientoHeaderData = this.destinatarioTableData?.encabezadoDeTabla; // Asigna los encabezados de la tabla.
    this.establecimientoBodyData = this.destinatarioTableData?.cuerpoTabla; // Asigna el cuerpo de la tabla.
  }


  /**
   * **Cerrar el modal**  
   * 
   * Este método emite un evento para cerrar el modal y cambia el estado de la alerta 
   * a `false`, ocultando cualquier mensaje de alerta mostrado anteriormente.
   */
  cerrarModal(): void {
    this.cerrarClicado.emit(); // Emite el evento para cerrar el modal.
    this.mostrarAlerta = false; // Oculta la alerta.
  }

  /**
   * **Inicializar el formulario de dirección**  
   * 
   * Este método crea un formulario reactivo (`formularioDireccion`) con varios 
   * campos para capturar la dirección del usuario. Se definen validaciones para 
   * asegurar que los campos obligatorios sean completados correctamente.
   */
  private inicializarFormulario(): void {
    this.formularioDireccion = this.fb.group({
      calle: ['', Validators.required], // Campo de calle, obligatorio.
      numeroExterior: ['', [Validators.required, Validators.pattern('^[0-9a-zA-Z]+$')]], // Número exterior, obligatorio y debe cumplir con el patrón alfanumérico.
      numeroInterior: ['', Validators.pattern('^[0-9a-zA-Z]*$')], // Número interior, no obligatorio y acepta alfanuméricos.
      pais: ['', Validators.required], // País, obligatorio.
      entidadFederativa: ['', Validators.required], // Entidad federativa, obligatorio.
      municipioDelegacion: ['', Validators.required], // Municipio o delegación, obligatorio.
      colonia: ['', Validators.required], // Colonia, obligatorio.
      localidad: ['', Validators.required], // Localidad, obligatorio.
      codigoPostal: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]], // Código postal, obligatorio y debe ser de 5 dígitos numéricos.
    });
  }


  /**
   * **Configuraciones del formulario para los dropdowns**  
   * 
   * Esta variable contiene un array de objetos que representan los diferentes dropdowns 
   * que se utilizan en el formulario. Cada objeto tiene un campo `catalogos`, que se 
   * corresponde con los valores a mostrar en los dropdowns.
   * 
   * Se utiliza para inicializar los selectores del formulario con los datos provenientes 
   * de las variables `dropDown.pais`, `dropDown.entidadFederativa`, etc.
   */
  configuracionesFormularioDropdown = [
    { catalogos: dropDown.pais }, // Dropdown para seleccionar el país.
    { catalogos: dropDown.entidadFederativa }, // Dropdown para seleccionar la entidad federativa.
    { catalogos: dropDown.municipioDelegacion }, // Dropdown para seleccionar el municipio o delegación.
    { catalogos: dropDown.entidadFederativa }, // Repetido para entidad federativa, ¿es necesario?
    { catalogos: dropDown.localidad } // Dropdown para seleccionar la localidad.
  ];



 /**
   * **Carga los valores guardados en Akita en el formulario**
   */
 cargarDatosGuardados(): void {
  this.formularioQuery.fomentoExportacion$
    .pipe(takeUntil(this.destroy$))
    .subscribe((data) => {
      if (data){this.fomentoExportacionForm.patchValue(data, { emitEvent: false });
    }
    });

  this.formularioQuery.direccion$
    .pipe(takeUntil(this.destroy$))
    .subscribe((data) => {
      if (data) {this.formularioDireccion.patchValue(data, { emitEvent: false });
    }
    });
}

/**
 * **Escucha cambios en los formularios y almacena en Akita automáticamente**
 */
escucharCambiosFormulario(): void {
  this.fomentoExportacionForm.valueChanges
    .pipe(
      takeUntil(this.destroy$),
      distinctUntilChanged() // 🔹 Evita actualizaciones innecesarias
    )
    .subscribe((formData) => {
      this.formularioStore.setFomentoExportacion(formData);
    });

  this.formularioDireccion.valueChanges
    .pipe(
      takeUntil(this.destroy$),
      distinctUntilChanged() // 🔹 Evita actualizaciones innecesarias
    )
    .subscribe((formData) => {
      this.formularioStore.setDireccion(formData);
    });
}

ngOnDestroy(): void {
 this.destroy$.next();
 this.destroy$.complete();
}


}
