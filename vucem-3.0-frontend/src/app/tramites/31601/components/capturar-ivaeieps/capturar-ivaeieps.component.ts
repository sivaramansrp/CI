import { Component } from '@angular/core';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';
import { SelectCatalogosComponent } from '../../../../shared/components/select-catalogos/select-catalogos.component';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { InputRadioComponent } from '../../../../shared/components/input-radio/input-radio.component';
import { InputCheckComponent } from '../../../../shared/components/input-check/input-check.component';
import { Catalogo } from '../../../../core/models/shared/catalogos.model';
import { CatalogoSelectComponent } from '../../../../shared/components/catalogo-select/catalogo-select.component';
import { InputHoraComponent } from '../../../../shared/components/input-hora/input-hora.component';
import radio_si_no from '../../../../../assets/json/31601/radio_si_no.json'
import table from '../../../../../assets/json/31601/table.json'
import tableDetos from '../../../../../assets/json/31601/table-datos.json'
import mockData from '../../../../../assets/json/31601/mockdata-capturar.json'
import dropDown from '../../../../../assets/json/31601/catalog-select-tipo.json'


import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidacionesFormularioService } from '../../../../core/services/shared/validaciones-formulario/validaciones-formulario.service';

@Component({
  selector: 'app-capturar-ivaeieps',
  standalone: true,
  imports: [TituloComponent, SelectCatalogosComponent, TableComponent, InputHoraComponent, ReactiveFormsModule, CatalogoSelectComponent, CommonModule, InputCheckComponent, InputRadioComponent],
  templateUrl: './capturar-ivaeieps.component.html',
  styleUrl: './capturar-ivaeieps.component.scss'
})

export class CapturarIvaeiepsComponent {
  /**
   * Grupo de formularios para formulario IVA
   */
  ivaForm!: FormGroup;
  /**
   * Grupo de formularios para formulario de pago
   */
  formularioDePago!: FormGroup;
  /**
   *Marcar para mostrar u ocultar contenido
   */
  showContent = false;
  /**
   * Valor seleccionado para alguna funcionalidad
   */
  valorSeleccionado = 'Si';
  /**
   *Valor seleccionado predeterminado
   */
  predeterminadoSeleccionar = 'Si';
  /**
   * Marcar para mostrar u ocultar modal
   */
  showModal = false;

  /**
   * Una variable que contiene el estado de un grupo de botones de opción.
   * A la variable `radioBtn` se le asigna el valor de `radio_si_no`.
   */
  radioBtn = radio_si_no;
  /**
   * Contiene los datos del encabezado de la tabla de destinatarios.
   * Estos datos se utilizan para completar la tabla de destinatarios en la interfaz de usuario.
   */
  destinatarioHeaderData = table;
  /**
   * Representa los datos de LE (presumiblemente una entidad o proceso específico).
   * Esta variable contiene los datos de la tabla para LE.
   */
  datosDeLe = tableDetos;
  /**
   * Representa el catálogo de tipos.
   * Esta variable contiene los datos de las opciones del menú desplegable.
   */
  tipoDe: Catalogo[] = dropDown.tipoDe;

  /**
   * Construye una instancia de CapturarIvaeiepsComponent.
   * 
   * @param fb: una instancia de FormBuilder utilizada para crear controles de formulario.
   * @param validacionesService - Un servicio para validación de formularios.
   */
  constructor(private fb: FormBuilder,private validacionesService:ValidacionesFormularioService) { }

  /**
   * Gancho de ciclo de vida angular que se llama después de que la vista del componente se haya inicializado por completo.
   * Este método inicializa los formularios y completa el formulario de pago con datos simulados.
   *
   * @returns {void}
   */
  ngOnInit(): void {
    this.inicializarForms();
    this.poblarPagoForm(mockData);
  }

