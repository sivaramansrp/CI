
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosCertificadoComponent } from './datos-certificado.component';

import { FormBuilder } from '@angular/forms';
import { CertificadoTecnicoJaponService } from '../../service/certificadoTecnicoJapon.service';
import { Tramite110218Store } from '../../estados/tramites/tramite110218.store';
import { Tramite110218Query } from '../../estados/queries/tramite110218.query';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { of } from 'rxjs';

describe('DatosCertificadoComponent', () => {
	let component: DatosCertificadoComponent;
	let fixture: ComponentFixture<DatosCertificadoComponent>;
	let mockService: any;
	let mockStore: any;
	let mockQuery: any;
	let mockConsultaioQuery: any;

	beforeEach(async () => {
		mockService = { getDatosCertificado: () => of([]) };
		mockStore = { setTramite110218State: jest.fn() };
		mockQuery = { selectTramite110218State$: of({ lugar: 'CDMX', observaciones: 'Obs' }) };
		mockConsultaioQuery = { selectConsultaioState$: of({ readonly: false }) };

		await TestBed.configureTestingModule({
			imports: [DatosCertificadoComponent, HttpClientTestingModule],
			providers: [
				{ provide: FormBuilder, useValue: new FormBuilder() },
				{ provide: CertificadoTecnicoJaponService, useValue: mockService },
				{ provide: Tramite110218Store, useValue: mockStore },
				{ provide: Tramite110218Query, useValue: mockQuery },
				{ provide: ConsultaioQuery, useValue: mockConsultaioQuery },
			],
		}).compileComponents();

		fixture = TestBed.createComponent(DatosCertificadoComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should initialize the form with store values', () => {
		expect(component.datosDelCertificado.value.lugar).toBe('CDMX');
		expect(component.datosDelCertificado.value.observaciones).toBe('Obs');
	});

	it('should call setTramite110218State when setValorStore is called', () => {
		component.datosDelCertificado.get('lugar')?.setValue('Nuevo Lugar');
		component.setValorStore(component.datosDelCertificado, 'lugar');
		expect(mockStore.setTramite110218State).toHaveBeenCalledWith({ lugar: 'Nuevo Lugar' });
	});

	it('should update filaSeleccionada on manejarFilaSeleccionada', () => {
		const fila = { id: 1 } as any;
		component.manejarFilaSeleccionada(fila);
		expect(component.filaSeleccionada).toEqual(fila);
	});

	it('should disable form if esSoloLectura is true', () => {
		component.esSoloLectura = true;
		component.habilitarDeshabilitarFormulario();
		expect(component.datosDelCertificado.disabled).toBe(true);
	});

	it('should enable form if esSoloLectura is false', () => {
		component.esSoloLectura = false;
		component.habilitarDeshabilitarFormulario();
		expect(component.datosDelCertificado.enabled).toBe(true);
	});

	it('should getValorStore and update estadoSeleccionado', () => {
		component.getValorStore();
		expect(component.estadoSeleccionado.lugar).toBe('CDMX');
	});

		it('should handle datos modificados', () => {
			
			component.filaSeleccionada = { id: 1 } as any;
			component.onDatosModificados({ id: 2 } as any);
			expect(component.filaSeleccionada.id).toBe(2);
		});

	it('should clean up subscriptions on destroy', () => {
		const spy = jest.spyOn(component['destroyed$'], 'next');
		component.ngOnDestroy();
		expect(spy).toHaveBeenCalled();
	});
});
