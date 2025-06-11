import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, RequiredValidator, Validators } from "@angular/forms";
import { Catalogo, CategoriaMensaje, ConsultaioQuery, ConsultaioState, Notificacion, NotificacionesComponent, TipoNotificacionEnum } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent, SharedModule, TablaDinamicaComponent, TituloComponent } from "@libs/shared/data-access-user/src";
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DatosDelChoferNacional } from "../../../models/registro-muestras-mercancias.model";
import { read } from "fs";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { Chofer40103Service } from "../../../estados/chofer40103.service";
import { map, Observable, Subject, takeUntil, firstValueFrom } from "rxjs";


@Component({
  selector: 'app-choferes-datos',
  templateUrl: './data.de.choferes.component.html',
  styleUrls: ['./data.de.choferes.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    FormsModule,
    CatalogoSelectComponent,
    TablaDinamicaComponent,
    TituloComponent,
    NotificacionesComponent
  ],
})
export class DatosDeChoferesComponent implements OnInit, OnDestroy {

  @Input() readonly: boolean = false;
  @Input({ required: true }) datosDeChofere!: DatosDelChoferNacional;

  // Aquí puedes definir las propiedades y métodos necesarios para tu componente
  // datosConsulta: unknown;
  formChoferes!: FormGroup;
  destroyed$: Subject<unknown> = new Subject<unknown>();
  showNotification: boolean = true;

  constructor(private fb: FormBuilder,
    private modalService: BsModalService,
    private chofer40103Service: Chofer40103Service,
  ) {
    // Inicialización del componente
  }

  async ngOnInit(): Promise<void> {


    this.formChoferes = this.fb.group({

      curp: [{ value: this.datosDeChofere?.curp, disabled: false },
      [
        Validators.required,
        Validators.maxLength(18),
        Validators.pattern(/^[A-Z]{4}\d{6}[HM]{1}[A-Z]{5}[0-9A-Z]{2}$/), // CURP regex
      ]],

      rfc: [{ value: this.datosDeChofere?.rfc, disabled: false }, Validators.required],
      nombre: [{ value: this.datosDeChofere?.nombre, disabled: true }],
      primerApellido: [{ value: this.datosDeChofere?.primerApellido, disabled: true }],
      segundoApellido: [{ value: this.datosDeChofere?.segundoApellido, disabled: true }],
      numeroDeGafete: [{ value: this.datosDeChofere?.numeroDeGafete, disabled: true }],
      vigenciaGafete: [{ value: this.datosDeChofere?.vigenciaGafete, disabled: true }],

      calle: [{ value: this.datosDeChofere?.calle, disabled: this.readonly }],
      numeroExterior: [{ value: this.datosDeChofere?.numeroExterior, disabled: this.readonly }],
      numeroInterior: [{ value: this.datosDeChofere?.numeroInterior, disabled: this.readonly }],
      pais: [{ value: 1, disabled: true }],
      estado: [{ value: this.datosDeChofere?.estado, disabled: this.readonly }],
      municipioAlcaldia: [{ value: this.datosDeChofere?.municipioAlcaldia, disabled: this.readonly }],
      colonia: [{ value: this.datosDeChofere?.colonia, disabled: this.readonly }],
      paisDeResidencia: [{ value: this.datosDeChofere?.paisDeResidencia, disabled: this.readonly }],
      ciudad: [{ value: this.datosDeChofere?.ciudad, disabled: this.readonly }],
      localidad: [{ value: this.datosDeChofere?.localidad, disabled: this.readonly }],
      codigoPostal: [{ value: this.datosDeChofere?.codigoPostal, disabled: this.readonly }],
      correoElectronico: [{ value: this.datosDeChofere?.correoElectronico, disabled: this.readonly }],
      telefono: [{ value: this.datosDeChofere?.telefono, disabled: this.readonly }],
    });

    await this.paisListData();
    await this.updateListsData(this.datosDeChofere);

  }


  @Output() cancelEvent = new EventEmitter<void>();
  @Output() addModalEvent = new EventEmitter<DatosDelChoferNacional>();

  @ViewChild('datosDeChoferesModal') datosDeChoferesModal!: TemplateRef<any>;
  modalRef?: BsModalRef;

