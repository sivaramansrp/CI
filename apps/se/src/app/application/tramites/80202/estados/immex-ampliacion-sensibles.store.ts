/* eslint-disable sort-imports */
/**
 * @fileoverview Archivo de gestión de estado para el trámite IMMEX 80203 - Registro de Solicitud de Modalidad.
 * Este archivo contiene la definición del estado, la configuración inicial y la clase store para manejar
 * el estado del formulario de registro IMMEX utilizando la librería Akita.
 * 
 * @module Tramite80203Store
 * @description
 * Este módulo administra el estado de `ImmexRegistroState` utilizando Akita para el trámite 80203.
 * Proporciona funcionalidades para inicializar, actualizar y gestionar el estado del formulario
 * de registro IMMEX (Industria Manufacturera, Maquiladora y de Servicios de Exportación).
 * 
 * @author Sistema VUCEM 3.0
 * @version 1.0.0
 * @since 2025-07-01
 * @requires @datorama/akita
 * @requires @angular/core
 */
import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { ImmexRegistroform } from '../models/immex-ampliacion-sensibles.model';

/**
 * @interface ImmexRegistroState
 * @description
 * Interfaz que define la estructura del estado global para el registro IMMEX.
 * Contiene todas las propiedades necesarias para manejar el estado del formulario
 * de cambio de modalidad en el sistema VUCEM 3.0.
 *
 * @property {immexRegistroform} immexRegistro - Objeto que contiene todos los datos del formulario de registro IMMEX,
 * incluyendo información sobre productos, fracciones arancelarias, capacidades de producción,
 * datos de importación y exportación, códigos NICO y demás información requerida para el trámite.
 * 
 * @example
 * ```typescript
 * const estado: ImmexRegistroState = {
 *   immexRegistro: {
 *     permisoImmexDatos: 12345,
 *     fraccionArancelariaExportacion: '6205.20.01',
 *     productoDescExportacion: 'Camisas de vestir para caballero',
 *     // ... más propiedades
 *   }
 * };
 * ```
 * 
 * @see {@link immexRegistroform} Para la definición completa de la estructura del formulario
 */
export interface ImmexRegistroState {
    /**
     * @description Datos completos del formulario de registro IMMEX.
     * Contiene toda la información necesaria para el trámite de cambio de modalidad,
     * incluyendo datos del permiso, fracciones arancelarias, productos de importación
     * y exportación, capacidades de producción y códigos de nomenclatura.
     * 
     * @type {immexRegistroform}
     * @memberof ImmexRegistroState
     */
    immexRegistro: ImmexRegistroform;
}

/**
 * @function createInitialState
 * @description
 * Función de fábrica que inicializa el estado predeterminado para el registro IMMEX.
 * Establece valores por defecto para todas las propiedades del formulario de cambio de modalidad,
 * asegurando que el estado inicial sea consistente y válido para el sistema.
 * 
 * Esta función es esencial para garantizar que el store tenga un estado inicial
 * bien definido antes de que el usuario comience a interactuar con el formulario.
 *
 * @returns {ImmexRegistroState} Objeto de estado inicial con todos los campos del formulario
 * configurados con valores predeterminados seguros.
 * 
 * @example
 * ```typescript
 * const estadoInicial = createInitialState();
 * console.log(estadoInicial.immexRegistro.permisoImmexDatos); // 0
 * console.log(estadoInicial.immexRegistro.fraccionArancelariaExportacion); // ''
 * ```
 * 
 * @since 1.0.0
 * @author Sistema VUCEM 3.0
 */
export function createInitialState(): ImmexRegistroState {
   return {
    /**
     * @description Estado inicial del formulario IMMEX con todos los campos
     * configurados a valores predeterminados. Los números se inicializan en 0
     * y las cadenas en ''.
     */
    immexRegistro: {
        Nicos:'',
        productoDescExportacions:'',
      // Datos generales
      permisoImmexDatos: 0,
      numero: 0,

      // Exportación
      fraccionArancelariaExportacion: '',
      productoDescExportacion: '',
      productoArancelariaExportacion: 0,
      exportacionDescExportacion: '',
      FraccionDescExportacion: '',
      fraccionArancelariaDesc: '',
      Nico: '',

      // Importación
      productoImportacion: '',
      commodityFraccionImportacion: 0,
      commodityImportacion: 0,
      commodityDescImportacion: '',
      commodityNicoDescImportacion: '',
      nicoDescImportacion: '',
      nicoDatos: '',

      // Capacidades / cantidades
      commodityCandiadAnual: 0,
      commodityCapacidadInstalda: '',
      commodityCandidadPor: '',
      candidadPorPeriodo: '',
      capacidadPeriodo: '',
      candiadAnual: '',
      cantidadAnual: 0,
      capacidadInstalada: 0,
      cantidadPorPeriodo: 0,

      // Fracciones
      fraccionDatos: 0,
      fraccionArancelaria: '',
      umt: '',
      descripcionTigie: '',
      descripcion: '',
    },
}
}

