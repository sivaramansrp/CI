import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { PaisProcendenciaComponent } from './pais-procendencia.component';
import { CrosslistComponent } from '@libs/shared/data-access-user/src/tramites/components/crosslist/crosslist.component';
import { TituloComponent } from '@libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { Tramite130109Store } from '../../estados/tramites/tramites130109.store';
import { Tramite130109Query } from '../../estados/queries/tramite130109.query';

describe('PaisProcendenciaComponent', () => {
  let component: PaisProcendenciaComponent;
  let fixture: ComponentFixture<PaisProcendenciaComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        PaisProcendenciaComponent, // Include the standalone component here
        CrosslistComponent,
        TituloComponent,
        CatalogoSelectComponent
      ],
      providers: [Tramite130109Store, Tramite130109Query]
    }).compileComponents();

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
    expect(component.paisForm.controls['usoEspecifico'].valid).toBeFalsy();
  });

  it('should fetch paisProc on ngOnInit', () => {
    component.ngOnInit();
    const req = httpMock.expectOne('/assets/json/130109/pais-procenia.json');
    expect(req.request.method).toBe('GET');
    req.flush([{ id: 1, descripcion: 'Country 1' }]);
    expect(component.paisProc.length).toBeGreaterThan(0);
  });

  it('should fetchPaisesPorBloque when bloque is selected', () => {
    component.paisForm.controls['bloque'].setValue(1);
    component.fetchPaisProc();
    const req = httpMock.expectOne('/assets/json/130109/paises-por-bloque.json');
    expect(req.request.method).toBe('GET');
    req.flush([{ id: 1, descripcion: 'Country 1' }]);
    expect(component.paisesPorBloque.length).toBeGreaterThan(0);
  });

  it('should call agregar method of crosslistComponent when botonField funcion is called', () => {
    spyOn(component.crosslistComponent, 'agregar');
    component.botonField[0].funcion();
    expect(component.crosslistComponent.agregar).toHaveBeenCalledWith('t');
  });

  it('should call quitar method of crosslistComponent when botonField funcion is called', () => {
    spyOn(component.crosslistComponent, 'quitar');
    component.botonField[3].funcion();
    expect(component.crosslistComponent.quitar).toHaveBeenCalledWith('t');
  });

  it('should update fechasSeleccionadas when fechaSeleccionada changes', () => {
    component.fechaSeleccionada.setValue('2023-10-01');
    component.fechaSeleccionada.valueChanges.subscribe(value => {
      component.fechasSeleccionadas.push(value);
    });
    component.fechaSeleccionada.setValue('2023-10-02');
    expect(component.fechasSeleccionadas).toContain('2023-10-02');
  });

  it('should update selectRangoDias when paisesPorBloque changes', () => {
    component.paisesPorBloque = [{ id: 1, descripcion: 'Country 1' }];
    component.selectRangoDias = component.paisesPorBloque.map(pais => pais.descripcion);
    expect(component.selectRangoDias).toContain('Country 1');
  });

  it('should set valores in store', () => {
    spyOn(component, 'setValoresStore');
    component.setValoresStore(component.paisForm, 'usoEspecifico', 'setUsoEspecifico');
    expect(component.setValoresStore).toHaveBeenCalled();
  });
});