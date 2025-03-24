import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { PaisProcendenciaComponent } from './pais-procendencia.component';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { CrosslistComponent } from '@libs/shared/data-access-user/src/tramites/components/crosslist/crosslist.component';
import { TituloComponent } from '@libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';
import { of } from 'rxjs';

describe('PaisProcendenciaComponent', () => {
  let component: PaisProcendenciaComponent;
  let fixture: ComponentFixture<PaisProcendenciaComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaisProcendenciaComponent, CatalogoSelectComponent, CrosslistComponent, TituloComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaisProcendenciaComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.paisForm).toBeDefined();
    expect(component.paisForm.controls['bloque']).toBeDefined();
    expect(component.paisForm.controls['descripcioneSpecffico']).toBeDefined();
    expect(component.paisForm.controls['descripcionJustificacion']).toBeDefined();
    expect(component.paisForm.controls['observaciones']).toBeDefined();
  });

  it('should fetch paisProc on fetchPaisProc call', () => {
    const mockData = [{ id: 1, descripcion: 'Test' }];
    component.fetchPaisProc();
    const req = httpMock.expectOne('/assets/json/130109/pais-procenia.json');
    expect(req.request.method).toBe('GET');
    expect(component.paisProc).toEqual(mockData);
  });

  it('should fetch paisesPorBloque on fetchPaisesPorBloque call', () => {
    const mockData = [{ id: 1, descripcion: 'Test' }];
    component.fetchPaisesPorBloque(1);
    const req = httpMock.expectOne('/assets/json/130109/paises-por-bloque.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
    expect(component.paisesPorBloque).toEqual(mockData);
    expect(component.selectRangoDias).toEqual(['Test']);
  });

  it('should validate descripcioneSpecffico as required', () => {
    const control = component.paisForm.controls['descripcioneSpecffico'];
    control.setValue('');
    expect(control.valid).toBeFalsy();
    expect(control.errors?.['required']).toBeTruthy();
  });

  it('should validate descripcionJustificacion as required', () => {
    const control = component.paisForm.controls['descripcionJustificacion'];
    control.setValue('');
    expect(control.valid).toBeFalsy();
    expect(control.errors?.['required']).toBeTruthy();
  });

  it('should call agregar method of crosslistComponent on Agregar todos button click', () => {
    spyOn(component.crosslistComponent, 'agregar');
    component.campoDeBotones[0].funcion();
    expect(component.crosslistComponent.agregar).toHaveBeenCalledWith('t');
  });

  it('should call quitar method of crosslistComponent on Restar todos button click', () => {
    spyOn(component.crosslistComponent, 'quitar');
    component.campoDeBotones[3].funcion();
    expect(component.crosslistComponent.quitar).toHaveBeenCalledWith('t');
  });

  it('should call fetchPaisesPorBloque when bloque value changes', () => {
    spyOn(component, 'fetchPaisesPorBloque');
    component.paisForm.controls['bloque'].setValue(1);
    expect(component.fetchPaisesPorBloque).toHaveBeenCalledWith(1);
  });

  it('should update fechasDatos when fechaSeleccionada changes', () => {
    component.fechaSeleccionada.setValue('2025-03-17');
    expect(component.fechasDatos).toContain('2025-03-17');
  });

  it('should reset form on resetForm call', () => {
    component.paisForm.controls['bloque'].setValue(1);
    // component.resetForm();
    expect(component.paisForm.controls['bloque'].value).toBeNull();
    expect(component.paisForm.controls['descripcioneSpecffico'].value).toBe('');
    expect(component.paisForm.controls['descripcionJustificacion'].value).toBe('');
    expect(component.paisForm.controls['observaciones'].value).toBe('');
  });
});