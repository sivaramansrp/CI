// @ts-nocheck
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import {
  Pipe, PipeTransform, Directive, Input, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
} from '@angular/core';

import { HistoricoFabricantesComponent } from './historico-fabricantes.component';
import { ElegibilidadDeTextilesStore } from '../../estados/elegibilidad-de-textiles.store';
import { ElegibilidadDeTextilesQuery } from '../../queries/elegibilidad-de-textiles.query';
import { ElegibilidadTextilesService } from '../../services/elegibilidad-textiles/elegibilidad-textiles.service';
import { SeccionLibStore, SeccionLibQuery } from '@ng-mf/data-access-user';

@Injectable() class MockElegibilidadDeTextilesStore {
  setFormaValida = jest.fn();
}
@Injectable() class MockElegibilidadDeTextilesQuery {
  selectTextile$ = of({
    formaValida: [],
    exportadorFabricanteMismo: 'mockExportador',
    numeroRegistroFiscal: 'mockRFC'
  });
}
@Injectable() class MockElegibilidadTextilesService {
  obtenerTablaDatos = jest.fn().mockReturnValue(of([
    { nombreFabricante: 'F1', numeroRegistroFiscal: 'RFC1', direccion: 'Dir1', correoElectronico: 'mail@test.com', telefono: '1234567890' }
  ]));
}
@Injectable() class MockSeccionLibQuery {
  selectSeccionState$ = of({ readonly: false });
}
@Injectable() class MockSeccionLibStore {
  establecerFormaValida = jest.fn();
  establecerSeccion = jest.fn();
}

@Directive({ selector: '[myCustom]' })
class MyCustomDirective {
  @Input() myCustom;
}

@Pipe({ name: 'translate' }) class TranslatePipe implements PipeTransform {
  transform(value: any): any { return value; }
}
@Pipe({ name: 'phoneNumber' }) class PhoneNumberPipe implements PipeTransform {
  transform(value: any): any { return value; }
}
@Pipe({ name: 'safeHtml' }) class SafeHtmlPipe implements PipeTransform {
  transform(value: any): any { return value; }
}

describe('HistoricoFabricantesComponent', () => {
  let component: HistoricoFabricantesComponent;
  let fixture;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoricoFabricantesComponent, ReactiveFormsModule, FormsModule],
      declarations: [TranslatePipe, PhoneNumberPipe, SafeHtmlPipe, MyCustomDirective],
      providers: [
        FormBuilder,
        { provide: ElegibilidadDeTextilesStore, useClass: MockElegibilidadDeTextilesStore },
        { provide: ElegibilidadDeTextilesQuery, useClass: MockElegibilidadDeTextilesQuery },
        { provide: ElegibilidadTextilesService, useClass: MockElegibilidadTextilesService },
        { provide: SeccionLibStore, useClass: MockSeccionLibStore },
        { provide: SeccionLibQuery, useClass: MockSeccionLibQuery },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(HistoricoFabricantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit()', fakeAsync(() => {
    component.formularioDeshabilitado = false;
    component.ngOnInit();
    tick();
    expect(component.historicoFabricantesForm).toBeTruthy();
  }));

  it('should build the form correctly', () => {
    component.historicoState = {
      exportadorFabricanteMismo: 'yes',
      numeroRegistroFiscal: 'RFC123'
    };
    component.initActionFormBuild();
    expect(component.historicoFabricantesForm.get('numeroRegistroFiscal')).toBeTruthy();
  });

  it('should fetch data and populate fabricantesNacionales', () => {
    component.recuperarDatos();
    expect(component.fabricantesNacionales.length).toBeGreaterThan(0);
    expect(component.fabricantesNacionales[0].nombreFabricante).toEqual('F1');
  });

  it('should update selectedValue on onValueChange()', () => {
    component.onValueChange('mockValue');
    expect(component.selectedValue).toBe('mockValue');
  });

  it('should set store value using setValoresStore()', () => {
    const storeMock = { setNombreFabricante: jest.fn() };
    component.ElegibilidadDeTextilesStore = storeMock;
    const form = new FormBuilder().group({ campo: 'valor' });
    component.setValoresStore(form, 'campo', 'setNombreFabricante');
    expect(storeMock.setNombreFabricante).toHaveBeenCalledWith('valor');
  });

  it('should clean up on ngOnDestroy()', () => {
    const nextSpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should not throw error when calling verDetalle', () => {
    const mockRow = {
      nombreFabricante: 'Fab 1',
      numeroRegistroFiscal: 'RFC1',
      direccion: 'Some Street',
      correoElectronico: 'email@domain.com',
      telefono: '9876543210',
    };
    expect(() => component.verDetalle?.(mockRow)).not.toThrow();
  });
});