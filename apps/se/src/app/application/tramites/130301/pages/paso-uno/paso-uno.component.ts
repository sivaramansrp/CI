import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { CertificadoKimberleyComponent } from '../../components/certificado-kimberley/certificado-kimberley.component';
import { DatosDelTramiteComponent } from '../../components/datos-del-tramite/datos-del-tramite.component';
import { ProrrogasComponent } from '../../components/prorrogas/prorrogas.component';
import { Solocitud130301Service } from '../../services/service130301.service';

import { SolicitanteComponent, TIPO_PERSONA } from '@libs/shared/data-access-user/src';
import { Subject, map, takeUntil } from 'rxjs';

/**
 * Componente para gestionar el paso uno del trámite.
 * Este componente permite al usuario seleccionar una pestaña y gestionar información del solicitante.
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
})
export class PasoUnoComponent implements AfterViewInit,OnInit,OnDestroy {
  constructor(
    private consultaQuery: ConsultaioQuery,
    private solocitud130301Service: Solocitud130301Service,
  ) {}
  
  /**
   * Índice para manejar la pestaña seleccionada.
   * Este valor determina cuál pestaña está activa en la interfaz de usuario.
   * 
   * @type {number}
   */
  public indice: number = 1;

  /**
 * Indica si ya se cargaron los datos de respuesta para mostrar en el formulario.
 */
  public esDatosRespuesta: boolean = false;

  /**
   * Observable para gestionar la destrucción del componente y evitar fugas de memoria.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Estado actual de la consulta obtenido desde el store.
   */
  public consultaState!: ConsultaioState;

  /**
   * Hook de inicialización del componente. Verifica el estado de actualización del store
   * y carga datos en caso necesario.
   */
  ngOnInit(): void {
    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.consultaState = seccionState;
          if (this.consultaState.update) {
            this.guardarDatosFormulario();
          } else {
            this.esDatosRespuesta = true;
          }
        })
      )
      .subscribe();

  }

  /**
   * Decorador `ViewChild` para acceder a la instancia del componente `SolicitanteComponent`.
   * Este componente se utiliza para gestionar información relacionada con el solicitante.
   */
  @ViewChild('Solicitante') solicitante!: SolicitanteComponent;
  @ViewChild('datosDelTramite') datosDelTramiteComponent!: DatosDelTramiteComponent;
  @ViewChild('certificadoKimberley') certificadoKimberleyComponent!: CertificadoKimberleyComponent;
  @ViewChild('prorrogas') prorrogasComponent!: ProrrogasComponent;

  /**
   * Método del ciclo de vida de Angular que se ejecuta después de que la vista ha sido inicializada.
   * En este método se llama al componente `SolicitanteComponent` para establecer el tipo de persona.
   */
  ngAfterViewInit(): void {
    // Llama al método para obtener el tipo de persona (en este caso, una persona moral nacional)
   if( this.solicitante)
   {
    this.solicitante.obtenerTipoPersona(TIPO_PERSONA.MORAL_NACIONAL);
   }
    
  }

  /**
   * Permite que el usuario seleccione una pestaña cambiando el valor de `indice`.
   * 
   * @param {number} indice El índice de la pestaña seleccionada.
   */
  seleccionaTab(indice: number): void {
    // Establece el índice de la pestaña seleccionada
    this.indice = indice;
  }

  /**
   * Carga los datos del formulario desde un archivo JSON externo y los actualiza en el store.
   * También establece la bandera de datos cargados en verdadero.
   */
  guardarDatosFormulario(): void {
    this.solocitud130301Service
      .getRegistroTomaMuestrasMercanciasData()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((resp) => {
        if (resp) {
          this.esDatosRespuesta = true;
          this.solocitud130301Service.actualizarEstadoFormulario(resp);
        }
      });
  }

    /**
   * Hook de destrucción del componente. Limpia las suscripciones activas para evitar fugas de memoria.
   */
    ngOnDestroy(): void {
      this.destroyNotifier$.next();
      this.destroyNotifier$.complete();
    }
    /**
   * Valida todos los formularios del paso uno del trámite 130301.
   * Verifica la validez de todos los componentes hijos: Solicitante, Datos de la solicitud, 
   * Certificado Kimberley y Prorrogas.
   * Si algún formulario es inválido, marca todos los campos como tocados para mostrar los mensajes de error.
   * Incluye validación especial para campos deshabilitados en Prorrogas usando getRawValue().
   * 
   * @returns {boolean} verdadero si todos los formularios son válidos, falso si alguno es inválido o no existe la referencia al componente.
   */
  public validarTodosFormulariosPasoUno(): boolean {
    let esValido = true;

    // Validar Solicitante (siempre debe estar presente)
    if (this.solicitante?.form) {
      if (this.solicitante.form.invalid) {
        this.solicitante.form.markAllAsTouched();
        esValido = false;
      }
    } else {
      esValido = false;
    }

    // Solo validar otros componentes si los datos están cargados
    if (this.esDatosRespuesta) {
      // Validar Datos de la solicitud
      if (this.datosDelTramiteComponent?.datosDelTramite) {
        if (this.datosDelTramiteComponent.datosDelTramite.invalid) {
          this.datosDelTramiteComponent.markAllAsTouched();
          esValido = false;
        }
      } else {
        esValido = false;
      }

      // Validar Certificado Kimberley
      if (this.certificadoKimberleyComponent?.certificadoKimberley) {
        if (this.certificadoKimberleyComponent.certificadoKimberley.invalid) {
          this.certificadoKimberleyComponent.markAllAsTouched();
          esValido = false;
        }
      } else {
        esValido = false;
      }

      // Validar Prorrogas (incluir campos deshabilitados en validación)
      if (this.prorrogasComponent?.prorrogasForm) {
        // Validar campos requeridos específicos, incluso si están deshabilitados
        const VALORES_COMPLETOS = this.prorrogasComponent.prorrogasForm.getRawValue();
        const MOTIVO_JUSTIFICACION_VALIDO = VALORES_COMPLETOS.motivoJustificacion && VALORES_COMPLETOS.motivoJustificacion.trim() !== '';
        const OTRAS_DECLARACIONES_VALIDO = VALORES_COMPLETOS.otrasDeclaraciones && VALORES_COMPLETOS.otrasDeclaraciones.trim() !== '';
        
        if (this.prorrogasComponent.prorrogasForm.invalid || !MOTIVO_JUSTIFICACION_VALIDO || !OTRAS_DECLARACIONES_VALIDO) {
          this.prorrogasComponent.markAllAsTouched();
          
          // Forzar marcado de campos deshabilitados como tocados para mostrar errores
          if (!MOTIVO_JUSTIFICACION_VALIDO) {
            this.prorrogasComponent.prorrogasForm.get('motivoJustificacion')?.markAsTouched();
          }
          if (!OTRAS_DECLARACIONES_VALIDO) {
            this.prorrogasComponent.prorrogasForm.get('otrasDeclaraciones')?.markAsTouched();
          }
          
          esValido = false;
        }
      } else {
        esValido = false;
      }
    }

    return esValido;
  }
}