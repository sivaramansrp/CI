
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { Subject, of } from 'rxjs';

import { Catalogo } from '../../../../core/models/shared/catalogos.model';
import { DatosDeLosResiduosComponent } from './datos-de-los-residuos.component';
import { MateriaprimaformserviceService } from '../../../../core/services/231001/materiaprimaformservice.service';


describe('DatosDeLosResiduosComponent', () => {
  let component: DatosDeLosResiduosComponent;
  let fixture: ComponentFixture<DatosDeLosResiduosComponent>;
  let service: MateriaprimaformserviceService;
  let destroyed$: Subject<void>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        DatosDeLosResiduosComponent
      ],
      providers: [MateriaprimaformserviceService]
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDeLosResiduosComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(MateriaprimaformserviceService);
    destroyed$ = new Subject<void>();
    fixture.detectChanges();
  });

  afterEach(() => {
    destroyed$.next();
    destroyed$.complete();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.materiaPrimaForm).toBeDefined();
  });

  it('should load comboUnidadMedida on init', () => {
    const mockData: Catalogo[] = [{ id: 1, descripcion: 'Unidad 1' }];
    spyOn(service, 'getUnidadMedida').and.returnValue(of(mockData));
    component.loadComboUnidadMedida();
    expect(component.comboUnidadMedida).toEqual(mockData);
  });

  it('should load comboCapituloFraccion on init', () => {
    const mockData: Catalogo[] = [{ id: 1, descripcion: 'Capítulo 1' }];
    spyOn(service, 'getCapituloFraccion').and.returnValue(of(mockData));
    component.loadComboCapituloFraccion();
    expect(component.comboCapituloFraccion).toEqual(mockData);
  });

  it('should load comboPartidaFraccion', () => {
    const mockData: Catalogo[] = [{ id: 1, descripcion: 'Partida 1' }];
    spyOn(service, 'getPartidaFraccion').and.returnValue(of(mockData));
    component.loadComboPartidaFraccion();
    expect(component.comboPartidaFraccion).toEqual(mockData);
  });

  it('should load comboSubPartidaFraccion', () => {
    const mockData: Catalogo[] = [{ id: 1, descripcion: 'Subpartida 1' }];
    spyOn(service, 'getSubPartidaFraccion').and.returnValue(of(mockData));
    component.loadComboSubPartidaFraccion();
    expect(component.comboSubPartidaFraccion).toEqual(mockData);
  });

  it('should load comboFraccionArancelariaParametros', () => {
    const mockData: Catalogo[] = [{ id: 1, descripcion: 'Fracción 1' }];
    spyOn(service, 'getFraccionArancelariaParametros').and.returnValue(of(mockData));
    component.loadComboFraccionArancelariaParametros();
    expect(component.comboFraccionArancelariaParametros).toEqual(mockData);
  });

  it('should handle cambiaCapituloFraccion', () => {
    component.cambiaCapituloFraccion();
    expect(component.materiaPrimaForm.get('clavePartida')?.value).toBe('');
    expect(component.comboPartidaFraccion).toEqual([]);
  });

  it('should handle cambiaPartidaFraccion', () => {
    component.materiaPrimaForm.patchValue({ partidaFraccion: 'partida1' });
    component.cambiaPartidaFraccion();
    expect(component.materiaPrimaForm.get('clavePartida')?.value).toBe('partida1');
    expect(component.comboSubPartidaFraccion).toEqual([]);
  });

  it('should handle cambiaSubPartidaFraccion', () => {
    component.materiaPrimaForm.patchValue({ subPartidaFraccion: 'subpartida1' });
    component.cambiaSubPartidaFraccion();
    expect(component.materiaPrimaForm.get('claveSubPartida')?.value).toBe('subpartida1');
    expect(component.comboFraccionArancelariaParametros).toEqual([]);
  });

  it('should handle cambiaFraccion', () => {
    const mockData: Catalogo[] = [{ id: 1, descripcion: 'Fracción 1' }];
    component.comboFraccionArancelariaParametros = mockData;
    component.materiaPrimaForm.patchValue({ fraccion: 1 });
    component.cambiaFraccion();
    expect(component.materiaPrimaForm.get('descFraccion')?.value).toBe('Fracción 1');
  });

  it('should handle cambiaUnidadMedida', () => {
    const mockData: Catalogo[] = [{ id: 1, descripcion: 'Unidad 1' }];
    component.comboUnidadMedida = mockData;
    component.materiaPrimaForm.patchValue({ unidadMedidaComercial: { clave: 1 } });
    component.cambiaUnidadMedida();
    expect(component.materiaPrimaForm.get('descUnidadMedida')?.value).toBe('Unidad 1');
  });

  it('should handle ngOnDestroy', () => {
    spyOn(destroyed$, 'next');
    spyOn(destroyed$, 'complete');
    component.ngOnDestroy();
    expect(destroyed$.next).toHaveBeenCalled();
    expect(destroyed$.complete).toHaveBeenCalled();
  });
});