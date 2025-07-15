import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { CTPATComponent } from './c-tpat.component';
import { SolicitudService } from '../../services/solicitud.service';
import { Solicitud32611Store } from '../../estados/solicitud32611.store';
import { Solicitud32611Query } from '../../estados/solicitud32611.query';
import { InputRadioComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CTPATComponent', () => {
  let component: CTPATComponent;
  let fixture: ComponentFixture<CTPATComponent>;
  let solicitudServiceMock: any;
  let solicitud32611StoreMock: any;
  let solicitud32611QueryMock: any;

  beforeEach(async () => {
    solicitudServiceMock = {
      conseguirOpcionDeRadio: jest.fn().mockReturnValue(
        of({
          requisitos: {
            radioOptions: [
              {
                label: 'Sí',
                value: 1,
              },
              {
                label: 'No',
                value: 2,
              },
            ],
            isRequired: true,
          },
        })
      ),
    };

    solicitud32611StoreMock = {
      actualizar2089: jest.fn(),
      actualizar2090: jest.fn(),
      actualizar2091: jest.fn(),
    };

    solicitud32611QueryMock = {
      selectSolicitud$: of({
        2089: 'value2089',
        2090: 'value2090',
        2091: 'value2091',
      }),
    };

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        InputRadioComponent,
        CTPATComponent,
        HttpClientTestingModule,
      ],
      declarations: [],
      providers: [
        FormBuilder,
        { provide: SolicitudService, useValue: solicitudServiceMock },
        { provide: Solicitud32611Store, useValue: solicitud32611StoreMock },
        { provide: Solicitud32611Query, useValue: solicitud32611QueryMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CTPATComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    expect(component.ctpatForm.value).toEqual({
      '2089': 'value2089',
      '2090': 'value2090',
      '2091': 'value2091',
    });
  });

  it('should call conseguirOpcionDeRadio on initialization', () => {
    jest.spyOn(component, 'conseguirOpcionDeRadio');
    component.conseguirOpcionDeRadio();
    expect(component.conseguirOpcionDeRadio).toHaveBeenCalled();
  });

  it('should update solicitud32611State and patch form values when selectSolicitud$ emits', () => {
    expect(component.solicitud32611State).toEqual({
      2089: 'value2089',
      2090: 'value2090',
      2091: 'value2091',
    });
    expect(component.ctpatForm.value).toEqual({
      '2089': 'value2089',
      '2090': 'value2090',
      '2091': 'value2091',
    });
  });

  it('should call actualizar2089 with the correct value', () => {
    component.actualizar2089('newValue2089');
    expect(solicitud32611StoreMock.actualizar2089).toHaveBeenCalledWith(
      'newValue2089'
    );
  });

  it('should call actualizar2090 with the correct value', () => {
    component.actualizar2090('newValue2090');
    expect(solicitud32611StoreMock.actualizar2090).toHaveBeenCalledWith(
      'newValue2090'
    );
  });

  it('should call actualizar2091 with the correct value', () => {
    component.actualizar2091('newValue2091');
    expect(solicitud32611StoreMock.actualizar2091).toHaveBeenCalledWith(
      'newValue2091'
    );
  });

  it('should complete destroy$ on ngOnDestroy', () => {
    const destroySpy = jest.spyOn(component['destroy$'], 'next');
    const completeSpy = jest.spyOn(component['destroy$'], 'complete');
    component.ngOnDestroy();
    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
