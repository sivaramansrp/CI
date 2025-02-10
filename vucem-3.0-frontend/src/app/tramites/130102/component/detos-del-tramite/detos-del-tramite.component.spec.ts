import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DetosDelTramiteComponent } from './detos-del-tramite.component';


describe('DetosDelTramiteComponent', () => {
  let component: DetosDelTramiteComponent;
  let fixture: ComponentFixture<DetosDelTramiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetosDelTramiteComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DetosDelTramiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize selectedValue with default value', () => {
    expect(component.selectedValue).toBe('Inicial');
  });

  it('should update selectedValue when onValueChange is called', () => {
    component.onValueChange('Updated Value');
    expect(component.selectedValue).toBe('Updated Value');
  });

  it('should fetch solicitud options', () => {
    spyOn(component['http'], 'get').and.callThrough();
    component.fetchSolicitudeOptions();
    expect(component['http'].get).toHaveBeenCalledWith('/assets/json/130102/solicitude-options.json');
  });

  it('should fetch tipos de documentos', () => {
    spyOn(component['http'], 'get').and.callThrough();
    component.fetchTiposDocumentos();
    expect(component['http'].get).toHaveBeenCalledWith('/assets/json/130102/solicitude-select.json');
  });
});
