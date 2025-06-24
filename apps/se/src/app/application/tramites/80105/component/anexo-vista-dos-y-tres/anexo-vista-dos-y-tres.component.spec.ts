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

  it('should set anexoDosTablaLista on ngOnInit if non-empty', fakeAsync(() => {
    fixture.detectChanges();
    anexoDosSubject.next(mockAnexoDos);
    tick();
    expect(component.anexoDosTablaLista).toEqual(mockAnexoDos);
  }));

  it('should set anexoTresTablaLista on ngOnInit if non-empty', fakeAsync(() => {
    fixture.detectChanges();
    anexoTresSubject.next(mockAnexoTres);
    tick();
    expect(component.anexoTresTablaLista).toEqual(mockAnexoTres);
  }));

  it('should update anexoDosTablaLista and call store on obtenerAnexoDosDevolverLaLlamada', () => {
    fixture.detectChanges();
    const newData: AnexoEncabezado[] = [
      {
        encabezadoFraccion: '9999.99.99',
        encabezadoDescripcion: 'Nuevo valor',
        estatus: false,
      },
    ];
    component.obtenerAnexoDosDevolverLaLlamada(newData);
    expect(component.anexoDosTablaLista).toEqual(newData);
    expect(mockStore.setAnnexoDosTableLista).toHaveBeenCalledWith(newData);
  });

  it('should fallback to empty list if null passed to obtenerAnexoDosDevolverLaLlamada', () => {
    fixture.detectChanges();
    component.obtenerAnexoDosDevolverLaLlamada(null as any);
    expect(component.anexoDosTablaLista).toEqual([]);
    expect(mockStore.setAnnexoDosTableLista).toHaveBeenCalledWith([]);
  });

  it('should update anexoTresTablaLista and call store on obtenerAnexoTresDevolverLaLlamada', () => {
    fixture.detectChanges();
    const tresData: AnexoEncabezado[] = [
      {
        encabezadoFraccion: '8888.88.88',
        encabezadoDescripcion: 'Otro valor',
        estatus: true,
      },
    ];
    component.obtenerAnexoTresDevolverLaLlamada(tresData);
    expect(component.anexoTresTablaLista).toEqual(tresData);
    expect(mockStore.setAnnexoTresTableLista).toHaveBeenCalledWith(tresData);
  });

  it('should fallback to empty list if null passed to obtenerAnexoTresDevolverLaLlamada', () => {
    fixture.detectChanges();
    component.obtenerAnexoTresDevolverLaLlamada(null as any);
    expect(component.anexoTresTablaLista).toEqual([]);
    expect(mockStore.setAnnexoTresTableLista).toHaveBeenCalledWith([]);
  });

  it('should initialize configuracionDosDatos with CONFIGURACION_DOS_DATOS', () => {
    expect(component.configuracionDosDatos).toBeDefined();
    expect(component.configuracionDosDatos.length).toBeGreaterThan(0);
  });
});
