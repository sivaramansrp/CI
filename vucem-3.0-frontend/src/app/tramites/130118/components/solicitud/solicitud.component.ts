import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Catalogo } from '../../../../core/models/shared/catalogos.model';
import { FECHA_SALIDA } from '../../../../shared/constantes/servicios-extraordinarios.enum';
import { PeximService } from '../../../../core/services/130118/pexim/pexim.service';
import { ValidacionesFormularioService } from '../../../../core/services/shared/validaciones-formulario/validaciones-formulario.service';
import { CatalogosSelect, InputFecha } from '../../../../core/models/shared/components.model';

/**
 * Componente para la vista de la solicitud de la sección de "130118".
 */
@Component({
  selector: 'solicitud',
  templateUrl: './solicitud.component.html',
  styleUrl: './solicitud.component.scss',
})
export class SolicitudComponent implements OnInit {
  /**
   * Datos del catálogo de régimen de mercancía.
   */
  datosRegimenMercancia!: CatalogosSelect;

  /**
   * Datos del catálogo de clasificación de régimen.
   */
  datosClasifiRegimen!: CatalogosSelect;

  /**
   * Datos del catálogo de fracción arancelaria.
   */
  datosFraccionArancelaria!: CatalogosSelect;

  /**
   * Datos del catálogo de NICO.
   */
  datosNico!: CatalogosSelect;

  /**
   * Datos del catálogo de país de origen.
   */
  datosPaisOrigen!: CatalogosSelect;

  /**
   * Datos del catálogo de país de destino.
   */
  datosPaisDestino!: CatalogosSelect;

  /**
   * Datos del catálogo de estado.
   */
  datosEstado!: CatalogosSelect;

  /**
   * Indica si la persona física es visible.
   */
  isVisibleFisica: boolean;

  /**
   * Indica si la persona moral es visible.
   */
  isVisibleMoral: boolean;

  /**
   * Régimen de mercancía seleccionado.
   */
  regimenMercanciaSeleccionada!: Catalogo;

  /**
   * Clasificación de régimen seleccionada.
   */
  clasifiRegimenSeleccionada!: Catalogo;

  /**
   * Fracción arancelaria seleccionada.
   */
  fraccionArancelariaSeleccionada!: Catalogo;

  /**
   * NICO seleccionado.
   */
  nicoSeleccionada!: Catalogo;

  /**
   * País de origen seleccionado.
   */
  paisOrigenSeleccionado!: Catalogo;

  /**
   * País de destino seleccionado.
   */
  paisDestinoSeleccionado!: Catalogo;

  /**
   * Estado seleccionado.
   */
  estadoSeleccionado!: Catalogo;

  /**
   * Fecha final de entrada.
   */
  fechaFinalInput: InputFecha = FECHA_SALIDA;

  /**
   * Formulario principal de la solicitud.
   */
  FormSolicitud!: FormGroup;

  /**
   * Constructor del componente.
   * @param peximService Servicio para obtener datos de PEXIM.
   * @param fb FormBuilder para crear formularios.
   * @param validacionesService Servicio para validaciones de formularios.
   */
  constructor(
    private peximService: PeximService,
    private fb: FormBuilder,
    private validacionesService: ValidacionesFormularioService
  ) {
    // Inicializar el formulario principal
    this.crearFormSolicitud();
  }

  /**
   * Método que se ejecuta al iniciar el componente.
   * Obtiene los catálogos necesarios para el formulario.
   * Muestra los campos correspondientes a la persona seleccionada.
   * @returns void
   */
  ngOnInit(): void {
    this.getRegimenMercancia();
    this.getClasifiRegimen();
    this.getFraccionArancelaria();
    this.getNico();
    this.getPaisOrigen();
    this.getPaisDestino();
    this.getEstado();
    this.muestraCamposPersona();
  }

  /**
   * Obtiene el grupo de formulario 'datosRegimen' del formulario principal 'FormSolicitud'.
   * @returns {FormGroup} El grupo de formulario 'datosRegimen'.
   */
  get datosRegimen(): FormGroup {
    return this.FormSolicitud.get('datosRegimen') as FormGroup;
  }

  /**
   * Obtiene el grupo de formulario 'datosMercancia' del formulario principal 'FormSolicitud'.
   * @returns {FormGroup} El grupo de formulario 'datosMercancia'.
   */
  get datosMercancia(): FormGroup {
    return this.FormSolicitud.get('datosMercancia') as FormGroup;
  }

