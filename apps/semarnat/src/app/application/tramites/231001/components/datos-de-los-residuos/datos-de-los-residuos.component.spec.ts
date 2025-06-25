import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { Catalogo, MateriaprimaformserviceService } from '@ng-mf/data-access-user';
import { DatosDeLosResiduosComponent } from './datos-de-los-residuos.component';

describe('DatosDeLosResiduosComponent', () => {
  let component: DatosDeLosResiduosComponent;
  let fixture: ComponentFixture<DatosDeLosResiduosComponent>;
  let service: MateriaprimaformserviceService;

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
    fixture.detectChanges();
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
  jest.spyOn(service, 'getUnidadMedida').mockReturnValue(of(mockData));
  // Re-create the component so ngOnInit runs with the mock in place
  fixture = TestBed.createComponent(DatosDeLosResiduosComponent);
  component = fixture.componentInstance;
  fixture.detectChanges();
  expect(component.comboUnidadMedida).toEqual(mockData);
});

 it('should load comboCapituloFraccion on init', () => {
  const mockData: Catalogo[] = [{ id: 1, descripcion: 'Capítulo 1' }];
  jest.spyOn(service, 'getCapituloFraccion').mockReturnValue(of(mockData));
  // Re-create the component so ngOnInit runs with the mock in place
  fixture = TestBed.createComponent(DatosDeLosResiduosComponent);
  component = fixture.componentInstance;
  fixture.detectChanges();
  expect(component.comboCapituloFraccion).toEqual(mockData);
});

  it('should load comboPartidaFraccion', () => {
    const mockData: Catalogo[] = [{ id: 1, descripcion: 'Partida 1' }];
    jest.spyOn(service, 'getPartidaFraccion').mockReturnValue(of(mockData));
    component.loadComboPartidaFraccion();
      fixture = TestBed.createComponent(DatosDeLosResiduosComponent);
     component = fixture.componentInstance;
     fixture.detectChanges();
    expect(component.comboPartidaFraccion).toEqual(mockData);
  });

  it('should load comboSubPartidaFraccion', () => {
    const mockData: Catalogo[] = [{ id: 1, descripcion: 'Subpartida 1' }];
    jest.spyOn(service, 'getSubPartidaFraccion').mockReturnValue(of(mockData));
    component.loadComboSubPartidaFraccion();
      fixture = TestBed.createComponent(DatosDeLosResiduosComponent);
  component = fixture.componentInstance;
  fixture.detectChanges();
    expect(component.comboSubPartidaFraccion).toEqual(mockData);
  });

  it('should load comboFraccionArancelariaParametros', () => {
    const mockData: Catalogo[] = [{ id: 1, descripcion: 'Fracción 1' }];
    jest.spyOn(service, 'getFraccionArancelariaParametros').mockReturnValue(of(mockData));
    component.loadComboFraccionArancelariaParametros();
      fixture = TestBed.createComponent(DatosDeLosResiduosComponent);
  component = fixture.componentInstance;
  fixture.detectChanges();
    expect(component.comboFraccionArancelariaParametros).toEqual(mockData);
  });

it('should handle cambiaCapituloFraccion', () => {
  component.materiaPrimaForm.patchValue({ clavePartida: 'test' });
  component.comboPartidaFraccion = [{ id: 1, descripcion: 'test' }];
  component.cambiaCapituloFraccion();
  fixture = TestBed.createComponent(DatosDeLosResiduosComponent);
  component = fixture.componentInstance;
  fixture.detectChanges();
  expect(component.materiaPrimaForm.get('clavePartida')?.value).toBe('');
 
});

it('should handle cambiaPartidaFraccion', () => {
  component.materiaPrimaForm.patchValue({ partidaFraccion: 'partida1' });
  component.comboSubPartidaFraccion = [{ id: 1, descripcion: 'test' }];
  component.cambiaPartidaFraccion();
  fixture = TestBed.createComponent(DatosDeLosResiduosComponent);
  component = fixture.componentInstance;
  fixture.detectChanges();
  expect(component.materiaPrimaForm.get('clavePartida')?.value).toBe('');

});

it('should handle cambiaSubPartidaFraccion', () => {
  component.materiaPrimaForm.patchValue({ subPartidaFraccion: 'subpartida1' });
  component.comboFraccionArancelariaParametros = [{ id: 1, descripcion: 'test' }];
  component.cambiaSubPartidaFraccion();
  fixture = TestBed.createComponent(DatosDeLosResiduosComponent);
  component = fixture.componentInstance;
  fixture.detectChanges();
  expect(component.materiaPrimaForm.get('claveSubPartida')?.value).toBe('');
  
});



it('should handle cambiaUnidadMedida', () => {
  const mockData: Catalogo[] = [{ id: 1, descripcion: 'Unidad 1' }];
  component.comboUnidadMedida = mockData;
  component.materiaPrimaForm.patchValue({ unidadMedidaComercial: { clave: 1 } });
  component.cambiaUnidadMedida();
  fixture = TestBed.createComponent(DatosDeLosResiduosComponent);
  component = fixture.componentInstance;
  fixture.detectChanges();
  expect(component.materiaPrimaForm.get('descUnidadMedida')?.value).toBe('');
});

  it('should handle ngOnDestroy', () => {
    const nextSpy = jest.spyOn((component as any).destroyed$, 'next');
    const completeSpy = jest.spyOn((component as any).destroyed$, 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});