  /**
   *Inicializa los formularios utilizados en el componente.
   * 
   * Este método configura dos formularios: `ivaForm` y `formularioDePago`.
   * 
   * `ivaForm` incluye los siguientes controles:
   * - `empleados`:Un control booleano.
   * - `infraestructura`: Un control booleano.
   * - `monto`: Un control booleano..
   * - `antiguedad`: Un control booleano..
   * - `tipoDe`: Un control de cadena.
   * - `valorPesos`: Un control de cadena.
   * - `descripcion`: Un control de cadena.
   * - `rfc`: Un control de cadena requerido con un validador de patrones..
   * - `denominacion`: Un control de cadena deshabilitado.
   * - `domicilio`: Un control de cadena deshabilitado.
   * 
   * `formularioDePago` incluye los siguientes controles:
   * - `claveReferencia`: Un control de cadena deshabilitado with a maximum length validator.
   * - `numeroOperacion`: Un control de cadena.
   * - `cadenaDependencia`: Un control de cadena deshabilitado with a maximum length validator.
   * - `banco`: Un control de cadena requerido.
   * - `llavePago`:Un control de cadena requerido con un patrón y un validador de longitud máxima.
   * - `fechaPago`: Un control de cadena deshabilitado.
   * - `importePago`: Un control de cadena deshabilitado.
   *  @returns {void}
   */
   inicializarForms(): void {
    this.ivaForm = this.fb.group({
      empleados: [false],
      infraestructura: [false],
      monto: [false],
      antiguedad: [false],
      tipoDe: [''],
      valorPesos: [''],
      descripcion: [''],
      rfc: ['', [Validators.required,Validators.pattern(this.validacionesService.rfcPattern),]],
      denominacion: [{ value: '', disabled: true }],
      domicilio: [{ value: '', disabled: true }]
    });

    this.formularioDePago = this.fb.group({
      claveReferencia: [{ value: '', disabled: true }, Validators.maxLength(50)],
      numeroOperacion: [''],
      cadenaDependencia: [{ value: '', disabled: true }, Validators.maxLength(50)],
      banco: ['', Validators.required],
      llavePago: ['',[Validators.required, Validators.pattern(/^[a-zA-Z0-9]*$/),Validators.maxLength(20)]],
      fechaPago: [{ value: '', disabled: true }],
      importePago: [{ value: '', disabled: true }]
    });
  }

/**
   * Rellena el formulario de pago con los datos proporcionados.
   *
   * @param data: el objeto de datos que contiene información de pago.
   * @param data.claveReferencia - La clave de referencia para el pago.
   * @param data.numeroOperacion - El número de operación para el pago.
   * @param data.cadenaDependencia - La cadena de dependencia para el pago.
   * @param data.tipoDe - El tipo de banco para el pago.
   * @param data.llavePago - La clave de pago.
   * @param data.fechaPago - La fecha de pago.
   * @param data.importePago - El monto del pago.
   */
   poblarPagoForm(data: any): void {
    this.formularioDePago.patchValue({
      claveReferencia: data.claveReferencia,
      numeroOperacion: data.numeroOperacion,
      cadenaDependencia: data.cadenaDependencia,
      banco: data.tipoDe,
      llavePago: data.llavePago,
      fechaPago: data.fechaPago,
      importePago: data.importePago
    });
  }

/**
   * Maneja el evento de cambio de valor.
   *
   * Valor @param: el nuevo valor que se establecerá.
   */
  cambioDeValor(value: any): void {
    this.valorSeleccionado = value;
  }

/**
   * Actualiza el valor de `predeterminadoSeleccionar` con el valor proporcionado.
   *
   * @param value - El nuevo valor a establecer para `predeterminadoSeleccionar`.
   * @retornos nulos
   */

  cambioDeValorIndique(value: any): void {
    this.predeterminadoSeleccionar = value;
  }

 /**
   * Agrega datos a la tabla destinatarioHeaderData si el ivaForm es válido.
   * Extrae los valores `rfc`, `denominacion` y `domicilio` del formulario,
   * y los agrega como una nueva fila a la matriz `tbodyData` del primer elemento
   * en el array `tableBody` de `destinatarioHeaderData`.
   * Restablece el ivaForm después de agregar los datos.
   *
   * @returns {nulo}
   */
  agregarDatos(): void {
    if (this.ivaForm.valid) {
      const { rfc, denominacion, domicilio } = this.ivaForm.value;
      this.destinatarioHeaderData.tableBody[0].tbodyData.push([ rfc, denominacion, domicilio]);
      this.ivaForm.reset();
    }
  }
/**
   * Alterna la visibilidad del contenido invirtiendo el valor de `showContent`.
   * Cuando se llama, si `showContent` es verdadero, se establecerá en falso y viceversa.
   */
  alternarContenido(): void {
    this.showContent = !this.showContent;
  }

/**
   * Actualiza el campo 'tipoDe' en el ivaForm con el valor actual de tipoDe.
   *
   * @returns {nulo}
   */
  tipoDeInver(): void {
    this.ivaForm.get('tipoDe')?.setValue(this.tipoDe);
  }

/**
   * Abre el modal estableciendo `showModal` en verdadero.
   *
   * Este método se utiliza para mostrar el cuadro de diálogo modal en la interfaz de usuario.
   * Cuando se llama, establece el indicador `showModal` en verdadero, haciendo que el modal sea visible.
   *
   * @returns {nulo}
   */
  agregarOpenModal(): void {
    this.showModal = true;
  }

/**
   * Cierra el modal estableciendo la propiedad `showModal` en `false`.
   * Este método normalmente se llama cuando el usuario desea cerrar el cuadro de diálogo modal.
   */
  closeModal(): void {
    this.showModal = false;
  }
/**
   * Recupera el mensaje de error de un control de formulario específico.
   *
   * @param controlName: el nombre del control de formulario para comprobar si hay errores.
   * @returns Una cadena que contiene el mensaje de error, o nula si no se encuentran errores.
   */
  getControlError(controlName: string): string | null {
    const control = this.ivaForm.get(controlName);
    if (control?.invalid && control?.touched) {
      if (control.errors?.['required']) {
        return 'This field is required';
      } else if (control.errors?.['pattern']) {
        return 'Invalid RFC format';
      }
    }
    return null;
  }
/**
   * Getter para el campo RFC (Registro Federal de Contribuyentes) del ivaForm.
   * 
   * @returns El control de formulario para el campo 'rfc'.
   */
  get rfc() {
    return this.ivaForm.get('rfc');
  }

}
