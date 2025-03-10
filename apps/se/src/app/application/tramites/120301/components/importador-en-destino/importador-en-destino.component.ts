/**
 * @component ImportadorEnDestinoComponent
 * @description Este componente es responsable de manejar el formulario del importador en destino.
 * Incluye un formulario para capturar los datos del importador y funcionalidades adicionales.
 * 
 * @import { Component } from '@angular/core';
 * @import { FormGroup } from '@angular/forms';
 */


import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Catalogo } from '@ng-mf/data-access-user';
import { Component, OnInit } from '@angular/core';
import { ElegibilidadTextilesService } from '../../services/elegibilidad-textiles/elegibilidad-textiles.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-importador-en-destino',
  templateUrl: './importador-en-destino.component.html',
  styleUrl: './importador-en-destino.component.scss'
})
export class ImportadorEnDestinoComponent implements OnInit{
  /**
   * @property {FormGroup} forma - El grupo de formularios para capturar los datos del importador.
   */
  importadorForm!: FormGroup;

  /**
   * @property {FormGroup} importadorEnDestino - El grupo de formularios para los datos del certificado de registro.
   */
  importadorEnDestino!: FormGroup;

  tipo: Catalogo[] = [];

  /**
   * Constructor del componente.
   * @constructor
   * @param {FormBuilder} fb - Servicio para la creación de formularios.
   * @param {HttpClient} httpServicios - Cliente HTTP para realizar solicitudes.--220201
   */
  constructor(private ElegibilidadTextilesService: ElegibilidadTextilesService, private readonly fb: FormBuilder, private readonly httpServicios: HttpClient) {
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
      cantidadTotalImportador: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      razonSocialImportador: ['', Validators.required],
      domicilio: ['', Validators.required],
      ciudadImportador: ['', Validators.required],
      cpImportador: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]], // Assuming CP is a 5-digit code
      PaisImportador: ['', Validators.required]
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
    this.ElegibilidadTextilesService.obtenerMenuDesplegable('tipo.json').subscribe(data => {
      this.tipo = data as Catalogo[];
    })
  }

}