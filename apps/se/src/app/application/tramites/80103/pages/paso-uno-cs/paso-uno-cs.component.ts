
/**
 * compo doc
 * @component
 * @selector app-paso-uno-cs
 * @description
 * Este componente gestiona el primer paso del trámite 80103, permitiendo la visualización y selección
 * de pestañas y la configuración de las secciones correspondientes. Utiliza el estado centralizado
 * proporcionado por SeccionLibStore para mantener el control de las secciones y la validez de los formularios.
 *
 * Funcionalidades principales:
 * - Visualiza y administra las pestañas correspondientes al paso uno del trámite.
 * - Permite seleccionar la pestaña activa mediante el método `seleccionaTab`.
 * - Asigna las secciones y su validez al store global utilizando la configuración predeterminada.
 *
 * Componentes importados:
 * - `SeccionLibStore`: Store para el manejo del estado de las secciones.
 *
 * @templateUrl ./paso-uno-cs.component.html
 */

import { Component } from '@angular/core';

import { CONFIGURACION_DOS_DATOS, SECCIONES_TRAMITE_230401 } from '../../constantes/nuevo-programa.enum';
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src';
import { FraccionArancelariaDescripcion } from '../../../../shared/models/empresas.model';
import { SeccionLibStore } from '@libs/shared/data-access-user/src/core/estados/seccion.store';

/*
  * Componente para gestionar el primer paso del trámite 80103.
  * Este componente permite la visualización y selección de pestañas,
  * así como la configuración de las secciones correspondientes.
  *
  * @export
  * @class PasoUnoCsComponent
  */


@Component({
  selector: 'app-paso-uno-cs',
  templateUrl: './paso-uno-cs.component.html',
})
/**
 * Clase que representa el componente del primer paso del trámite 80103.
 * Este componente gestiona la visualización y selección de pestañas,
 * así como la configuración de las secciones correspondientes.
 */
export class PasoUnoCsComponent {
  /*
  * Almacena la configuración de las pestañas del primer paso.
  */
   configuracionDosDatos: ConfiguracionColumna<FraccionArancelariaDescripcion>[] =CONFIGURACION_DOS_DATOS
  /*
  * Almacena la configuración de las pestañas del primer paso.
  */
   indice: number = 1;

/**
 * 
 * @param seccionStore 
 */
  constructor(private seccionStore: SeccionLibStore){
    this.asignarSecciones();
  }


  /**
   * Selecciona una pestaña específica.
   * @param i - El índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
  * Método para asignar las secciones existentes al stored
  */
  private asignarSecciones(): void {
    const SECCIONES: boolean[] = [];
    const FORMA_VALIDA: boolean[] = [];
    const PREDETERMINADO = SECCIONES_TRAMITE_230401
    for (const LLAVE_SECCION in PREDETERMINADO.PASO_1) {
      if (Object.prototype.hasOwnProperty.call(PREDETERMINADO.PASO_1, LLAVE_SECCION)) {
        const KEY = LLAVE_SECCION as keyof typeof PREDETERMINADO.PASO_1;
        SECCIONES.push(PREDETERMINADO.PASO_1[KEY]);
        FORMA_VALIDA.push(false);
      }
    }
    this.seccionStore.establecerSeccion(SECCIONES);
    this.seccionStore.establecerFormaValida(FORMA_VALIDA);
  }

  
}
