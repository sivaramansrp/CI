import { Component } from '@angular/core';
import { CatalogosSelect, InputFecha } from '../../../../core/models/shared/components.model';
import { Catalogo } from '../../../../core/models/shared/catalogos.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PeximService } from '../../../../core/services/130118/pexim/pexim.service';
import { FECHA_SALIDA } from '../../../../shared/constantes/servicios-extraordinarios.enum';
import { ValidacionesFormularioService } from '../../../../core/services/shared/validaciones-formulario/validaciones-formulario.service';

@Component({
  selector: 'solicitud',
  templateUrl: './solicitud.component.html',
  styleUrl: './solicitud.component.scss',
})
export class SolicitudComponent {
  datosRegimenMercancia!: CatalogosSelect;
  datosClasifiRegimen!: CatalogosSelect;
  datosFraccionArancelaria!: CatalogosSelect;
  datosNico!: CatalogosSelect;
  datosPaisOrigen!: CatalogosSelect;
  datosPaisDestino!: CatalogosSelect;
  datosEstado!: CatalogosSelect;
  isVisibleFisica: boolean;
  isVisibleMoral: boolean;

  regimenMercanciaSeleccionada!: Catalogo;
  clasifiRegimenSeleccionada!: Catalogo;
  fraccionArancelariaSeleccionada!: Catalogo;
  nicoSeleccionada!: Catalogo;
  paisOrigenSeleccionado!: Catalogo;
  paisDestinoSeleccionado!: Catalogo;
  estadoSeleccionado!: Catalogo;

  fechaFinalInput: InputFecha = FECHA_SALIDA;


  FormSolicitud!: FormGroup;

  constructor(
    private peximService: PeximService,
    private fb: FormBuilder,
    private validacionesService: ValidacionesFormularioService
  ) {
    this.crearFormSolicitud();
  }

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
   *
   * @returns {FormGroup} El grupo de formulario 'datosRegimen'.
   */
  get datosRegimen(): FormGroup {
    return this.FormSolicitud.get('datosRegimen') as FormGroup;
  }

  /**
   * Obtiene el grupo de formulario 'datosMercancia' del formulario principal 'FormSolicitud'.
   *
   * @returns {FormGroup} El grupo de formulario 'datosMercancia'.
   */
  get datosMercancia(): FormGroup {
    return this.FormSolicitud.get('datosMercancia') as FormGroup;
  }

  /**
   * Obtiene el grupo de formulario 'datosProducto' del formulario principal 'FormSolicitud'.
   *
   * @returns {FormGroup} El grupo de formulario 'datosProducto'.
   */
  get datosProducto(): FormGroup {
    return this.FormSolicitud.get('datosProducto') as FormGroup;
  }

  /**
   * Obtiene el grupo de formulario 'registroFederal' del formulario principal 'FormSolicitud'.
   *
   * @returns {FormGroup} El grupo de formulario 'registroFederal'.
   */
  get registroFederal(): FormGroup {
    return this.FormSolicitud.get('registroFederal') as FormGroup;
  }

  isValid(form: FormGroup, field: string) {
    return this.validacionesService.isValid(form, field);
  }

  crearFormSolicitud() {
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
            Validators.max(99999999999999.99),
            Validators.pattern(/^(\d{1,14})(\.\d{1,2})?$/)
          ]
        ],
        valorFacturaUSD: ['',
          [
            Validators.required,
            Validators.maxLength(17),
            Validators.min(0),
            Validators.max(99999999999999.99),
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
    })
  }

  validarFormulario() {
    if (this.FormSolicitud.invalid) {
      this.FormSolicitud.markAllAsTouched();
      return;
    }
  }

  escapeHtmlQuotes(value: string): string {
    return value ? value.replace(/"/g, '&#34;') : '';//Reemplazar comillas dobles por comillas dobles HTML
  }

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

  personaMoral(): void {
    this.isVisibleFisica = false;
    this.isVisibleMoral = true;

    // Restablecer los valores y desactivar campos para "Persona Moral"
    this.FormSolicitud.get('datosProducto.nombre')?.setValue('');
    this.FormSolicitud.get('datosProducto.apellidoPaterno')?.setValue('');
    this.FormSolicitud.get('datosProducto.apellidoMaterno')?.setValue('');
    this.FormSolicitud.get('datosProducto.razonSocial')?.setValue('');  //Asegúrate de habilitar los campos relevantes
    this.FormSolicitud.get('datosProducto.razonSocial')?.enable();

    this.FormSolicitud.get('datosProducto.nombre')?.disable();
    this.FormSolicitud.get('datosProducto.apellidoPaterno')?.disable();
    this.FormSolicitud.get('datosProducto.apellidoMaterno')?.disable();
  }

  personaFisica(): void {
    this.isVisibleFisica = true;
    this.isVisibleMoral = false;

    //Restablecer los valores y habilitar campos para "Persona Física"
    this.FormSolicitud.get('datosProducto.razonSocial')?.setValue('');
    this.FormSolicitud.get('datosProducto.razonSocial')?.disable();

    this.FormSolicitud.get('datosProducto.nombre')?.enable();
    this.FormSolicitud.get('datosProducto.apellidoPaterno')?.enable();
    this.FormSolicitud.get('datosProducto.apellidoMaterno')?.enable();
  }

  //Función para calcular el precio por unidad
  calcularUmtPrecioUnitario() {
    this.calcularPrecioUnitarioUSD();
  }

  // Función para calcular el precio unitario en USD
  calcularPrecioUnitarioUSD() {
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

  // Función para truncar la parte decimal a dos decimales
  truncar(num: number): number {
    const numStr = num.toString();
    if (numStr.indexOf('.') !== -1) {
      const numArr = numStr.split('.');
      if (numArr.length === 1) {
        return Number(num);
      } else {
        return parseFloat(numArr[0] + '.' + numArr[1].slice(0, 3));  // Limitar a 2 decimales
      }
    } else {
      return Number(num);
    }
  }

  regimenMercancia(e: Catalogo) {
    this.regimenMercanciaSeleccionada = e;
    // this.solIndividual = this.individualRegimenMercancia();
  }

  clasifiRegimen(e: Catalogo) {
    this.clasifiRegimenSeleccionada = e;
    // this.solIndividual = this.individualClasifiRegimen();
  }

  fraccionArancelaria(e: Catalogo) {
    this.fraccionArancelariaSeleccionada = e;
    // this.solIndividual = this.individualFraccionArancelaria();
  }

  nico(e: Catalogo) {
    this.nicoSeleccionada = e;
    // this.solIndividual = this.individualNico();
  }

  paisOrigen(e: Catalogo) {
    this.paisOrigenSeleccionado = e;
    // this.solIndividual = this.individualPaisOrigen();
  }

  paisDestino(e: Catalogo) {
    this.paisDestinoSeleccionado = e;
    // this.solIndividual = this.individualPaisDestino();
  }

  estado(e: Catalogo) {
    this.estadoSeleccionado = e;
    // this.solIndividual = this.individualEstado();
  }

  cambioFechaFinal(nuevo_valor: string) {
    this.datosMercancia.get('fechaFinal')?.setValue(nuevo_valor);
    this.datosMercancia.get('fechaFinal')?.markAsUntouched();
  }

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
