import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CriterioDeDictComponent } from './criterio-de-dict.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectCatalogosComponent } from '../../../../shared/components/select-catalogos/select-catalogos.component';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';

describe('CriterioDeDictComponent', () => {
  let component: CriterioDeDictComponent;
  let fixture: ComponentFixture<CriterioDeDictComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        SelectCatalogosComponent,
        TituloComponent,
        CriterioDeDictComponent,
      ],
      declarations: [],
    }).compileComponents();

    fixture = TestBed.createComponent(CriterioDeDictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.frmCriterioDict).toBeDefined();
    expect(
      component.frmCriterioDict.controls['solicitudMercancia']
    ).toBeDefined();
  });

  it('should handle solicitudMercanciaSeleccion correctly', () => {
    const mockCatalogo = { id: 1, descripcion: 'Test descripcion' };
    component.solicitudMercanciaSeleccion(mockCatalogo);
    expect(component.selectedSolicitudMercancia).toEqual(mockCatalogo);
  });

  it('should update textarea value when solicitudMercanciaSeleccion is called', () => {
    const mockCatalogo = { id: 1, descripcion: 'Test descripcion' };
    component.solicitudMercanciaSeleccion(mockCatalogo);
    fixture.detectChanges();
    const textarea = fixture.nativeElement.querySelector('textarea');
    expect(textarea.value).toBe(mockCatalogo.descripcion);
  });

  it('should set solicitudMercancia on init', () => {
    component.ngOnInit();
    expect(component.solicitudMercancia.catalogos.length).toBe(3);
    expect(component.solicitudMercancia.catalogos[0].descripcion).toBe(
      'La SE autorizará la importación de mercancías de la Regla 8a, cuando se'
    );
  });
});
