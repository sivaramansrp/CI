import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransporteComponent } from './transporte.component';
import { FormBuilder } from '@angular/forms';
import { Tramite110218Store } from '../../estados/tramites/tramite110218.store';
import { Tramite110218Query } from '../../estados/queries/tramite110218.query';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

describe('TransporteComponent', () => {
  let component: TransporteComponent;
  let fixture: ComponentFixture<TransporteComponent>;
  let storeMock: Partial<Tramite110218Store>;
  let queryMock: Partial<Tramite110218Query>;

  beforeEach(async () => {
    storeMock = {
      setpuertodeEmbarque: jest.fn(),
      setpuertodeDesembarque: jest.fn(),
      setnombredelaEmbarcación: jest.fn(),
      setnúmerodeVuelo: jest.fn(),
      setPuertodeTránsito: jest.fn(),
    };

    queryMock = {
      puertodeEmbarque$: of('Tokio'),
      puertodeDesembarque$: of('Osaka'),
      puertodeTránsito$: of('Nagoya'),
      nombredelaEmbarcación$: of('Nippon Maru'),
      númerodeVuelo$: of('1234'),
    };

    await TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule,TransporteComponent],
      declarations: [],
      providers: [
        FormBuilder,
        { provide: Tramite110218Store, useValue: storeMock },
        { provide: Tramite110218Query, useValue: queryMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with default values from query observables', () => {
    expect(component.detallestransporte.value).toEqual({
      puertodeEmbarque: 'Tokio',
      puertodeDesembarque: 'Osaka',
      puertodeTránsito: 'Nagoya',
      nombredelaEmbarcación: 'Nippon Maru',
      númerodeVuelo: '1234',
    });
  });

  it('should call store methods on form control changes', () => {
    component.detallestransporte.get('puertodeEmbarque')?.setValue('Kobe');
    component.onDetallestransporteChange('puertodeEmbarque');
    expect(storeMock.setpuertodeEmbarque).toHaveBeenCalledWith('Kobe');

    component.detallestransporte.get('númerodeVuelo')?.setValue('5678');
    component.onDetallestransporteChange('númerodeVuelo');
    expect(storeMock.setnúmerodeVuelo).toHaveBeenCalledWith('5678');
  });

  it('should unsubscribe on destroy', () => {
    const spy = jest.spyOn(component['destroyed$'], 'next');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });
});