  paisList: Catalogo[] = [];
  estadoList: Catalogo[] = [];
  municipioList: Catalogo[] = [];
  coloniaList: Catalogo[] = [];


  /**
   * Obtiene la lista de países emisores desde el servicio `chofer40103Service` y la asigna a la propiedad `paisList`.
   *
   * @returns {void}
   */
  async paisListData(): Promise<void> {
    try {
      const DATA = await firstValueFrom(
        this.chofer40103Service
          .getPaisEmisor()
          .pipe(takeUntil(this.destroyed$))
      );
      this.paisList = DATA || [];
      if (this.paisList.length > 0) {
        this.onPaisChange(this.paisList[0]); // Inicializa el primer país
      }
    } catch (error) {
      // Manejo de errores si es necesario
      //console.error('Error al obtener la lista de países:', error);
    }
  }

  onPaisChange(value: Catalogo) {
    this.fetchEstadosByPais(value);
    this.formChoferes.controls['estado'].reset();
    this.formChoferes.controls['municipioAlcaldia'].reset();
    this.formChoferes.controls['colonia'].reset();
  }

  private async fetchEstadosByPais(value: Catalogo): Promise<Catalogo[]> {
    try {
      const DATA = await firstValueFrom(
        this.chofer40103Service
          .getEstadosPorPais(value.id)
          .pipe(takeUntil(this.destroyed$))
      );
      this.estadoList = DATA || [];
    } catch (error) {
      console.error('Error al obtener estados por país:', error);
    }
    return this.estadoList;
  }

  onEstadoChange(value: Catalogo) {

    this.fetchMunicipiosByEstado(value);

    this.formChoferes.controls['municipioAlcaldia'].reset();
    this.formChoferes.controls['colonia'].reset();
  }

  private async fetchMunicipiosByEstado(value: Catalogo): Promise<Catalogo[]> {
    try {
      const data = await firstValueFrom(
        this.chofer40103Service
          .getMunicipiosPorEstado(value.id)
          .pipe(takeUntil(this.destroyed$))
      );
      this.municipioList = data || [];
    } catch (error) {
      console.error('Error al obtener municipios por estado:', error);
    }
    return this.municipioList;

  }

  onMunicipioChange(value: Catalogo) {
    this.fetchColoniasByMunicipio(value);

    this.formChoferes.controls['colonia'].reset();
  }


  private async fetchColoniasByMunicipio(value: Catalogo): Promise<Catalogo[]> {
    try {
      const data = await firstValueFrom(
        this.chofer40103Service
          .getColoniasPorMunicipio(value.id)
          .pipe(takeUntil(this.destroyed$))
      );
      this.coloniaList = data || [];
    } catch (error) {
      console.error('Error al obtener colonias por municipio:', error);
    }
    return this.coloniaList;
  }

  /**
   * Obtiene los controles de formulario del formulario choferes.
   */
  get getFormValues(): { [key: string]: AbstractControl } {
    return this.formChoferes.controls;
  }


  openModal() {
    this.modalRef = this.modalService.show(this.datosDeChoferesModal, { class: 'modal-xl' });
  }

  closeModal() {
    this.modalRef?.hide();
    this.cancelEvent.emit();
  }

  /**
   * Busca un chofer por CURP.
   * @param curp La CURP a buscar.
   */
  onCurpInput() {
    const CURP_VALUE = this.formChoferes.get('curp')?.value;
    if (CURP_VALUE && CURP_VALUE.length >= 18) {
      this.buscarChoferNacional(CURP_VALUE);
    }
  }

  /**
   * Busca información de un chofer nacional utilizando su CURP.
   *
   * @param curp - La CURP del chofer nacional que se desea buscar.
   *               Si no se proporciona un valor, la función no realiza ninguna acción.
   *
   * @remarks
   * Esta función actualiza el formulario de choferes con los datos obtenidos.
   * Actualmente, los datos están representados por un objeto vacío.
   */
  async buscarChoferNacional(curp: string) {
    if (!curp) {
      this.showNotification = true;
      return;
    }

    const CHOFER_DATA: DatosDelChoferNacional = {
      curp: 'ABCD123456HJKLMN12',
      rfc: 'RFC124',
      nombre: 'Juan Pérez',
      primerApellido: 'Pérez',
      segundoApellido: 'Gómez',
      numeroDeGafete: 'GAFETE124',
      vigenciaGafete: '2024-12-31',
      calle: 'Calle Falsa',
      numeroExterior: '124',
      numeroInterior: 'A',
      pais: 'México',
      estado: 'Aprobado',
      municipioAlcaldia: 'Alcaldía de Bogotá',
      colonia: 'Dior Sauvage by Christian Dior',
      ciudad: 'Ciudad 1',
      localidad: 'Localidad 1',
      codigoPostal: '12445',
      paisDeResidencia: '1',
      id: 1,
      telefono: '312443124',
      correoElectronico: 'abc@xyz.com'
    };

    await this.updateListsData(CHOFER_DATA);

    // Rellenar el formulario
    this.formChoferes.patchValue(CHOFER_DATA);
  }

