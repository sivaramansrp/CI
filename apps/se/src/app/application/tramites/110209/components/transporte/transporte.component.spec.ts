import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
import { TransporteComponent } from './transporte.component';
import { TituloComponent } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { TransporteService } from '../../services/transporte.service';

describe('TransporteComponent', () => {
  let component: TransporteComponent;
  let fixture: ComponentFixture<TransporteComponent>;
  let service: TransporteService;

  beforeEach(async () => {
    const serviceMock = {
      getMedioDeTransporte: jest.fn().mockReturnValue(of([
        { id: '1', nombre: 'Aéreo' },
        { id: '2', nombre: 'Marítimo' }
      ]))
    };

    await TestBed.configureTestingModule({
      declarations: [TransporteComponent],
      imports: [CommonModule, ReactiveFormsModule, TituloComponent, CatalogoSelectComponent],
      providers: [
        { provide: TransporteService, useValue: serviceMock }
      ]
    }).compileComponents();

    service = TestBed.inject(TransporteService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.transporteForm).toBeDefined();
    expect(component.transporteForm.get('medioDeTransporte')?.value).toBe('');
    expect(component.transporteForm.get('rutaCompleta')?.value).toBe('');
    expect(component.transporteForm.get('puertoDeEmbarque')?.value).toBe('');
    expect(component.transporteForm.get('puertoDeDesembarque')?.value).toBe('');
  });

  it('should fetch and set medio de transporte options on init', () => {
    component.ngOnInit();
    expect(service.getMedioDeTransporte).toHaveBeenCalled();
    expect(component.medioDeTransporteOptions.length).toBe(2);
    expect(component.medioDeTransporteOptions).toEqual([
      { id: '1', nombre: 'Aéreo' },
      { id: '2', nombre: 'Marítimo' }
    ]);
  });

  it('should complete destroyed$ subject on destroy', () => {
    const nextSpy = jest.spyOn(component['destroyed$'], 'next');
    const completeSpy = jest.spyOn(component['destroyed$'], 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});