//@ts-nocheck
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Directive,
  Injectable,
  Input,
  NO_ERRORS_SCHEMA,
  Output,
  Pipe,
  PipeTransform
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CatalogosService } from '@ng-mf/data-access-user';
import { ImportadorExportadorService } from '@ng-mf/data-access-user';
import { of as observableOf } from 'rxjs';
import { PasoDosComponent } from './paso-dos.component';
import { TestBed } from '@angular/core/testing';

@Directive({ selector: '[myCustom]' })
class MyCustomDirective {
  @Input() myCustom;
}

@Pipe({ name: 'translate' })
class TranslatePipe implements PipeTransform {
  static transform(value) {
    return value;
  }
}

@Pipe({ name: 'phoneNumber' })
class PhoneNumberPipe implements PipeTransform {
  static transform(value) {
    return value;
  }
}

@Pipe({ name: 'safeHtml' })
class SafeHtmlPipe implements PipeTransform {
  static transform(value) {
    return value;
  }
}

describe('PasoDosComponent', () => {
  let fixture;
  let component: PasoDosComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [
        PasoDosComponent,
        TranslatePipe,
        PhoneNumberPipe,
        SafeHtmlPipe,
        MyCustomDirective,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [CatalogosService, ImportadorExportadorService],
    })
      .overrideComponent(PasoDosComponent, {})
      .compileComponents();
    fixture = TestBed.createComponent(PasoDosComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    component.ngOnDestroy = function () {
      // Esta función se deja vacía intencionalmente para la limpieza después de cada prueba.
    };
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    await fixture.whenStable(); 
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async () => {
    await fixture.whenStable(); 
    component.getTiposDocumentos = jest.fn();
    component.getTipoDocumento = jest.fn();
    component.ngOnInit();
   
  });

  it('should run #getTiposDocumentos()', async () => {
    await fixture.whenStable(); 
    component.catalogosServices = component.catalogosServices || {};
    component.catalogosServices.getCatalogo = jest
      .fn()
      .mockReturnValue(observableOf({}));
    component.getTiposDocumentos();
    
  });

  it('should run #getTipoDocumento()', async () => {
    await fixture.whenStable(); 
    component.importarExportar = component.importarExportar || {};
    component.importarExportar.getTipoDocumento = jest.fn().mockReturnValue(
      observableOf({
        code: {},
        data: {},
      })
    );
    component.getTipoDocumento();
    
  });

  it('should run #todosDocumentos()', async () => {
    await fixture.whenStable(); 
    component.documentosSeleccion = component.documentosSeleccion || {};
    component.documentosSeleccion.every = jest.fn().mockReturnValue([null]);
    component.todosDocumentos();
    
  });

  it('should run #enDocumentSelect()', async () => {
    await fixture.whenStable(); 
    component.enDocumentSelect({});
  });

  it('should run #verDocument()', async () => {
    await fixture.whenStable(); 
    component.documentosSeleccion = component.documentosSeleccion || {};
    component.documentosSeleccion.index = 'index';
    component.verDocument({});
  });

  it('should run #cambioArchivo()', async () => {
    await fixture.whenStable(); 
    component.tamanosDeArchivos = component.tamanosDeArchivos || {};
    component.tamanosDeArchivos.index = 'index';
    component.resolucions = component.resolucions || {};
    component.resolucions.index = 'index';
    component.nombresArchivosSubidos = component.nombresArchivosSubidos || {};
    component.nombresArchivosSubidos.index = 'index';
    component.cambioArchivo(
      {
        target: {
          files: {
            0: {
              size: {},
              name: {},
            },
          },
          value: {},
        },
      },
      {}
    );
  });

  it('should run #adjuntarArchivos()', async () => {
    await fixture.whenStable(); 
    component.adjuntarArchivos();
  });

  it('should run #cerrarProceso()', async () => {
    await fixture.whenStable(); 
    component.cerrarProceso();
  });
});