  /**
   * Obtiene el grupo de formulario 'datosProducto' del formulario principal 'FormSolicitud'.
   * @returns {FormGroup} El grupo de formulario 'datosProducto'.
   */
  get datosProducto(): FormGroup {
    return this.FormSolicitud.get('datosProducto') as FormGroup;
  }

  /**
   * Obtiene el grupo de formulario 'registroFederal' del formulario principal 'FormSolicitud'.
   * @returns {FormGroup} El grupo de formulario 'registroFederal'.
   */
  get registroFederal(): FormGroup {
    return this.FormSolicitud.get('registroFederal') as FormGroup;
  }

  /**
   * Método para validar el formulario.
   * @param form Formulario a validar.
   * @param field Campo a validar.
   * @returns {boolean} Regresa un booleano si el campo es válido o no.
   */
  isValid(form: FormGroup, field: string): boolean {
    return this.validacionesService.isValid(form, field);
  }

  /**
   * Método para crear el formulario principal de la solicitud.
   */
  crearFormSolicitud(): void {
    this.FormSolicitud = this.fb.group({
      datosRegimen: this.fb.group({
        regimenMercancia: ['', Validators.required],
        clasifiRegimen: ['', Validators.required]
      }),
      datosMercancia: this.fb.group({
        valueTA: ['',
          [
            Validators.required,
            Validators.maxLength(1000)
          ],
        ],
        fraccionArancelaria: ['', Validators.required],
        nico: ['', Validators.required],
        unidadMedidaTarifaria: ['', Validators.required],
        cantidadTarifaria: ['',
          [
            Validators.required,
            Validators.maxLength(17),
            Validators.min(0),
            Validators.max(parseFloat('99999999999999.99')),
            Validators.pattern(/^(\d{1,14})(\.\d{1,2})?$/)
          ]
        ],
        valorFacturaUSD: ['',
          [
            Validators.required,
            Validators.maxLength(17),
            Validators.min(0),
            Validators.max(parseFloat('99999999999999.99')),
            Validators.pattern(/^(\d{1,14})(\.\d{1,2})?$/)
          ]
        ],
        precioUnitarioUSD: [
          { value: '', disabled: true }
        ],
        paisOrigen: ['', Validators.required],
        paisDestino: ['', Validators.required],
        lote: ['',
          [
            Validators.required,
            Validators.maxLength(60)
          ]
        ],
        fechaSalida: [
          { value: '', disabled: true }
        ],
        observaciones: ['', [Validators.maxLength(250)]],
        observacionMerc: ''
      }),
      datosProducto: this.fb.group({
        tipoPersona: ['', Validators.required],
        nombre: ['', [Validators.required, Validators.maxLength(200)]],
        apellidoPaterno: ['', [Validators.required, Validators.maxLength(200)]],
        apellidoMaterno: ['', [Validators.maxLength(200)]],
        razonSocial: ['', [Validators.required, Validators.maxLength(250)]],
        molinoSeleccion: [
          '', [Validators.required],
        ],
        domicilio: ['', [Validators.required, Validators.maxLength(1000)]]
      }),
      registroFederal: this.fb.group({
        entidadSolicitud: ['', Validators.required],
        representacionFederal: ['', Validators.required]
      })
    });
  }

  /**
   * Método para validar el formulario.
   * @returns void
   */
  validarFormulario(): void {
    if (this.FormSolicitud.invalid) {
      this.FormSolicitud.markAllAsTouched();
      return;
    }
  }

