import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { of, Subject } from 'rxjs';
import { ElementRef } from '@angular/core';
import { Modal } from 'bootstrap';

import { DomicillioDelEstablecimientoSeccionComponent } from './domicillio-del-establecimiento-seccion.component';
import { EstablecimientoService } from '../../services/establecimiento.service';
import { DatosDelSolicituteSeccionQuery } from '../../estados/queries/datos-del-solicitute-seccion.query';
import { DatosDelSolicituteSeccionState, DatosDelSolicituteSeccionStateStore } from '../../estados/stores/datos-del-solicitute-seccion.store';
import { Catalogo } from '@libs/shared/data-access-user/src';
describe('DomicillioDelEstablecimientoSeccionComponent', () => {
  let component: DomicillioDelEstablecimientoSeccionComponent;
  let fixture: ComponentFixture<DomicillioDelEstablecimientoSeccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DomicillioDelEstablecimientoSeccionComponent],
      imports: [ReactiveFormsModule, FormsModule, CommonModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DomicillioDelEstablecimientoSeccionComponent);
    component = fixture.componentInstance;

    // Mock destroy$
    component['destroy$'] = new Subject<void>();

    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const destroySpy = jest.spyOn(component['destroy$'], 'next');
    const completeSpy = jest.spyOn(component['destroy$'], 'complete');

    component.ngOnDestroy();

    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});