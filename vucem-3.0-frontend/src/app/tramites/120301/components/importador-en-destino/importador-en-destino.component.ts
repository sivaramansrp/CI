/**
 * @component ImportadorEnDestinoComponent
 * @description Este componente es responsable de manejar el formulario del importador en destino.
 * Incluye un formulario para capturar los datos del importador y funcionalidades adicionales.
 * 
 * @import { Component } from '@angular/core';
 * @import { FormGroup } from '@angular/forms';
 */

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatalogosSelect } from '../../../../core/models/shared/components.model';

import { HttpClient } from '@angular/common/http';
import { RespuestaCatalogos } from '../../../../core/models/shared/catalogos.model';

@Component({
  selector: 'importador-en-destino',
  templateUrl: './importador-en-destino.component.html',
  styleUrl: './importador-en-destino.component.scss'
})
export class ImportadorEnDestinoComponent {
  /**
   * @property {FormGroup} forma - El grupo de formularios para capturar los datos del importador.
   */
  importadorForm!: FormGroup;

  /**
   * @property {FormGroup} importadorEnDestino - El grupo de formularios para los datos del certificado de registro.
   */
  importadorEnDestino!: FormGroup;

  tipo: CatalogosSelect = {
    labelNombre: 'Tipo I O R(Importer of Record)*:',
    required: true,
    primerOpcion: '',
    catalogos: [],
  };

  /**
   * Constructor del componente.
   * @constructor
   * @param {FormBuilder} fb - Servicio para la creación de formularios.
   * @param {HttpClient} httpServicios - Cliente HTTP para realizar solicitudes.--220201
   */
  constructor(private readonly fb: FormBuilder, private readonly httpServicios: HttpClient) {
    this.crearFormulario();
    this.initActionFormBuild();
  }

  /**
   * Crea el grupo de formularios principal.
   * @method crearFormulario
   */
  crearFormulario(): void {
    this.importadorForm = this.fb.group({
      tipo: ['', Validators.required],
      cantidadTotal: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      razonSocial: ['', Validators.required],
      domicilio: ['', Validators.required],
      ciudad: ['', Validators.required],
      cp: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]], // Assuming CP is a 5-digit code
      pais: ['', Validators.required]
    });
  }

  /**
   * Inicializa el componente.
   * @method ngOnInit
   */
  ngOnInit(): void {
    this.obtenerListasDesplegables();
  }

  /**
   * Inicializa el grupo de formularios anidado para los datos de la solicitud.
   * @method initActionFormBuild
   */
  initActionFormBuild() {
    this.importadorEnDestino = this.fb.group({
      tipo: ['', Validators.required],
    });

  }

  /**
   * Obtiene las listas desplegables.
   * @method obtenerListasDesplegables
   */
  obtenerListasDesplegables() {
    this.obtenerIngresoSelectList();
  }

  /**
   * Obtiene la lista para el select de aduana de ingreso.
   * @method obtenerIngresoSelectList
   */
  obtenerIngresoSelectList() {
    this.httpServicios.get<RespuestaCatalogos>('../../../../../assets/json/120301/tipo.json').subscribe((data): void => {
      const datos = data?.data;
      this.tipo['catalogos'] = datos;
    });
  }

}