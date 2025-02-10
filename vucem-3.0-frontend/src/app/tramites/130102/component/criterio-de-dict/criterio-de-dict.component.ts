import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Catalogo } from '../../../../core/models/shared/catalogos.model';
import { CatalogosSelect } from '../../../../core/models/shared/components.model';
import { Component } from '@angular/core';
import { SelectCatalogosComponent } from '../../../../shared/components/select-catalogos/select-catalogos.component';
import { TituloComponent } from "../../../../shared/components/titulo/titulo.component";

/**
 * CriterioDeDictComponent es un componente que maneja la selección de solicitudes de mercancía.
 */
@Component({
  selector: 'app-criterio-de-dict',
  standalone: true,
  imports: [TituloComponent, SelectCatalogosComponent],
  templateUrl: './criterio-de-dict.component.html',
  styleUrl: './criterio-de-dict.component.scss'
})
export class CriterioDeDictComponent {

  /**
   * Configuración del formulario de criterio de dictamen.
   */
  frmCriterioDict!: FormGroup;

  /**
   * Configuración del select de solicitudes de mercancía.
   */
  solicitudMercancia: CatalogosSelect = {
    labelNombre: 'Solicitud mercancia esquema regla octava clave',
    required: true,
    primerOpcion: 'Seleccione una Solicitud mercancia',
    catalogos: [
      { id: 1, descripcion: 'La SE autorizará la importación de mercancías de la Regla 8a, cuando se' },
      { id: 2, descripcion: 'Solicitud mercancia 2' },
      { id: 3, descripcion: 'Solicitud mercancia 3' }
    ]
  };

  /**
   * Solicitud de mercancía seleccionada.
   */
  selectedSolicitudMercancia: Catalogo = { id: 0, descripcion: '' };

  /**
   * Maneja la selección de una solicitud de mercancía.
   * @param e - La solicitud de mercancía seleccionada.
   */
  constructor(private fb: FormBuilder) {}

  /**
   * Maneja la selección de una solicitud de mercancía.
   * @param e - La solicitud de mercancía seleccionada.
   */
  solicitudMercanciaSeleccion(e: Catalogo): void {
    this.selectedSolicitudMercancia = e;
  }

  /**
   * Inicializa el formulario de criterio de dictamen.  
   * @returns void
   */
  ngOnInit(): void {  
    this.frmCriterioDict = this.fb.group({
      solicitudMercancia: [this.selectedSolicitudMercancia, Validators.required]
    });
  }

}
