import { TestBed } from '@angular/core/testing';
import { ValidarInicialmenteCertificadoService } from './validar-inicialmente-certificado.service';
import { HttpClient } from '@angular/common/http';
import { Tramite110222Store } from '../estados/tramite110222.store';
import { HttpCoreService } from '@ng-mf/data-access-user';
import { Tramite110222Query } from '../estados/tramite110222.query';
import { of, throwError } from 'rxjs';

describe('ValidarInicialmenteCertificadoService', () => {
	let service: ValidarInicialmenteCertificadoService;
	let http: any;
	let store: any;
	let httpService: any;
	let query: any;

	beforeEach(() => {
		http = { get: jest.fn() };
		store = { update: jest.fn() };
		httpService = { get: jest.fn(), post: jest.fn() };
		query = { selectTramite$: of('tramite') };
		TestBed.configureTestingModule({
			providers: [
				ValidarInicialmenteCertificadoService,
				{ provide: HttpClient, useValue: http },
				{ provide: Tramite110222Store, useValue: store },
				{ provide: HttpCoreService, useValue: httpService },
				{ provide: Tramite110222Query, useValue: query }
			]
		});
		service = TestBed.inject(ValidarInicialmenteCertificadoService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('getRegistroTomaMuestrasMercanciasData should call http.get', () => {
		http.get.mockReturnValue(of({ foo: 'bar' }));
		service.getRegistroTomaMuestrasMercanciasData().subscribe(res => {
			expect(res).toEqual({ foo: 'bar' });
		});
		expect(http.get).toHaveBeenCalledWith('assets/json/110222/datos-prefill.json');
	});

	it('actualizarEstadoFormulario should call store.update', () => {
		service.actualizarEstadoFormulario({ foo: 'bar' } as any);
		expect(store.update).toHaveBeenCalled();
	});

	it('getTipoFactura should call httpService.get', () => {
		httpService.get.mockReturnValue(of({ ok: true }));
		service.getTipoFactura().subscribe(res => {
			expect(res).toEqual({ ok: true });
		});
		expect(httpService.get).toHaveBeenCalled();
	});

	it('guardarDatosPost should call httpService.post', () => {
		httpService.post.mockReturnValue(of({ ok: true }));
		service.guardarDatosPost({ foo: 'bar' }).subscribe(res => {
			expect(res).toEqual({ ok: true });
		});
		expect(httpService.post).toHaveBeenCalled();
	});

	it('getAllState should return query.selectTramite$', () => {
		service.getAllState().subscribe(res => {
			expect(res).toBe('tramite');
		});
	});

	it('buscarMercanciasCert should call httpService.post', () => {
		httpService.post.mockReturnValue(of({ ok: true }));
		service.buscarMercanciasCert({ foo: 'bar' }).subscribe(res => {
			expect(res).toEqual({ ok: true });
		});
		expect(httpService.post).toHaveBeenCalled();
	});

	it('buildMercanciaSeleccionadas should map array', () => {
	const arr = [{ id: 1, fraccionArancelaria: 'a', nombreTecnico: 'b' }];
	const result = service.buildMercanciaSeleccionadas(arr);
	const merc = result[0] as { id: number; fraccion_arancelaria: string; nombre_tecnico: string };
	expect(merc.id).toBe(1);
	expect(merc.fraccion_arancelaria).toBe('a');
	expect(merc.nombre_tecnico).toBe('b');
	});

	it('agregarProductores should call httpService.post', () => {
		httpService.post.mockReturnValue(of({ ok: true }));
		service.agregarProductores({ rfc_solicitante: 'x' }).subscribe(res => {
			expect(res).toEqual({ ok: true });
		});
		expect(httpService.post).toHaveBeenCalled();
	});

	it('obtenerProductorPorExportador should call http.get', () => {
		http.get.mockReturnValue(of({ ok: true }));
		service.obtenerProductorPorExportador('rfc').subscribe(res => {
			expect(res).toEqual({ ok: true });
		});
		expect(http.get).toHaveBeenCalled();
	});

	it('buildCertificado should build object', () => {
		const item: any = { formCertificado: {}, mercanciaTabla: [] };
		const result = service.buildCertificado(item);
		expect(result).toHaveProperty('tratado_acuerdo');
		expect(result).toHaveProperty('mercancias_seleccionadas');
	});

	it('buildDatosCertificado should build object', () => {
		const data: any = { formDatosCertificado: {} };
		const result = service.buildDatosCertificado(data);
		expect(result).toHaveProperty('observaciones');
		expect(result).toHaveProperty('idioma');
		expect(result).toHaveProperty('representacion_federal');
	});

	it('obtenerCadenaOriginal should call http.post and map', () => {
		http.post = jest.fn(() => of({ ok: true }));
		service = new ValidarInicialmenteCertificadoService(http, store, httpService, query);
		service.obtenerCadenaOriginal('id', { foo: 'bar' } as any).subscribe(res => {
			expect(res).toEqual({ ok: true });
		});
		expect(http.post).toHaveBeenCalled();
	});

	it('obtenerCadenaOriginal should handle error', () => {
		http.post = jest.fn(() => throwError(() => new Error('fail')));
		service = new ValidarInicialmenteCertificadoService(http, store, httpService, query);
		service.obtenerCadenaOriginal('id', { foo: 'bar' } as any).subscribe({
			error: (err) => {
				expect(err).toBeInstanceOf(Error);
			}
		});
	});
});
