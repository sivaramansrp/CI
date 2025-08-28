import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ElementRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { of, Subject } from 'rxjs';
import { VehiculosComponent } from './vehiculos.component';
import { Tramite40103Store, Tramite40103State } from '../../estados/tramite40103.store';
import { Tramite40103Query } from '../../estados/tramite40103.query';
import { modificarTerrestreService } from '../services/modificacar-terrestre.service';
import { ValidacionesFormularioService } from '@ng-mf/data-access-user';
import { Modal } from 'bootstrap';

jest.mock('bootstrap', () => ({
	Modal: jest.fn().mockImplementation(() => ({
		show: jest.fn(),
		hide: jest.fn()
	}))
}));

const DATOS_UNIDAD_TABLA = {
	estado: 'Activo',
	colorVehiculo: 'Rojo',
	vinVehiculo: 'VIN123456789',
	marca: 'Toyota',
	modelo: 'Corolla',
	ano: '2022',
	paisEmisor: 'México',
	numeroPlaca: 'ABC123',
	tipoDeVehiculo: 'Camioneta',
	numeroEconomico: 'NE123',
	capacidad: '1000kg',
	tipoArrastre: 'Remolque',
	colorUnidad: 'Rojo',
};

describe('VehiculosComponent', () => {
	let component: VehiculosComponent;
	let fixture: ComponentFixture<VehiculosComponent>;
		let mockStore: any;
		let mockQuery: any;
		let mockConsultaioQuery: any;
		let mockModificarService: any;
		let mockValidacionesService: any;
		let mockModal: any;

		beforeEach(async () => {
			mockModal = { show: jest.fn(), hide: jest.fn() };
			(Modal as any).mockReturnValue(mockModal);

			mockStore = { update: jest.fn(), setDatosVehiculo: jest.fn(), setDatosUnidad: jest.fn() };
			mockQuery = { selectSolicitud$: of({}) };
			mockConsultaioQuery = { selectConsultaioState$: of({ readonly: false }) };
			const observableMock = { pipe: jest.fn().mockReturnValue({ subscribe: jest.fn() }) };
			mockModificarService = { 
				obtenerPedimentoTabla: jest.fn().mockReturnValue(observableMock), 
				obtenerTipoDeVehiculo: jest.fn().mockReturnValue(observableMock),
				obtenerTipoArrastre: jest.fn().mockReturnValue(observableMock),
				obtenerAno: jest.fn().mockReturnValue(observableMock),
				obtenerPaisEmisor: jest.fn().mockReturnValue(observableMock),
				obtenerColorVehiculo: jest.fn().mockReturnValue(observableMock),
				someObservable: observableMock
			};
			mockValidacionesService = { isValid: jest.fn().mockReturnValue(true) };

			await TestBed.configureTestingModule({
				declarations: [],
				imports: [ReactiveFormsModule],
				providers: [
					FormBuilder,
					{ provide: Tramite40103Store, useValue: mockStore },
					{ provide: Tramite40103Query, useValue: mockQuery },
					{ provide: modificarTerrestreService, useValue: mockModificarService },
					{ provide: ValidacionesFormularioService, useValue: mockValidacionesService },
					{ provide: 'ConsultaioQuery', useValue: mockConsultaioQuery }
				],
				schemas: [NO_ERRORS_SCHEMA]
			}).compileComponents();

			fixture = TestBed.createComponent(VehiculosComponent);
			component = fixture.componentInstance;
			component.colorVehiculoCatalogo = [
				{ id: 1, descripcion: 'Rojo', clave: 'R' },
				{ id: 2, descripcion: 'Azul', clave: 'A' }
			];
				(component as any).vehiculoModalInstance = {
					show: jest.fn(),
					hide: jest.fn(),
					dispose: jest.fn(),
					toggle: jest.fn(),
					handleUpdate: jest.fn()
				};
			if (component.vehiculoModalInstance) {
				component.vehiculoModalInstance.dispose = jest.fn();
			}
				(component as any).unidadModalInstance = {
					show: jest.fn(),
					hide: jest.fn(),
					dispose: jest.fn(),
					toggle: jest.fn(),
					handleUpdate: jest.fn()
				};
			if (component.unidadModalInstance) {
				component.unidadModalInstance.dispose = jest.fn();
			}
			component.vehiculoModal = { nativeElement: document.createElement('div') } as ElementRef;
			component.unidadModal = { nativeElement: document.createElement('div') } as ElementRef;
			component.closeModal = { nativeElement: { click: jest.fn() } } as ElementRef;
			component.closeUnidadModal = { nativeElement: { click: jest.fn() } } as ElementRef;
			component.tramiteState = {} as Tramite40103State;
		});

	afterEach(() => {
		jest.clearAllMocks();
		if ((component as any).vehiculoModalInstance) {
			(component as any).vehiculoModalInstance.dispose = jest.fn();
		}
		if ((component as any).unidadModalInstance) {
			(component as any).unidadModalInstance.dispose = jest.fn();
		}
	});

	it('should create the component', () => {
		expect(component).toBeTruthy();
	});

	it('should initialize forms', () => {
		component.ngOnInit();
		expect(component.vehiculoFormulario).toBeDefined();
		expect(component.unidadFormulario).toBeDefined();
	});

	it('should open vehiculo modal', () => {
		component.abrirModalPedimento();
		expect(mockModal.show).toHaveBeenCalled();
	});

	it('should open unidad modal', () => {
		component.abrirModalPedimentoUnidad();
		expect(mockModal.show).toHaveBeenCalled();
	});

	it('should clean vehiculo form', () => {
		component.vehiculoFormulario = component.fb.group({ numero: ['test'] });
		component.limpiarDatosVehiculo();
		expect(component.vehiculoFormulario.pristine).toBeTruthy();
	});

	it('should clean unidad form', () => {
		component.unidadFormulario = component.fb.group({ vinVehiculo: ['test'] });
		component.limpiarDatosUnidad();
		expect(component.unidadFormulario.pristine).toBeTruthy();
	});

	it('should call isValid', () => {
		const form = component.fb.group({ numero: ['test'] });
		expect(component.isValid(form, 'numero')).toBe(true);
	});

	it('should set selected tab', () => {
		const tab = component.seleccionarPestana('parquevehicular');
		expect(component.selectedTab).toBe('Parque vehicular');
		expect(component.activeTab).toBe('parquevehicular');
		expect(tab).toBe('parquevehicular');
	});

	it('should handle eliminarPedimento', () => {
		component.vehiculosTablaConfig = {
			encabezadas: [],
			datos: [{
				numero: 'test',
				tipoDeVehiculo: 'Camioneta',
				idDeVehiculo: 'ID123',
				numeroPlaca: 'ABC123',
				paisEmisor: 'México',
				estado: 'CDMX',
				marca: 'Toyota'
			}]
		} as any;
		component.editIndex = 1;
		component.vehiculoFormulario = component.fb.group({ numero: ['test'] });
		component.eliminarPedimento();
		expect(component.vehiculosTablaConfig.datos).toEqual([]);
		expect(component.editIndex).toBeNull();
	});

	it('should handle eliminarUnidadPedimento', () => {
		component.unidadesTablaConfig = { encabezadas: [], datos: [{ vinVehiculo: 'test' }] } as any;
		component.editUnidadIndex = 1;
		component.unidadFormulario = component.fb.group({ vinVehiculo: ['test'] });
		component.eliminarUnidadPedimento();
		expect(component.unidadesTablaConfig.datos).toEqual([]);
		expect(component.editUnidadIndex).toBeNull();
	});
});
