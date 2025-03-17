import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { PaisProcendenciaComponent } from './pais-procendencia.component';
import { CrosslistComponent } from 'libs/shared/data-access-user/src/tramites/components/crosslist/crosslist.component';
import { TituloComponent } from 'libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';
import { CatalogoSelectComponent } from 'libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';

describe('PaisProcendenciaComponent', () => {
  let component: PaisProcendenciaComponent;
  let fixture: ComponentFixture<PaisProcendenciaComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        TituloComponent,
        CrosslistComponent,
        CatalogoSelectComponent,
        PaisProcendenciaComponent,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaisProcendenciaComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with default values', () => {
    expect(component.paisForm).toBeDefined();
    expect(component.paisForm.get('bloque')?.value).toBe('');
    expect(component.paisForm.get('descripcioneSpecffico')?.value).toBe('');
    expect(component.paisForm.get('descripcionJustificacion')?.value).toBe('');
    expect(component.paisForm.get('observaciones')?.value).toBe('');
  });

  it('should fetch paisProc on initialization', () => {
    spyOn(component, 'fetchPaisProc').and.callThrough();
    component.ngOnInit();
    expect(component.fetchPaisProc).toHaveBeenCalled();
  });

  it('should fetch paisesPorBloque when bloque is selected', () => {
    spyOn(component, 'fetchPaisesPorBloque').and.callThrough();
    component.paisForm.get('bloque')?.setValue(1);
    component.fetchPaisProc();
    expect(component.fetchPaisesPorBloque).toHaveBeenCalledWith(1);
  });

  it('should update selectRangoDias when fetchPaisesPorBloque is called', () => {
    const mockData = [{ descripcion: 'Pais1' }, { descripcion: 'Pais2' }];
    component.fetchPaisesPorBloque(1);
    const req = httpTestingController.expectOne('/assets/json/130109/paises-por-bloque.json');
    req.flush(mockData);
    expect(component.selectRangoDias).toEqual(['Pais1', 'Pais2']);
  });

  it('should call agregar method of CrosslistComponent when botonField funcion is executed', () => {
    spyOn(component.crosslistComponent, 'agregar');
    component.botonField[0].funcion();
    expect(component.crosslistComponent.agregar).toHaveBeenCalledWith('t');
  });

  it('should call quitar method of CrosslistComponent when botonField funcion is executed', () => {
    spyOn(component.crosslistComponent, 'quitar');
    component.botonField[3].funcion();
    expect(component.crosslistComponent.quitar).toHaveBeenCalledWith('t');
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});