// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Observable, of as observableOf } from 'rxjs';
import { By } from '@angular/platform-browser';

import { PasoDosComponent } from './paso-dos.component';
import { DocumentoService } from '@ng-mf/data-access-user';
import { ToastrService } from 'ngx-toastr';
import { TranslatePipe } from '@ng-mf/data-access-user';
import { PhoneNumberPipe } from '@ng-mf/data-access-user';
import { SafeHtmlPipe } from '@ng-mf/data-access-user';
import { MyCustomDirective } from '@ng-mf/data-access-user';
import { Tramite32502Store } from '../../../../estados/tramites/tramite32502.store';
import { Tramite32502Query } from '../../../../estados/queries/tramite3250.query';

describe('PasoDosComponent', () => {
  let fixture: ComponentFixture<PasoDosComponent>;
  let component: PasoDosComponent;
  let mockDocumentoService: any;
  let mockToastrService: any;
  let mockTramite32502Store: any;
  let mockTramite32502Query: any;

  beforeEach(async () => {
    mockDocumentoService = {
      subirDocumento: jest.fn().mockReturnValue(observableOf({}))
    };
    mockToastrService = {
      error: jest.fn(),
      success: jest.fn()
    };
    mockTramite32502Store = {
      setIndividualCheckbox: jest.fn(),
      setCommonCheckbox: jest.fn()
    };
    mockTramite32502Query = {
      selectSolicitud$: observableOf({
        dropdown: '',
        commonCheckbox: false,
        individualCheckbox: [false, false, false]
      })
    };

    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [
        PasoDosComponent,
        TranslatePipe, PhoneNumberPipe, SafeHtmlPipe,
        MyCustomDirective
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        FormBuilder,
        { provide: DocumentoService, useValue: mockDocumentoService },
        { provide: ToastrService, useValue: mockToastrService },
        { provide: Tramite32502Store, useValue: mockTramite32502Store },
        { provide: Tramite32502Query, useValue: mockTramite32502Query }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PasoDosComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    if (fixture) {
      fixture.destroy();
    }
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.checkboxForm).toBeDefined();
  });

  it('should toggle all checkboxes', () => {
    component.ngOnInit();
    const event = {
      target: {
        checked: true
      }
    };
    component.toggleAllCheckboxes(event);
    expect(component.individualCheckbox.controls.every(control => control.value)).toBe(true);
  });

  it('should handle individual checkbox change', () => {
    component.ngOnInit();
    const event = {
      target: {
        checked: true
      }
    };
    component.onCheckboxChange(event, 1);
    expect(component.individualCheckbox.controls[1].value).toBe(true);
  });

  it('should set values in the store', () => {
    component.ngOnInit();
    component.setValoresStore(component.checkboxForm, 'individualCheckbox', 'setIndividualCheckbox');
    expect(mockTramite32502Store.setIndividualCheckbox).toHaveBeenCalled();
  });

  it('should handle file upload', () => {
    component.ngOnInit();
    component.PDF = 'pdf';
    component.documentoSeleccionado = { tam: '1024' };
    const event = {
      target: {
        files: [
          {
            name: 'document.pdf',
            size: 1024
          }
        ]
      }
    };
    component.cargarDoc(event);
    expect(mockToastrService.success).toHaveBeenCalled();
    expect(mockDocumentoService.subirDocumento).toHaveBeenCalled();
    expect(component.documentosCargados.length).toBe(1);
  });

  it('should convert kilobytes to bytes', () => {
    const bytes = PasoDosComponent.convertirKilobytesABytes(1);
    expect(bytes).toBe(1024);
  });

  it('should return true for btnDesactivado when documentoSeleccionado is defined', () => {
    component.documentoSeleccionado = { id: 1 };
    expect(component.btnDesactivado).toBe(true);
  });

  it('should return false for btnDesactivado when documentoSeleccionado is not defined', () => {
    component.documentoSeleccionado = { id: 0 };
    expect(component.btnDesactivado).toBe(false);
  });
});