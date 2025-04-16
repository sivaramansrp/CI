import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitudComponent } from './solicitud.component';
import { FormControl, FormGroup } from '@angular/forms';

describe('SolicitudComponent', () => {
  let component: SolicitudComponent;
  let fixture: ComponentFixture<SolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitudComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values on ngOnInit', () => {
    const mockState = {
      regimen_0: false,
      regimen_1: false,
      regimen_2: false,
      regimen_3: false,
      manifiesto: false,
    };

    jest
      .spyOn(component['tramite32201Query'], 'select') // Replace 'selectSolicitud$' with a valid method like 'select'
      .mockReturnValue({
        pipe: jest.fn().mockReturnValue({
          subscribe: jest.fn((callback) => callback(mockState)),
        }),
      } as any);

    component.ngOnInit();

    expect(component.solicitudForm.value).toEqual({
      regimen_0: false,
      regimen_1: false,
      regimen_2: false,
      regimen_3: false,
      manifiesto: false,
    });
  });

  it('should call setValoresStore with correct parameters', () => {
    const mockForm = new FormGroup({
      testField: new FormControl('testValue'),
    });
    const mockMethod = jest.fn();
    component['tramite32201Store'] = { testMethod: mockMethod } as any;

    component.setValoresStore(mockForm, 'testField', 'testMethod' as any);

    expect(mockMethod).toHaveBeenCalledWith('testValue');
  });
});