  /**
   * Método para escapar comillas dobles en una cadena.
   * @param value Cadena a escapar.
   * @returns {string} Cadena con comillas escapadas.
   */
  escapeHtmlQuotes(value: string): string {
    return value ? value.replace(/"/g, '&#34;') : '';
  }

  /**
   * Método para mostrar los campos correspondientes a la persona seleccionada.
   * @returns void
   */
  muestraCamposPersona(): void {
    const razonSocial = this.FormSolicitud.get('datosProducto.razonSocial')?.value;
    const nombre = this.FormSolicitud.get('datosProducto.nombre')?.value;

    if (razonSocial !== '') {
      this.personaMoral();
      this.FormSolicitud.get('datosProducto.tipoPersona')?.setValue('pmoral');
    } else if (nombre !== '') {
      this.personaFisica();
      this.FormSolicitud.get('datosProducto.tipoPersona')?.setValue('pfisica');
    }
  }

  /**
   * Método para mostrar los campos correspondientes a una persona moral.
   * @returns void
   */
  personaMoral(): void {
    this.isVisibleFisica = false;
    this.isVisibleMoral = true;

    // Restablecer los valores y desactivar campos para "Persona Moral"
    this.FormSolicitud.get('datosProducto.nombre')?.setValue('');
    this.FormSolicitud.get('datosProducto.apellidoPaterno')?.setValue('');
    this.FormSolicitud.get('datosProducto.apellidoMaterno')?.setValue('');
    this.FormSolicitud.get('datosProducto.razonSocial')?.setValue('');
    this.FormSolicitud.get('datosProducto.razonSocial')?.enable();

    this.FormSolicitud.get('datosProducto.nombre')?.disable();
    this.FormSolicitud.get('datosProducto.apellidoPaterno')?.disable();
    this.FormSolicitud.get('datosProducto.apellidoMaterno')?.disable();
  }

  /**
   * Método para mostrar los campos correspondientes a una persona física.
   * @returns void
   */
  personaFisica(): void {
    this.isVisibleFisica = true;
    this.isVisibleMoral = false;

    // Restablecer los valores y habilitar campos para "Persona Física"
    this.FormSolicitud.get('datosProducto.razonSocial')?.setValue('');
    this.FormSolicitud.get('datosProducto.razonSocial')?.disable();

    this.FormSolicitud.get('datosProducto.nombre')?.enable();
    this.FormSolicitud.get('datosProducto.apellidoPaterno')?.enable();
    this.FormSolicitud.get('datosProducto.apellidoMaterno')?.enable();
  }

  /**
   * Función para calcular el precio por unidad.
   */
  calcularUmtPrecioUnitario(): void {
    this.calcularPrecioUnitarioUSD();
  }

  /**
   * Función para calcular el precio unitario en USD.
   */
  calcularPrecioUnitarioUSD(): void {
    const cantidadUmt = this.FormSolicitud.get('datosMercancia.cantidadTarifaria')?.value;
    const mercanciaAviso = this.FormSolicitud.get('datosMercancia.valorFacturaUSD')?.value;

    if (cantidadUmt != null && cantidadUmt.toString().length >= 1 &&
      mercanciaAviso != null && mercanciaAviso.toString().length >= 1) {

      if (cantidadUmt === 0 || cantidadUmt.toString().length === 0) {
        this.FormSolicitud.get('precioUnitarioAcero')?.setValue('0');
      } else {
        const factor = 10000000;
        let resultPrecioUni: number;

        if ((mercanciaAviso * 1000) < cantidadUmt) {
          resultPrecioUni = 0;
        } else {
          const resultPrecioUniAux = this.truncar(
            (mercanciaAviso * factor) / cantidadUmt / factor
          );
          resultPrecioUni = resultPrecioUniAux;
        }
        this.FormSolicitud.get('datosMercancia.precioUnitarioUSD')?.setValue(resultPrecioUni);
      }
    }
  }

  /**
   * Función para truncar la parte decimal a dos decimales.
   * @param num Número a truncar.
   * @returns {number} Número truncado.
   */
  truncar(num: number): number {
    const numStr = num.toString();
    if (numStr.indexOf('.') !== -1) {
      const numArr = numStr.split('.');
      if (numArr.length === 1) {
        return Number(num);
      } else {
        return parseFloat(numArr[0] + '.' + numArr[1].slice(0, 3));
      }
    } else {
      return Number(num);
    }
  }

  /**
   * Método para seleccionar el régimen de mercancía.
   * @param e Régimen de mercancía seleccionado.
   */
  regimenMercancia(e: Catalogo): void {
    this.regimenMercanciaSeleccionada = e;
  }

  /**
   * Método para seleccionar la clasificación de régimen.
   * @param e Clasificación de régimen seleccionada.
   */
  clasifiRegimen(e: Catalogo): void {
    this.clasifiRegimenSeleccionada = e;
  }

  /**
   * Método para seleccionar la fracción arancelaria.
   * @param e Fracción arancelaria seleccionada.
   */
  fraccionArancelaria(e: Catalogo): void {
    this.fraccionArancelariaSeleccionada = e;
  }

  /**
   * Método para seleccionar el NICO.
   * @param e NICO seleccionado.
   */
  nico(e: Catalogo): void {
    this.nicoSeleccionada = e;
  }

  /**
   * Método para seleccionar el país de origen.
   * @param e País de origen seleccionado.
   */
  paisOrigen(e: Catalogo): void {
    this.paisOrigenSeleccionado = e;
  }

  /**
   * Método para seleccionar el país de destino.
   * @param e País de destino seleccionado.
   */
  paisDestino(e: Catalogo): void {
    this.paisDestinoSeleccionado = e;
  }

  /**
   * Método para seleccionar el estado.
   * @param e Estado seleccionado.
   */
  estado(e: Catalogo): void {
    this.estadoSeleccionado = e;
  }

  /**
   * Método para cambiar la fecha final.
   * @param nuevo_valor Nuevo valor de la fecha final.
   */
  cambioFechaFinal(nuevo_valor: string): void {
    this.datosMercancia.get('fechaFinal')?.setValue(nuevo_valor);
    this.datosMercancia.get('fechaFinal')?.markAsUntouched();
  }

  /**
   * Método para obtener el catálogo de régimen de mercancía.
   */
  getRegimenMercancia(): void {
    this.peximService
      .getRegimenMercancia()
      .subscribe((resp) => {
        if (resp.code == 200) {
          const response = resp.data;

          this.datosRegimenMercancia = {
            labelNombre: 'Régimen al que se destinará la mercancía',
            required: true,
            primerOpcion: 'Selecciona un valor',
            catalogos: response,
          };
        }
      });
  }

  /**
   * Método para obtener el catálogo de clasificación de régimen.
   */
  getClasifiRegimen(): void {
    this.peximService
      .getClasifiRegimen()
      .subscribe((resp) => {
        if (resp.code == 200) {
          const response = resp.data;

          this.datosClasifiRegimen = {
            labelNombre: 'Clasificación de régimen',
            required: true,
            primerOpcion: 'Selecciona un valor',
            catalogos: response,
          };
        }
      });
  }

  /**
   * Método para obtener el catálogo de fracción arancelaria.
   */
  getFraccionArancelaria(): void {
    this.peximService
      .getFraccionArancelariaCatalogo()
      .subscribe((resp) => {
        if (resp.code == 200) {
          const response = resp.data;

          this.datosFraccionArancelaria = {
            labelNombre: 'Fracción arancelaria',
            required: true,
            primerOpcion: 'Selecciona un valor',
            catalogos: response,
          };
        }
      });
  }

  /**
   * Método para obtener el catálogo de NICO.
   */
  getNico(): void {
    this.peximService
      .getNicoCatalogo()
      .subscribe((resp) => {
        if (resp.code == 200) {
          const response = resp.data;

          this.datosNico = {
            labelNombre: 'NICO',
            required: true,
            primerOpcion: 'Selecciona un valor',
            catalogos: response,
          };
        }
      });
  }

  /**
   * Método para obtener el catálogo de país de origen.
   */
  getPaisOrigen(): void {
    this.peximService
      .getPaisOrigenCatalogo()
      .subscribe((resp) => {
        if (resp.code == 200) {
          const response = resp.data;

          this.datosPaisOrigen = {
            labelNombre: 'País origen del acero/País origen de la mercancía',
            required: true,
            primerOpcion: 'Selecciona un valor',
            catalogos: response,
          };
        }
      });
  }

  /**
   * Método para obtener el catálogo de país de destino.
   */
  getPaisDestino(): void {
    this.peximService
      .getPaisDestinoCatalogo()
      .subscribe((resp) => {
        if (resp.code == 200) {
          const response = resp.data;

          this.datosPaisDestino = {
            labelNombre: 'País exportador',
            required: true,
            primerOpcion: 'Selecciona un valor',
            catalogos: response,
          };
        }
      });
  }

  /**
   * Método para obtener el catálogo de estado.
   */
  getEstado(): void {
    this.peximService
      .getEstadoCatalogo()
      .subscribe((resp) => {
        if (resp.code == 200) {
          const response = resp.data;

          this.datosEstado = {
            labelNombre: 'Estado',
            required: true,
            primerOpcion: 'Selecciona un valor',
            catalogos: response,
          };
        }
      });
  }
}
