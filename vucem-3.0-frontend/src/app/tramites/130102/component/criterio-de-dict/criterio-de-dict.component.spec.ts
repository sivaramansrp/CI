import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CriterioDeDictComponent } from './criterio-de-dict.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CatalogoSelectComponent } from '../../../../shared/components/catalogo-select/catalogo-select.component';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';
import { CommonModule } from '@angular/common';

fdescribe('CriterioDeDictComponent', () => {
  let component: CriterioDeDictComponent;
  let fixture: ComponentFixture<CriterioDeDictComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        CatalogoSelectComponent,
        TituloComponent,
        CommonModule,
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
    expect(component.frmCriterioDictamen).toBeDefined();
    expect(
      component.frmCriterioDictamen.controls['solicitudMercancia']
    ).toBeDefined();
  });

  it('should handle fetchSolicitudMercancia correctly', () => {
    const mockCatalogo = { id: 1, descripcion: 'Test descripcion' };
    component.fetchSolicitudMercancia(mockCatalogo);
    expect(component.seleccionadaSolicitudMercancia).toEqual(mockCatalogo);
  });

  it('should update textarea value when fetchSolicitudMercancia is called', () => {
    const mockCatalogo = { id: 1, descripcion: 'Test descripcion' };
    component.fetchSolicitudMercancia(mockCatalogo);
    fixture.detectChanges();
    const textarea = fixture.nativeElement.querySelector('textarea');
    expect(textarea.value).toBe(mockCatalogo.descripcion);
  });

  it('should set solicitudMercancia on init', () => {
    component.ngOnInit();
    expect(component.solicitudMercanciaLista.length).toBeGreaterThan(0);
  });
});
