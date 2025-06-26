import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Pipe, PipeTransform, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { AnexoVistaDosYTresComponent } from './anexo-vista-dos-y-tres.component';
import { Tramite80101Query } from '../../estados/tramite80101.query';
import { Tramite80101Store } from '../../estados/tramite80101.store';
import { AnexoEncabezado } from '../../../../shared/models/nuevo-programa-industrial.model';
import { TablaSeleccion } from '@libs/shared/data-access-user/src';
import { ANEXO_SERVICIO } from '../../../../shared/constantes/anexo-dos-y-tres.enum';
import { AnexoTresComponent } from '../../../../shared/components/anexo-tres/anexo-tres.component';

@Directive({ selector: '[myCustom]' })
class MyCustomDirective {
  @Input() myCustom: any;
}

@Pipe({ name: 'translate' })
class TranslatePipe implements PipeTransform {
  transform(value: any) {
    return value;
  }
}

@Pipe({ name: 'phoneNumber' })
class PhoneNumberPipe implements PipeTransform {
  transform(value: any) {
    return value;
  }
}

@Pipe({ name: 'safeHtml' })
class SafeHtmlPipe implements PipeTransform {
  transform(value: any) {
    return value;
  }
}

describe('AnexoVistaDosYTresComponent', () => {
  let fixture: ComponentFixture<AnexoVistaDosYTresComponent>;
  let component: AnexoVistaDosYTresComponent;
  let mockQuery: Partial<Tramite80101Query>;
  let mockStore: jest.Mocked<Tramite80101Store>;
  let anexoDosSubject: Subject<AnexoEncabezado[]>;
  let anexoTresSubject: Subject<AnexoEncabezado[]>;

  const mockAnexoDos: AnexoEncabezado[] = [
    {
      encabezadoFraccion: '0101.21.01',
      encabezadoDescripcion: 'Descripción Anexo Dos',
      estatus: true,
    },
  ];

  const mockAnexoTres: AnexoEncabezado[] = [
    {
      encabezadoFraccion: '0202.31.01',
      encabezadoDescripcion: 'Descripción Anexo Tres',
      estatus: false,
    },
  ];

  beforeEach(() => {
    anexoDosSubject = new Subject<AnexoEncabezado[]>();
    anexoTresSubject = new Subject<AnexoEncabezado[]>();

    mockQuery = {
      anexoDosTableLista$: anexoDosSubject.asObservable(),
      anexoTresTablaLista$: anexoTresSubject.asObservable(),
    };

    mockStore = {
      setAnnexoDosTableLista: jest.fn(),
      setAnnexoTresTableLista: jest.fn(),
    } as unknown as jest.Mocked<Tramite80101Store>;

    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, AnexoVistaDosYTresComponent],
      declarations: [TranslatePipe, PhoneNumberPipe, SafeHtmlPipe, MyCustomDirective],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        { provide: Tramite80101Query, useValue: mockQuery },
        { provide: Tramite80101Store, useValue: mockStore },
      ],
    });

    fixture = TestBed.createComponent(AnexoVistaDosYTresComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    anexoDosSubject.complete();
    anexoTresSubject.complete();
  });

  it('should clean up destroyNotifier$ on ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should initialize anexoConfig with correct values', () => {
    expect(component.anexoConfig.anexoDosTablaSeleccionCheckbox).toBe(TablaSeleccion.CHECKBOX);
    expect(component.anexoConfig.anexoDosEncabezadoDeTabla).toBe(ANEXO_SERVICIO);
    expect(component.anexoConfig.anexoTresTablaSeleccionCheckbox).toBe(TablaSeleccion.CHECKBOX);
    expect(component.anexoConfig.anexoTresEncabezadoDeTabla).toBe(ANEXO_SERVICIO);
  });

  it('should initialize configuracionDosDatos with CONFIGURACION_DOS_DATOS', () => {
    expect(component.configuracionDosDatos).toBeDefined();
    expect(component.configuracionDosDatos.length).toBeGreaterThan(0);
  });

  it('should have empty initial anexo lists', () => {
  expect(component.anexoDosTablaLista).toEqual([]);
  expect(component.anexoTresTablaLista).toEqual([]);
});

it('should handle undefined emitted from anexoDosTableLista$', fakeAsync(() => {
  fixture.detectChanges();
  anexoDosSubject.next(undefined as any);
  tick();
  expect(component.anexoDosTablaLista).toEqual([]);
}));

it('should handle undefined emitted from anexoTresTablaLista$', fakeAsync(() => {
  fixture.detectChanges();
  anexoTresSubject.next(undefined as any);
  tick();
  expect(component.anexoTresTablaLista).toEqual([]);
}));




});
