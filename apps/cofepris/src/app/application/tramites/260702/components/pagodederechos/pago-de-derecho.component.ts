import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Catalogo,InputFecha, TituloComponent } from '@libs/shared/data-access-user/src';
import { RegistrarSolicitudMcpService } from '../../services/registrar-solicitud-mcp.service';

import { ReplaySubject, map, takeUntil } from 'rxjs';
import { Solicitud260702Query } from '../../estados/tramites260702.query';

import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';

import { Solicitud260702State, Solicitud260702Store } from '../../estados/tramites260702.store';
import { InputFechaComponent } from '@libs/shared/data-access-user/src';

import { BANCO_DATA } from '../../constants/catalogs.enum';
/**
 * Componente para gestionar el pago de derechos en el trámite.
 */
@Component({
  selector: 'app-pago-de-derecho',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TituloComponent, CatalogoSelectComponent,InputFechaComponent],
  templateUrl: './pago-de-derecho.component.html',
  styleUrls: ['./pago-de-derecho.component.scss'],
})
export class PagoDeDerechoComponent implements OnInit, OnDestroy {
  /** Formulario reactivo para gestionar los datos del pago de derechos */
  pagoDeDerechosForm!: FormGroup;

  /** Observable para manejar la destrucción del componente */
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  /** Estado del pago de derechos que se está gestionando */
  pagoDeDerechosState!: Solicitud260702State;

/** Datos del catálogo de bancos disponibles */
public bancoData = BANCO_DATA;
  /**
 * Configuración para el campo de selección de la fecha de pago.
 */
  fechaPago: InputFecha = {
    labelNombre: 'Fecha de pago',
    required: false,
    habilitado: true,
  };

  /**
   * Constructor del componente.
   * @param registrarsolicitudmcp Servicio para registrar solicitudes MCP.
   * @param fb FormBuilder para crear formularios reactivos.
   * @param cdr ChangeDetectorRef para detectar cambios.
   * @param solicitud260702Store Almacén de estado para el trámite 260702.
   * @param solicitud260702Query Consulta de estado para el trámite 260702.
   */
  constructor(
    private registrarsolicitudmcp: RegistrarSolicitudMcpService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private solicitud260702Store: Solicitud260702Store,
    private solicitud260702Query: Solicitud260702Query
  ) {}

  /**
   * Método que se ejecuta al inicializar el componente.
   */
  ngOnInit(): void {
    this.solicitud260702Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.pagoDeDerechosState = seccionState;
        })
      )
      .subscribe();

    this.crearFormulario();
    this.getBancoData();
  }

  /**
   * Obtiene los datos del catálogo de bancos.
   */
  getBancoData(): void {
    this.registrarsolicitudmcp
      .getBancoData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.bancoData.catalogos = data as Catalogo[];
      });
  }

  /**
   * Crea el formulario reactivo para gestionar los datos del pago de derechos.
   */
  crearFormulario(): void {
    this.pagoDeDerechosForm = this.fb.group({
      pagoDeDerechos: this.fb.group({
        clavedereferencia: [this.pagoDeDerechosState?.clavedereferencia, Validators.required],
        cadenadeladependencia: [this.pagoDeDerechosState?.cadenadeladependencia, Validators.required],
        banco: [this.pagoDeDerechosState?.banco, Validators.required],
        llavedepago: [this.pagoDeDerechosState?.llavedepago, Validators.required],
        fechadepago: [this.pagoDeDerechosState?.fechadepago, Validators.required],
        importedepago: [this.pagoDeDerechosState?.importedepago, Validators.required],
      }),
    });
  }
  seleccionarFechaInicio(evento: string): void {
    this.solicitud260702Store.setFechadePago(evento);
  }

  /**
   * Limpia los datos del formulario.
   */
  clearForm(): void {
    this.pagoDeDerechosForm.reset();
  }

  /**
   * Getter para obtener el formulario de pago de derechos.
   */
  get pagoDeDerechos(): FormGroup {
    return this.pagoDeDerechosForm.get('pagoDeDerechos') as FormGroup;
  }

  /**
   * Establece valores en el store a partir del formulario.
   * @param form Formulario reactivo.
   * @param campo Nombre del campo en el formulario.
   * @param metodoNombre Método del store para actualizar el valor.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Solicitud260702Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.solicitud260702Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * Método que se ejecuta al destruir el componente.
   */
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
