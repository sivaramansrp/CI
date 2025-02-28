import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { SeleccionDelCupoComponent } from './seleccion-del-cupo.component';
import { DescripcionDelCupoService } from 'libs/shared/data-access-user/src/core/services/120402/descripcion-del-cupo/descripcionDelCupo.service';
 
describe('SeleccionDelCupoComponent', () => {
  let component: SeleccionDelCupoComponent;
  let fixture: ComponentFixture<SeleccionDelCupoComponent>;
  let service: DescripcionDelCupoService;
 
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SeleccionDelCupoComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [DescripcionDelCupoService]
    }).compileComponents();
  });
 
  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionDelCupoComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(DescripcionDelCupoService);
 
    spyOn(service, 'getSeleccionDelCupo').and.returnValue(of({
      regimen: [],
      tratado: [],
      producto: [],
      subproducto: []
    }));
 
    fixture.detectChanges();
  });
 
  it('should create', () => {
    expect(component).toBeTruthy();
  });
 
  it('should initialize the form', () => {
    expect(component.seleccionForm).toBeDefined();
    expect(component.seleccionForm.controls['regimen']).toBeDefined();
    expect(component.seleccionForm.controls['tratado']).toBeDefined();
    expect(component.seleccionForm.controls['producto']).toBeDefined();
    expect(component.seleccionForm.controls['subproducto']).toBeDefined();
  });
 
  it('should load seleccion del cupo data on init', () => {
    expect(service.getSeleccionDelCupo).toHaveBeenCalled();
    expect(component.seleccionDelCupo).toEqual({
      regimen: [],
      tratado: [],
      producto: [],
      subproducto: []
    });
  });
 
  it('should call regimenOnChange when regimen changes', () => {
    spyOn(component, 'regimenOnChange');
    const select = fixture.nativeElement.querySelector('select[formControlName="regimen"]');
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(component.regimenOnChange).toHaveBeenCalled();
  });
 
  it('should call tratadoOnChange when tratado changes', () => {
    spyOn(component, 'tratadoOnChange');
    const select = fixture.nativeElement.querySelector('select[formControlName="tratado"]');
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(component.tratadoOnChange).toHaveBeenCalled();
  });
 
  it('should call productoOnChange when producto changes', () => {
    spyOn(component, 'productoOnChange');
    const select = fixture.nativeElement.querySelector('select[formControlName="producto"]');
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(component.productoOnChange).toHaveBeenCalled();
  });
 
  it('should call subproductoOnChange when subproducto changes', () => {
    spyOn(component, 'subproductoOnChange');
    const select = fixture.nativeElement.querySelector('select[formControlName="subproducto"]');
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(component.subproductoOnChange).toHaveBeenCalled();
  });
});
 