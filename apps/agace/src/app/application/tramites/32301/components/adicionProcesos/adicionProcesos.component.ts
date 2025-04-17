import { AlertComponent, TituloComponent } from "@ng-mf/data-access-user";
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Modal } from 'bootstrap';
import { ProveedorExtranjero } from '../../models/avisomodify.model';
import { Tramite32301Query } from '../../estados/tramite32301.query';
import { Tramite32301Store } from '../../estados/tramite32301.store';
@Component({
  selector: 'app-adicion-procesos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TituloComponent, AlertComponent],
  templateUrl: './adicionProcesos.component.html',
})
export class AdicionProcesosComponent implements OnInit, OnDestroy {
  /** Sujeto para destruir observables y evitar fugas de memoria */
  private destroy$: Subject<void> = new Subject<void>();

  /** Instancia del modal para archivo extranjero */
  CargaExtranjeroModelInstance!: Modal;

  /** Título de la sección de proveedores existentes */
  seccionProveedoresExistentes: string = 'Registros cargodos:';

  /** Título del grupo de proveedores */
  ProveedoresTitulo!: string;

  /** Modelo que contiene los datos del proveedor extranjero */
  proveedorExtranjero!: ProveedorExtranjero;

  /** Formulario reactivo para el proveedor extranjero */
  proveedorXtranjForm!: FormGroup;

  /**
   * Constructor que inyecta dependencias necesarias como FormBuilder, Store y Query.
   */
  constructor(
    private fb: FormBuilder,
    private store: Tramite32301Store,
    private Tramite32301Query: Tramite32301Query
  ) {
    // Constructor
  }

  /**
   * Ciclo de vida OnInit. Inicializa título, proveedor extranjero, y suscripciones al estado.
   */
  ngOnInit(): void {
    this.ProveedoresTitulo = 'Proceso(s) productivo(s)*';
    this.inicializaProveedorExtranjer();

    this.Tramite32301Query.select()
      .pipe(takeUntil(this.destroy$))
      .subscribe(state => {
        this.proveedorExtranjero = state as unknown as ProveedorExtranjero;
        this.crearFormProveedorExtranjer();
      });
  }

  /**
   * Inicializa los valores del proveedor extranjero en el store.
   */
  inicializaProveedorExtranjer(): void {
    this.store.setRegistrosProveedoresExtranjeros({
      archivoExtranjero: [],
      registrosProveedoresExtranjeros: '0'
    });
  }

  /**
   * Crea el formulario para capturar datos del proveedor extranjero.
   */
  crearFormProveedorExtranjer(): void {
    this.proveedorXtranjForm = this.fb.group({
      archivoExtranjero: [this.proveedorExtranjero?.archivoExtranjero, Validators.required],
      registrosProveedoresExtranjeros: [{ value: this.proveedorExtranjero?.registrosProveedoresExtranjeros, disabled: true }]
    });
  }

  /**
   * Maneja la selección de archivos por parte del usuario.
   * @param event Evento generado al seleccionar un archivo
   */
  onFileSelected(event: Event): void {
    const INPUT = event.target as HTMLInputElement;
    const FILE = INPUT?.files?.[0];

    if (FILE) {
      this.proveedorXtranjForm.patchValue({ archivoExtranjero: FILE });
      this.proveedorXtranjForm.get('archivoExtranjero')?.updateValueAndValidity();
    } else {
      this.openCargaExtranjeroModel();
    }
  }

  /**
   * Abre el modal de advertencia para carga de archivo extranjero.
   */
  openCargaExtranjeroModel(): void {
    if (this.CargaExtranjeroModelInstance) {
      this.CargaExtranjeroModelInstance.show();
    }
  }

  /**
   * Cierra el modal de advertencia para carga de archivo extranjero.
   */
  closeCargaExtranjeroModel(): void {
    if (this.CargaExtranjeroModelInstance) {
      this.CargaExtranjeroModelInstance.hide();
    }
  }

  /**
   * Ciclo de vida OnDestroy. Finaliza suscripciones activas para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

