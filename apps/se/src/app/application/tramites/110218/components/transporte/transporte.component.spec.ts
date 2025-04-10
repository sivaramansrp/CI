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
      establecerPuertodeEmbarque: jest.fn(),
      establecerPuertodeDesembarque: jest.fn(),
      establecerNombredelaEmbarcacion: jest.fn(),
      establecerNúmerodeVuelo: jest.fn(),
      establecerPuertodeTránsito: jest.fn(),
    };

    queryMock = {
      puertodeEmbarque$: of('Tokio'),
      puertodeDesembarque$: of('Osaka'),
      puertodeTransito$: of('Nagoya'),
      nombredelaEmbarcacion$: of('Nippon Maru'),
      numerodeVuelo$: of('1234'),
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
      puertodeTransito: 'Nagoya',
      nombredelaEmbarcación: 'Nippon Maru',
      numerodeVuelo: '1234',
    });
  });

  it('should call store methods on form control changes', () => {
    component.detallestransporte.get('puertodeEmbarque')?.setValue('Kobe');
    component.enCambioDeDetallesDeTransporte('puertodeEmbarque');
    expect(storeMock.establecerPuertodeEmbarque).toHaveBeenCalledWith('Kobe');

    component.detallestransporte.get('numerodeVuelo')?.setValue('5678');
    component.enCambioDeDetallesDeTransporte('numerodeVuelo');
    expect(storeMock.establecerNúmerodeVuelo).toHaveBeenCalledWith('5678');
  });

  it('should unsubscribe on destroy', () => {
    const spy = jest.spyOn(component['destroyed$'], 'next');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });
});
