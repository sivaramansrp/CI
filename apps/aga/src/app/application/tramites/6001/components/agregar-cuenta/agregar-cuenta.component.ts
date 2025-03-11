/* eslint-disable class-methods-use-this */
/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable sort-imports */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TituloComponent } from "../../../../../../../../../libs/shared/data-access-user/src/tramites/components/titulo/titulo.component";
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { Catalogo } from '@libs/shared/data-access-user/src/core/models/shared/catalogos.model';
import { RegistroCuentasBancariasService } from '../../services/registro-cuentas-bancarias.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { REGEX_RFC } from '@libs/shared/data-access-user/src/tramites/constantes/regex.constants';


/**
 * Componente AgregarCuenta que se utiliza para mostrar y gestionar los AgregarCuenta.
 * 
 * Este componente utiliza varios subcomponentes como TituloComponent, CommonModule,
 * ReactiveFormsModule,CatalogoSelectComponent para mostrar información y permitir al usuario seleccionar y agregar cuenta.
 * 
 * @component
 */
@Component({
  selector: 'app-agregar-cuenta',
  standalone: true,
  imports: [CommonModule, TituloComponent,CatalogoSelectComponent,ReactiveFormsModule],
  templateUrl: './agregar-cuenta.component.html',
  styleUrl: './agregar-cuenta.component.scss',
})
export class AgregarCuentaComponent implements OnInit {

  /**
   * Representa el catálogo de tipos de personas.
   * Se espera que esta propiedad sea un array de objetos `Catalogo`.
   */
  public tipoDePersona!: Catalogo[];

  /**
   * Una lista de países donde reside el titular de la cuenta.
   * 
   * @type {Catalogo[]}
   */
  public paisDondeRadica!: Catalogo[];
  
  /**
   * Una propiedad pública que contiene un array de objetos `Catalogo`.
   * Esta propiedad representa el catálogo de instituciones.
   */
  public institucion!: Catalogo[];

  /**
   * Representa el estado del componente, que es un array de objetos `Catalogo`.
   */
  public estado!: Catalogo[];

  /**
   * Un grupo de formularios para agregar una nueva cuenta.
   * Este grupo de formularios contiene los controles y validadores requeridos para el componente 'Agregar Cuenta'.
   */
  public agregarCuentaForm!: FormGroup;

  /**
   * Constructor del componente AgregarCuentaComponent.
   * 
   * @param _registroCuentasBancariasSvc - Servicio para gestionar registros de cuentas bancarias.
   * @param fb - Instancia de FormBuilder para crear formularios reactivos.
   */
  constructor( 
      private _registroCuentasBancariasSvc: RegistroCuentasBancariasService,
      private fb: FormBuilder) { 
        this.crearAgregarCuentaForm();
  }

  /**
   * Gancho de ciclo de vida que se llama después de que las propiedades enlazadas a datos de una directiva se inicializan.
   * Este método se utiliza para realizar la inicialización del componente, como la obtención de datos necesarios.
   * 
   * Se llaman los siguientes métodos en este orden:
   * - `getTipoDePersona()`: Obtiene el tipo de persona.
   * - `getPaisDondeRadica()`: Obtiene el país donde reside la persona.
   * - `getInstitucion()`: Obtiene la información de la institución.
   * - `getEstado()`: Obtiene la información del estado.
   */
  ngOnInit(): void {
    this.getTipoDePersona();
    this.getPaisDondeRadica();
    this.getInstitucion();
    this.getEstado();
  }

  /**
   * Crea una copia profunda del objeto proporcionado.
   * 
   * Este método serializa el objeto a una cadena JSON y luego lo analiza de nuevo a un nuevo objeto,
   * creando efectivamente una copia profunda. Tenga en cuenta que este enfoque puede no manejar funciones,
   * valores indefinidos o referencias circulares correctamente.
   * 
   * @param obj - El objeto que se va a copiar profundamente. Por defecto es un objeto vacío.
   * @returns Una copia profunda del objeto proporcionado.
   */
  public deepCopy(obj = {}) {
    return JSON.parse(JSON.stringify(obj));
  }

  /**
   * Crea e inicializa el grupo de formularios para agregar una cuenta.
   * 
   * El grupo de formularios contiene los siguientes controles:
   * - `titularDeLaCuenta`: El nombre del titular de la cuenta, requerido y con una longitud máxima de 90 caracteres.
   * - `persona`: La persona asociada con la cuenta.
   * - `rfc`: El RFC (Registro Federal de Contribuyentes), requerido y debe coincidir con el patrón especificado.
   * - `numeroDeCuenta`: El número de cuenta, requerido y con una longitud máxima de 30 caracteres.
   * - `pais`: El país asociado con la cuenta.
   * - `institucion`: La institución asociada con la cuenta.
   * - `estado`: El estado asociado con la cuenta.
   * - `sucursal`: La sucursal, requerida, con una longitud máxima de 10 caracteres, y debe coincidir con el patrón especificado.
   * - `numeroDePlaza`: El número de plaza, requerido, con una longitud máxima de 10 caracteres, y debe coincidir con el patrón especificado.
   * 
   * @returns {void}
   */
  public crearAgregarCuentaForm():void {
    this.agregarCuentaForm = this.fb.group({
      titularDeLaCuenta: ['',[Validators.required,Validators.maxLength(90)]],
      persona: [''],
      rfc: ['',[Validators.required,Validators.pattern(REGEX_RFC)]],
      numeroDeCuenta: ['',[Validators.required,Validators.maxLength(30)]],
      pais: [''],
      institucion: [''],
      estado: [''],
      sucursal: ['',[Validators.required,Validators.maxLength(10),Validators.pattern(/[^0-9A-Za-z&_-]/)]],
      numeroDePlaza: ['',[Validators.required,Validators.maxLength(10),Validators.pattern(/[^0-9A-Za-z]/)]]
    })
  }

