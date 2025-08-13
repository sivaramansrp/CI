import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { RegistroTrasportistaComponent } from './registro-trasportista.component';
import { Tramite303StoreService } from '../../../../core/estados/tramites/tramite303.store';
import { Tramite303Query } from '../../../../core/queries/tramite303.query';
import { TransportistaService } from '../../../../core/services/303/trasportista.service';
import { Transportista } from '@libs/shared/data-access-user/src/core/models/303/secciones.model';

describe('RegistroTrasportistaComponent', () => {
	let component: RegistroTrasportistaComponent;
	let fixture: ComponentFixture<RegistroTrasportistaComponent>;
	let mockTramite303State: Partial<Tramite303StoreService>;
	let mockTramite303Query: Partial<Tramite303Query>;
	let mockRouter: Partial<Router>;
	let mockTransportistaService: Partial<TransportistaService>;

	const mockTransportista: Transportista = {
		idPersonaTransportista: '1',
		tipoPersona: 'fisica',
		nacionalidad: 'nacional',
		esExtranjero: false,
		esNacional: true,
		rfc: 'RFC123',
		rfcExtranjero: '',
		nombre: 'Juan Pérez',
		transportista: 'Transporte S.A.',
		taxId: 'TAX123',
		denominacionRazonSocial: 'Transporte S.A.',
		apellidoPaterno: 'Pérez',
		apellidoMaterno: 'García'
	};

	const mockTramiteConsultado = {
		indice: 1,
		cumplimiento: '',
		autorizar: '',
		listado: '',
		certificados: '',
		art17: '',
		buzon: '',
		cuentaImmex: '',
		tipoFigura: '',
		listaFiguras: [],
		listaTransportistas: [mockTransportista]
	};

	beforeEach(async () => {
		mockTramite303State = {
			setListaTransportistas: jest.fn()
		};
		mockTramite303Query = {
			selectSolicitud$: of(mockTramiteConsultado)
		};
		mockRouter = {
			navigate: jest.fn()
		};
		mockTransportistaService = {
			buscarFisicaPorRFC: jest.fn().mockReturnValue(of(mockTransportista)),
			buscarMoralPorRFC: jest.fn().mockReturnValue(of(mockTransportista))
		};

		await TestBed.configureTestingModule({
			imports: [ReactiveFormsModule, RegistroTrasportistaComponent],
			providers: [
				FormBuilder,
				{ provide: Tramite303StoreService, useValue: mockTramite303State },
				{ provide: Tramite303Query, useValue: mockTramite303Query },
				{ provide: Router, useValue: mockRouter },
				{ provide: TransportistaService, useValue: mockTransportistaService }
			],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
		}).compileComponents();

		fixture = TestBed.createComponent(RegistroTrasportistaComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('debería crear el componente correctamente', () => {
		expect(component).toBeTruthy();
	});

	it('debería inicializar el formulario correctamente', () => {
		expect(component.FormTrasportista).toBeDefined();
		expect(component.FormTrasportista.get('nacionalidad')?.value).toBe('nacional');
		expect(component.FormTrasportista.get('tipoPersona')?.value).toBe('fisica');
	});

	it('debería cargar la lista de transportistas desde el estado del trámite', () => {
		component.ngOnInit();
		expect(component.listaTransportistas).toEqual([mockTransportista]);
		expect(component.tramiteConsultado).toEqual(mockTramiteConsultado);
	});

	it('debería limpiar el formulario correctamente', () => {
		component.FormTrasportista.patchValue({ rfc: 'RFC', nombre: 'Nombre', apellidoPaterno: 'A', apellidoMaterno: 'B', taxID: 'TAX', razonSocial: 'RS' });
		component.limpiarFormulario();
		expect(component.FormTrasportista.get('rfc')?.value).toBeNull();
		expect(component.FormTrasportista.get('nombre')?.value).toBeNull();
	});

	it('debería mostrar notificación si no se captura RFC al buscar transportista nacional', () => {
		component.FormTrasportista.patchValue({ nacionalidad: 'nacional', tipoPersona: 'fisica', rfc: '' });
		component.buscarTrasportista();
		expect(component.nuevaNotificacion).toBeDefined();
		expect(component.nuevaNotificacion.mensaje).toContain('Debe capturar el RFC');
	});

	it('debería mostrar notificación si el transportista ya existe al agregar', () => {
		component.listaTransportistas = [mockTransportista];
		component.FormTrasportista.patchValue({ nacionalidad: 'nacional', tipoPersona: 'fisica', rfc: 'RFC123', nombre: 'Juan', apellidoPaterno: 'Pérez' });
		component.agregar();
		expect(component.nuevaNotificacion).toBeDefined();
		expect(component.nuevaNotificacion.mensaje).toContain('Ya existe un transportista');
	});

	it('debería mostrar notificación si el formulario es inválido al agregar', () => {
		component.FormTrasportista.patchValue({ nacionalidad: 'nacional', tipoPersona: 'fisica', rfc: '' });
		component.agregar();
		expect(component.nuevaNotificacion).toBeDefined();
		expect(component.nuevaNotificacion.mensaje).toContain('llenar el formulario');
	});

	it('debería agregar un transportista correctamente y navegar', () => {
		component.listaTransportistas = [];
		component.FormTrasportista.patchValue({ nacionalidad: 'nacional', tipoPersona: 'fisica', rfc: 'RFC999', nombre: 'Nuevo', apellidoPaterno: 'Test' });
		component.agregar();
		expect(component.nuevaNotificacion).toBeDefined();
		expect(component.nuevaNotificacion.mensaje).toContain('agregado correctamente');
		expect(mockTramite303State.setListaTransportistas).toHaveBeenCalled();
		expect(mockRouter.navigate).toHaveBeenCalledWith(['aga/despacho-mercancias/registro']);
	});

	it('debería completar el subject destroyNotifier en ngOnDestroy', () => {
		const spyNext = jest.spyOn(component['destroyNotifier$'], 'next');
		const spyComplete = jest.spyOn(component['destroyNotifier$'], 'complete');
		component.ngOnDestroy();
		expect(spyNext).toHaveBeenCalled();
		expect(spyComplete).toHaveBeenCalled();
	});
});
