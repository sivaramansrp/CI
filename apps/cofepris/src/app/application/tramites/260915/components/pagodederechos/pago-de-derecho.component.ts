
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { map, ReplaySubject, takeUntil } from 'rxjs';

import { Solicitud260915State, Solicitud260915Store } from '../../estados/tramites260915.store';
import { CommonModule } from '@angular/common';

import { BANCO_DATA } from '../../constants/catalogs.enum';
import { Solicitud260915Query } from '../../estados/tramites260915.query';
import { PermisoSanitarioDispositivosMedicosService } from '../../services/permiso-sanitario-dispositivos-medicos.service';

import { Catalogo, InputFecha, TituloComponent } from '@libs/shared/data-access-user/src';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { InputFechaComponent } from '@libs/shared/data-access-user/src';
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
  pagoDeDerechosState!: Solicitud260915State;

/** Datos del catálogo de bancos. */
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
   * @param solicitud260915Store Almacén de estado para el trámite 260915.
   * @param solicitud260915Query Consulta de estado para el trámite 260915.
   */
  constructor(
    private permisosanitariodisposivos: PermisoSanitarioDispositivosMedicosService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private solicitud260915Store: Solicitud260915Store,
    private solicitud260915Query: Solicitud260915Query
  ) {}

  /**
   * Método que se ejecuta al inicializar el componente.
   */
  ngOnInit(): void {
    this.solicitud260915Query.selectSolicitud$
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
    this.permisosanitariodisposivos
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
 /**
 * Método para seleccionar la fecha de inicio.
 * Actualiza la fecha de pago en el store con el evento recibido.
 * @param evento Fecha seleccionada en formato de cadena.
 */
seleccionarFechaInicio(evento: string): void {
  this.solicitud260915Store.setFechadePago(evento);
}

  /**
   * Limpia los datos del formulario.
   */
  clearForm(): void {
    const bancoValue = this.pagoDeDerechos.get('banco')?.value; // Preserve the banco value
    this.pagoDeDerechosForm.reset(); // Reset the form
    this.pagoDeDerechos.get('banco')?.setValue(bancoValue); // Restore the banco value
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
    metodoNombre: keyof Solicitud260915Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.solicitud260915Store[metodoNombre] as (value: any) => void)(VALOR);
  }

  /**
   * Método que se ejecuta al destruir el componente.
   */
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
