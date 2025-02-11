import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms'
import { BtnContinuarComponent } from '../../../../shared/components/btn-continuar/btn-continuar.component';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';
;
import { InformacionDeLaComponent } from './informacion-de-la.component';





describe('InformacionDeLaComponent', () => {
  let component: InformacionDeLaComponent;
  let fixture: ComponentFixture<InformacionDeLaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,InformacionDeLaComponent, TituloComponent, BtnContinuarComponent],
      declarations: [],
      providers: [FormBuilder],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacionDeLaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with required controls', () => {
    expect(component.informacionDeLaform).toBeTruthy();
    expect(component.informacionDeLaform.controls['fraccionArancelaria']).toBeTruthy();
    expect(component.informacionDeLaform.controls['nico']).toBeTruthy();
    expect(component.informacionDeLaform.controls['nombreQuimico']).toBeTruthy();
  });

  it('should disable descripcionFraccion initially', () => {
    const descripcionFraccionControl = component.informacionDeLaform.get('descripcionFraccion');
    expect(descripcionFraccionControl?.disabled).toBeTruthy();
  });

  it('should enable descripcionFraccion when fraccionArancelaria is selected', () => {
    component.informacionDeLaform.controls.fraccionArancelaria.setValue('001');
    fixture.detectChanges();
    const descripcionFraccionControl = component.informacionDeLaform.get('descripcionFraccion');
    expect(descripcionFraccionControl?.enabled).toBeTruthy();
  });

  it('should disable descripcionFraccion when fraccionArancelaria is deselected', () => {
    component.informacionDeLaform.controls['fraccionArancelaria'].setValue('');
    fixture.detectChanges();
    const descripcionFraccionControl = component.informacionDeLaform.get('descripcionFraccion');
    expect(descripcionFraccionControl?.disabled).toBeTruthy();
  });

  it('should disable descripcionNico initially', () => {
    const descripcionNicoControl = component.informacionDeLaform.get('descripcionNico');
    expect(descripcionNicoControl?.disabled).toBeTruthy();
  });

  it('should enable descripcionNico when nico is selected', () => {
    component.informacionDeLaform.controls['nico'].setValue('nico1');
    fixture.detectChanges();
    const descripcionNicoControl = component.informacionDeLaform.get('descripcionNico');
    expect(descripcionNicoControl?.enabled).toBeTruthy();
  });

  it('should disable descripcionNico when nico is deselected', () => {
    component.informacionDeLaform.controls['nico'].setValue('');
    fixture.detectChanges();
    const descripcionNicoControl = component.informacionDeLaform.get('descripcionNico');
    expect(descripcionNicoControl?.disabled).toBeTruthy();
  });

  it('should call onSubmit when form is valid', () => {
    spyOn(component, 'onSubmit');
    component.informacionDeLaform.controls['fraccionArancelaria'].setValue('001');
    component.informacionDeLaform.controls['nico'].setValue('nico1');
    component.informacionDeLaform.controls['nombreQuimico'].setValue('Chemical X');
    component.informacionDeLaform.controls['nombreComercial'].setValue('Comm X');
    component.informacionDeLaform.controls['numeroCAS'].setValue('12345');
    component.informacionDeLaform.controls['estadoFisico'].setValue('solid');
    component.informacionDeLaform.controls['acondicionamiento'].setValue('new');
    
    component.onSubmit();
    expect(component.onSubmit).toHaveBeenCalled();
  });


  
  
  it('should clean up on destroy', () => {
    spyOn(component.destroyed$, 'next');
    component.ngOnDestroy();
    expect(component.destroyed$.next).toHaveBeenCalledWith(true);
  });
});
