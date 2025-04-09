import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { DomicilloDelComponent } from './domicillo-del.component';

describe('DomicilloDelComponent', () => {
  let component: DomicilloDelComponent;
  let fixture: ComponentFixture<DomicilloDelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DomicilloDelComponent, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DomicilloDelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize forms on ngOnInit', () => {
    component.solicitudState = {
      codigoPostal: '12345',
      estado: 'Test State',
      muncipio: 'Test Municipio',
      localidad: 'Test Localidad',
      colonia: 'Test Colonia',
      calle: 'Test Calle',
      lada: '123',
      telefono: '4567890',
      avisoCheckbox: true,
      licenciaSanitaria: 'Test Licencia',
      marcarEnCasoDeQueSea: false,
      regimen: 'Test Regimen',
      aduanasEntradas: ['Aduana 1'],
      numeroPermiso: '123456',
      claveScianModal: 'Test Clave',
      claveDescripcionModal: 'Test Descripcion',
    } as any;

    component.ngOnInit();

    expect(component.domicilio.value).toEqual({
      codigoPostal: '12345',
      estado: 'Test State',
      muncipio: 'Test Municipio',
      localidad: 'Test Localidad',
      colonia: 'Test Colonia',
      calle: 'Test Calle',
      lada: '123',
      telefono: '4567890',
      avisoCheckbox: true,
      licenciaSanitaria: 'Test Licencia',
      marcarEnCasoDeQueSea: false,
      regimen: 'Test Regimen',
      aduanasEntradas: ['Aduana 1'],
      numeroPermiso: '123456',
    });

    expect(component.formAgente.value).toEqual({
      claveScianModal: 'Test Clave',
      claveDescripcionModal: 'Test Descripcion',
    });
  });

  it('should toggle colapsable state', () => {
    expect(component.colapsable).toBe(false);
    component.mostrar_colapsable();
    expect(component.colapsable).toBe(true);
    component.mostrar_colapsable();
    expect(component.colapsable).toBe(false);
  });

  it('should call obtenerEstadoList on ngOnInit', () => {
    const obtenerEstadoListSpy = jest.spyOn(component, 'obtenerEstadoList');
    component.ngOnInit();
    expect(obtenerEstadoListSpy).toHaveBeenCalled();
  });

  it('should call obtenerTablaDatos on ngOnInit', () => {
    const obtenerTablaDatosSpy = jest.spyOn(component, 'obtenerTablaDatos');
    component.ngOnInit();
    expect(obtenerTablaDatosSpy).toHaveBeenCalled();
  });

  it('should call obtenerMercanciasDatos on ngOnInit', () => {
    const obtenerMercanciasDatosSpy = jest.spyOn(component, 'obtenerMercanciasDatos');
    component.ngOnInit();
    expect(obtenerMercanciasDatosSpy).toHaveBeenCalled();
  });

  it('should call obtenerListaClavesDeLosLotes on ngOnInit', () => {
    const obtenerListaClavesDeLosLotesSpy = jest.spyOn(component, 'obtenerListaClavesDeLosLotes');
    component.ngOnInit();
    expect(obtenerListaClavesDeLosLotesSpy).toHaveBeenCalled();
  });

  it('should emit destroyed$ on ngOnDestroy', () => {
    const destroyedSpy = jest.spyOn(component['destroyed$'], 'next');
    const completeSpy = jest.spyOn(component['destroyed$'], 'complete');
    component.ngOnDestroy();
    expect(destroyedSpy).toHaveBeenCalledWith();
    expect(completeSpy).toHaveBeenCalled();
  });
});