  /**
   * Obtiene los datos del tipo de persona desde el servicio y los asigna a la propiedad `tipoDePersona`.
   * 
   * Este método realiza una solicitud HTTP para recuperar los datos del tipo de persona utilizando el 
   * método del servicio `_registroCuentasBancariasSvc.getTipoDePersonaDatos()`. La respuesta se copia 
   * profundamente para asegurar la inmutabilidad y luego se asigna a la propiedad `tipoDePersona`.
   * 
   * @returns {void} Este método no devuelve un valor.
   */
  public getTipoDePersona(): void {
    this._registroCuentasBancariasSvc.getTipoDePersonaDatos().subscribe((response) => {
      const API_RESPONSE = this.deepCopy(response);
      this.tipoDePersona = API_RESPONSE.data;
    })
  }

  /**
   * Obtiene los datos del país donde reside el usuario desde el servicio.
   * Se suscribe a la respuesta del servicio y asigna los datos a `paisDondeRadica`.
   * Utiliza una copia profunda de la respuesta para asegurar la inmutabilidad.
   */
  public getPaisDondeRadica(): void {
    this._registroCuentasBancariasSvc.getPaisDondeRadicaDatos().subscribe((response) => {
      const API_RESPONSE = this.deepCopy(response);
      this.paisDondeRadica = API_RESPONSE.data;
    })
  }

  /**
   * Obtiene los datos de la institución desde el servicio y los asigna a la propiedad `institucion`.
   * 
   * Este método llama al método `getInstitucionDatos` del servicio `_registroCuentasBancariasSvc`,
   * se suscribe al observable devuelto por el servicio y procesa la respuesta.
   * La respuesta se copia profundamente y la propiedad `data` de la respuesta copiada se asigna a la propiedad `institucion`.
   * 
   * @returns {void}
   */
  public getInstitucion(): void {
    this._registroCuentasBancariasSvc.getInstitucionDatos().subscribe((response) => {
      const API_RESPONSE = this.deepCopy(response);
      this.institucion = API_RESPONSE.data;
    })
  }

  /**
   * Obtiene los datos del estado desde el servicio y los asigna a la propiedad `estado`.
   * 
   * Este método llama al método `getEstadoDatos` del servicio `_registroCuentasBancariasSvc`,
   * se suscribe al observable devuelto por el servicio y procesa la respuesta.
   * La respuesta se copia profundamente y la propiedad `data` de la respuesta copiada se asigna a la propiedad `estado`.
   * 
   * @returns {void}
   */
  public getEstado(): void {
    this._registroCuentasBancariasSvc.getEstadoDatos().subscribe((response) => {
      const API_RESPONSE = this.deepCopy(response);
      this.estado = API_RESPONSE.data;
    })
  }

  /**
   * Maneja la selección del tipo de persona en el formulario.
   * 
   * Este método verifica el valor del campo 'persona' en el grupo de formularios `agregarCuentaForm`.
   * Si el campo tiene un valor, habilita el campo 'persona'.
   * De lo contrario, deshabilita el campo 'persona'.
   */
  public tipoDePersonaSeleccion(): void {
    if (this.agregarCuentaForm.get('persona')?.value) {
      this.agregarCuentaForm.get('persona')?.enable();
    } else {
      this.agregarCuentaForm.get('persona')?.disable();
    }
  }

  /**
   * Habilita o deshabilita el control de formulario 'pais' basado en su valor actual.
   * Si el control de formulario 'pais' tiene un valor, se habilitará.
   * De lo contrario, se deshabilitará.
   */
  public paisDondeRadicaSeleccion(): void {
    if (this.agregarCuentaForm.get('pais')?.value) {
      this.agregarCuentaForm.get('pais')?.enable();
    } else {
      this.agregarCuentaForm.get('pais')?.disable();
    }
  }

  /**
   * Habilita o deshabilita el control de formulario 'institucion' basado en su valor actual.
   * Si el control de formulario 'institucion' tiene un valor, se habilitará.
   * De lo contrario, se deshabilitará.
   */
  public institucionSeleccion(): void {
    if (this.agregarCuentaForm.get('institucion')?.value) {
      this.agregarCuentaForm.get('institucion')?.enable();
    } else {
      this.agregarCuentaForm.get('institucion')?.disable();
    }
  }

  /**
   * Alterna el estado habilitado/deshabilitado del control de formulario 'estado' basado en su valor actual.
   * 
   * Si el control de formulario 'estado' tiene un valor, se habilitará. De lo contrario, se deshabilitará.
   * 
   * @returns {void}
   */
  public estadoSeleccion(): void {
    if (this.agregarCuentaForm.get('estado')?.value) {
      this.agregarCuentaForm.get('estado')?.enable();
    } else {
      this.agregarCuentaForm.get('estado')?.disable();
    }
  }
}
