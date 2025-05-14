import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { DomicilloDelComponent } from './domicillo-del.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DomicilloDelComponent', () => {
  let component: DomicilloDelComponent;
  let fixture: ComponentFixture<DomicilloDelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DomicilloDelComponent, ReactiveFormsModule,HttpClientTestingModule],
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

  it('should call agregar("t") on the first CrosslistComponent when "Agregar todos" is clicked', () => {
    const mockCrosslist = component.crossList.toArray()[0];
    component.paisDeProcedenciaBotons[0].funcion();
    expect(mockCrosslist.agregar).toHaveBeenCalledWith('t');
  });

  it('should call agregar("") on the first CrosslistComponent when "Agregar selección" is clicked', () => {
    const mockCrosslist = component.crossList.toArray()[0];
    component.paisDeProcedenciaBotons[1].funcion();
    expect(mockCrosslist.agregar).toHaveBeenCalledWith('');
  });

  it('should call quitar("") on the first CrosslistComponent when "Restar selección" is clicked', () => {
    const mockCrosslist = component.crossList.toArray()[0];
    component.paisDeProcedenciaBotons[2].funcion();
    expect(mockCrosslist.quitar).toHaveBeenCalledWith('');
  });

  it('should call quitar("t") on the first CrosslistComponent when "Restar todos" is clicked', () => {
    const mockCrosslist = component.crossList.toArray()[0];
    component.paisDeProcedenciaBotons[3].funcion();
    expect(mockCrosslist.quitar).toHaveBeenCalledWith('t');
  });

  it('should call agregar("t") on the second CrosslistComponent when "Agregar todos" is clicked', () => {
    const mockCrosslist = component.crossList.toArray()[1];
    component.paisDeProcedenciaBotonsDos[0].funcion();
    expect(mockCrosslist.agregar).toHaveBeenCalledWith('t');
  });
  
  it('should call agregar("") on the second CrosslistComponent when "Agregar selección" is clicked', () => {
    const mockCrosslist = component.crossList.toArray()[1];
    component.paisDeProcedenciaBotonsDos[1].funcion();
    expect(mockCrosslist.agregar).toHaveBeenCalledWith('');
  });
  
  it('should call quitar("") on the second CrosslistComponent when "Restar selección" is clicked', () => {
    const mockCrosslist = component.crossList.toArray()[1];
    component.paisDeProcedenciaBotonsDos[2].funcion();
    expect(mockCrosslist.quitar).toHaveBeenCalledWith('');
  });
  
  it('should call quitar("t") on the second CrosslistComponent when "Restar todos" is clicked', () => {
    const mockCrosslist = component.crossList.toArray()[1];
    component.paisDeProcedenciaBotonsDos[3].funcion();
    expect(mockCrosslist.quitar).toHaveBeenCalledWith('t');
  });

  it('should call agregar("t") on the third CrosslistComponent when "Agregar todos" is clicked', () => {
    const mockCrosslist = component.crossList.toArray()[2];
    component.paisDeProcedenciaBotonsTres[0].funcion();
    expect(mockCrosslist.agregar).toHaveBeenCalledWith('t');
  });
  
  it('should call agregar("") on the third CrosslistComponent when "Agregar selección" is clicked', () => {
    const mockCrosslist = component.crossList.toArray()[2];
    component.paisDeProcedenciaBotonsTres[1].funcion();
    expect(mockCrosslist.agregar).toHaveBeenCalledWith('');
  });
  
  it('should call quitar("") on the third CrosslistComponent when "Restar selección" is clicked', () => {
    const mockCrosslist = component.crossList.toArray()[2];
    component.paisDeProcedenciaBotonsTres[2].funcion();
    expect(mockCrosslist.quitar).toHaveBeenCalledWith('');
  });
  
  it('should call quitar("t") on the third CrosslistComponent when "Restar todos" is clicked', () => {
    const mockCrosslist = component.crossList.toArray()[2];
    component.paisDeProcedenciaBotonsTres[3].funcion();
    expect(mockCrosslist.quitar).toHaveBeenCalledWith('t');
  });
});