/**
 * @class ImmexRegistroStore
 * @extends {Store<ImmexRegistroState>}
 * @description
 * Clase principal para la gestión del estado del registro IMMEX utilizando el patrón Store de Akita.
 * Esta clase proporciona una capa de abstracción para manejar el estado del formulario de cambio
 * de modalidad del trámite 80203, ofreciendo métodos para actualizar y consultar el estado
 * de manera reactiva y predecible.
 * 
 * El store actúa como la única fuente de verdad para todos los datos relacionados con el
 * formulario de registro IMMEX, garantizando la consistencia de datos en toda la aplicación.
 * 
 * @implements {Injectable}
 * @implements {StoreConfig}
 * 
 * @example
 * ```typescript
 * // Inyección del store en un componente
 * constructor(private immexStore: ImmexRegistroStore) {}
 * 
 * // Actualización del estado
 * const nuevosdatos: immexRegistroform = {
 *   permisoImmexDatos: 12345,
 *   fraccionArancelariaExportacion: '6205.20.01',
 *   // ... más datos
 * };
 * this.immexStore.setImmexRegistro(nuevosdatos);
 * ```
 * 
 * @since 1.0.0
 * @author Sistema VUCEM 3.0
 * @see {@link Store} Clase base de Akita
 * @see {@link ImmexRegistroState} Interfaz del estado
 * @see {@link immexRegistroform} Modelo del formulario
 */
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'cambio-modalidad' })
export class ImmexAmpliacionSensiblesStore extends Store<ImmexRegistroState> {
    /**
     * @constructor
     * @description
     * Constructor de la clase ImmexRegistroStore que inicializa el store con el estado predeterminado.
     * Llama al constructor padre de la clase Store pasando el estado inicial creado por la función
     * createInitialState(), estableciendo así los valores por defecto para todo el formulario.
     * 
     * El constructor se ejecuta automáticamente cuando Angular inyecta el servicio y garantiza
     * que el store esté listo para ser utilizado inmediatamente después de su instanciación.
     * 
     * @memberof ImmexRegistroStore
     * @since 1.0.0
     * 
     * @example
     * ```typescript
     * // Angular se encarga de la instanciación automática
     * // No es necesario llamar al constructor manualmente
     * constructor(private store: ImmexRegistroStore) {
     *   // El store ya está inicializado y listo para usar
     * }
     * ```
     */
    constructor() {
        super(createInitialState());
    }

    /**
     * @method setImmexRegistro
     * @description
     * Método público para actualizar completamente el estado del formulario de registro IMMEX.
     * Este método reemplaza todo el objeto `immexRegistro` en el estado con los nuevos valores
     * proporcionados, manteniendo la inmutabilidad del estado mediante el operador spread.
     * 
     * La actualización es reactiva, lo que significa que todos los componentes suscritos al estado
     * serán notificados automáticamente de los cambios y podrán actualizar sus vistas en consecuencia.
     * 
     * @param {immexRegistroform} immexRegistro - Objeto completo con todos los datos del formulario
     * de cambio de modalidad. Debe incluir todas las propiedades requeridas por la interfaz
     * immexRegistroform para mantener la consistencia del estado.
     * 
     * @returns {void} Este método no retorna ningún valor, pero actualiza el estado interno del store.
     * 
     * @memberof ImmexRegistroStore
     * @public
     * @since 1.0.0
     * 
     * @example
     * ```typescript
     * // Ejemplo de uso completo
     * const datosFormulario: immexRegistroform = {
     *   permisoImmexDatos: 12345,
     *   fraccionArancelariaExportacion: '6205.20.01',
     *   productoDescExportacion: 'Camisas de vestir para caballero',
     *   productoArancelariaExportacion: 620520,
     *   Nico: '520100',
     *   fraccionDatos: 1001,
     *   commodityCandiadAnual: 50000,
     *   commodityCapacidadInstalda: 'Planta textil con capacidad de 1000 toneladas mensuales',
     *   commodityCandidadPor: '4166.67 kg/mes',
     *   commodityFraccionImportacion: 520100,
     *   commodityImportacion: 2001,
     *   commodityDescImportacion: 'Algodón en rama sin procesar',
     *   nicoDescImportacion: 'Algodón sin cardar ni peinar',
     *   exportacionDescExportacion: 'Prendas de vestir confeccionadas',
     *   FraccionDescExportacion: 'Camisas de algodón para hombre',
     *   fraccionArancelariaDesc: 'Camisas de fibras sintéticas o artificiales',
     *   candidadPorPeriodo: '1000',
     *   capacidadPeriodo: 'Mensual',
     *   candiadAnual: '12000',
     *   commodityNicoDescImportacion: 'Algodón sin cardar ni peinar',
     *   nicoDatos: '520100'
     * };
     * 
     * // Actualizar el estado
     * this.immexRegistroStore.setImmexRegistro(datosFormulario);
     * 
     * // Los componentes suscritos serán notificados automáticamente
     * ```
     * 
     * @throws {Error} Puede lanzar errores si el objeto proporcionado no cumple con la estructura
     * requerida por la interfaz immexRegistroform.
     * 
     * @see {@link immexRegistroform} Para la estructura completa del objeto requerido
     * @see {@link ImmexRegistroState} Para el contexto del estado completo
     */
    public setImmexRegistro(immexRegistro: ImmexRegistroform): void {
        this.update((state) => ({
            ...state,
            immexRegistro,
        }));
    }
}