  private async updateListsData(data: DatosDelChoferNacional) {
    const ESTADOS = await this.fetchEstadosByPais(this.paisList[0]);
    data.pais = this.paisList[0].id.toString();

    const ESTADOS_SELECCIONADO = ESTADOS?.find(Item => Item.descripcion === data.estado);
    if (ESTADOS_SELECCIONADO) {
      data.estado = ESTADOS_SELECCIONADO.id.toString();
      const MUNICIPIOS = await this.fetchMunicipiosByEstado(ESTADOS_SELECCIONADO);

      const MUNICIPIO_SELECCIONADO = MUNICIPIOS?.find(item => item.descripcion === data.municipioAlcaldia);
      if (MUNICIPIO_SELECCIONADO) {
        data.municipioAlcaldia = MUNICIPIO_SELECCIONADO.id.toString();
        await this.fetchColoniasByMunicipio(MUNICIPIO_SELECCIONADO);
        const COLONIA_SELECCIONADA = this.coloniaList.find(c => c.descripcion === data.colonia);
        if (COLONIA_SELECCIONADA) {
          data.colonia = COLONIA_SELECCIONADA.id.toString();
        }
      }
    }
  }

  limpiarFormulario() {
    this.formChoferes.reset();
  }
  guardarFilaEditada() {
      this.formChoferes.markAllAsTouched();
      this.formChoferes.updateValueAndValidity();

    if (this.formChoferes.valid) {
      const DATA = this.formChoferes.getRawValue() as DatosDelChoferNacional;
      DATA.pais = this.paisList.find(p => p.id === Number(DATA.pais))?.descripcion || '';
      DATA.estado = this.estadoList.find(e => e.id === Number(DATA.estado))?.descripcion || '';
      DATA.municipioAlcaldia = this.municipioList.find(m => m.id === Number(this.formChoferes.get('municipioAlcaldia')?.value))?.descripcion || '';
      DATA.colonia = this.coloniaList.find(c => c.id === Number(DATA.colonia))?.descripcion || '';
      DATA.paisDeResidencia = this.paisList.find(p => p.id === Number(DATA.paisDeResidencia))?.descripcion || '';

      // Aquí puedes realizar la lógica para guardar los datos del chofer
      this.addModalEvent.emit(DATA);
      this.closeModal();
    } else {
      this.showNotification = true;
      this.alertaNotificacion.mensaje = 'Formulario inválido, por favor verifica los campos.';
    }
  }

  /**
   * Verifica si el control del formulario es inválido y ha sido tocado.
   * @param controlName El nombre del control del formulario.
   * @returns {boolean | null} `true` si el control es inválido y tocado, `null` si no existe el control.
   */
  isInvalid(controlName: string): boolean | null {
    const CONTROL = this.formChoferes.get(controlName);
    return CONTROL ? CONTROL.invalid && CONTROL.touched : null;
  }

  ngOnDestroy(): void {
    this.destroyed$.next(1);
    this.destroyed$.complete();
  }

  /**
   * Inicializa la variable de alertaNotificación con un objeto de tipo Notificacion.
   * @type {Notificacion}
   */
  public alertaNotificacion: Notificacion = {
    tipoNotificacion: TipoNotificacionEnum.ALERTA,
    categoria: CategoriaMensaje.INFORMACION,
    modo: '',
    titulo: 'Error',
    mensaje: 'Favor de ingresar CURP o RFC',
    cerrar: true,
    txtBtnAceptar: '',
    txtBtnCancelar: '',
  }

}