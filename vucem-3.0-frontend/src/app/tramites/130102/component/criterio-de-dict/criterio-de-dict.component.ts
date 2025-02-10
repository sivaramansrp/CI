import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Catalogo } from '../../../../core/models/shared/catalogos.model';
import { CatalogosSelect } from '../../../../core/models/shared/components.model';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SelectCatalogosComponent } from '../../../../shared/components/select-catalogos/select-catalogos.component';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';

/**
 * CriterioDeDictComponent es un componente que maneja la selección de solicitudes de mercancía.
 */
@Component({
  selector: 'app-criterio-de-dict',
  standalone: true,
  imports: [TituloComponent, SelectCatalogosComponent],
  templateUrl: './criterio-de-dict.component.html',
  styleUrl: './criterio-de-dict.component.scss',
})
export class CriterioDeDictComponent {
  /**
   * Configuración del formulario de criterio de dictamen.
   */
  frmCriterioDict!: FormGroup;

  /**
   * Configuración del select de solicitudes de mercancía.
   * @type {CatalogosSelect}
   */
  solicitudMercancia!: CatalogosSelect;

  /**
   * Solicitud de mercancía seleccionada.
   */
  selectedSolicitudMercancia: Catalogo = { id: 0, descripcion: '' };

  /**
   * @constructor
   * @param {FormBuilder} fb - El constructor de formularios.
   * @param {HttpClient} http - El cliente HTTP para realizar solicitudes.
   * @returns void
   * @description Inicializa el componente CriterioDeDict.
   */
  constructor(private fb: FormBuilder, private http: HttpClient) {}

  /**
   * Maneja la selección de una solicitud de mercancía.
   * @param e - La solicitud de mercancía seleccionada.
   */
  solicitudMercanciaSeleccion(e: Catalogo): void {
    this.selectedSolicitudMercancia = e;
  }

  /**
   * Obtiene las solicitudes de mercancía.
   * @returns void
   * @description Obtiene las solicitudes de mercancía.
   */
  ngOnInit(): void {
    this.fetchSolicitudMercancia();
    this.frmCriterioDict = this.fb.group({
      solicitudMercancia: [
        this.selectedSolicitudMercancia,
        Validators.required,
      ],
    });
  }

  /**
   * Obtiene las solicitudes de mercancía.
   * @returns void
   * @description Obtiene las solicitudes de mercancía.
   * @todo Cambiar la URL por la URL real de la API.
   */
  fetchSolicitudMercancia() {
    this.http
      .get('/assets/json/130102/solicitud_mercancia.json')
      .subscribe((data: any) => {
        this.solicitudMercancia = data;
      });
  }
}
