import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdicionFraccionComponent } from './adicionFraccion.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Modal } from 'bootstrap';
import { of } from 'rxjs';
import { AvisoModifyService } from '../../services/aviso-modify.service';
import { Tramite32301Store } from '../../estados/tramite32301.store';
import { Tramite32301Query } from '../../estados/tramite32301.query';
import { AlertComponent, Catalogo, CatalogoSelectComponent, CrosslistComponent, InputRadioComponent, TableComponent, TablePaginationComponent, TituloComponent, FirmaElectronicaComponent, SharedModule, WizardComponent } from "@ng-mf/data-access-user";
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

describe('AdicionFraccionComponent', () => {
  let component: AdicionFraccionComponent;
  let fixture: ComponentFixture<AdicionFraccionComponent>;
  let avisoModifyServiceMock: any;
  beforeEach(async () => {

    avisoModifyServiceMock = {
      getAdicianFraccionOption: jest
        .fn()
        .mockReturnValue(of([{ label: 'Option 1', value: 1 }])),
    };

    await TestBed.configureTestingModule({
      imports: [
        AdicionFraccionComponent,
        CommonModule,
        ReactiveFormsModule,
        TituloComponent,
        AlertComponent,
        InputRadioComponent,
        TableComponent,
        TablePaginationComponent,
        CatalogoSelectComponent,
        CrosslistComponent,
        FirmaElectronicaComponent,
        RouterModule,
        FormsModule,
        HttpClientModule,
        WizardComponent,
        SharedModule,
    
      ],
      declarations: [],
      providers: [
        FormBuilder,
        { provide: AvisoModifyService, useValue: avisoModifyServiceMock },
        { provide: Tramite32301Store, useValue: {} },
        { provide: Tramite32301Query, useValue: {} },
      ],
    }).compileComponents();
  
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdicionFraccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.declaracionForm = new FormBuilder().group({ idCarga: [''] });
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize forms on ngOnInit', () => {
    component.ngOnInit();
    expect(component.declaracionForm).toBeDefined();
    expect(component.declaracionFormModel).toBeDefined();
    expect(component.cargaManualForm).toBeDefined();
 
  });
  it('should have default values', () => {
    component.declaracionForm.patchValue({ idCarga: 'TIPCAR.MA' });
    component.valorSeleccionadoTipoCarga();
    expect(component.divBtnCargaMVisible).toBe(false);
  });

  it('should fetch radio options on getAdicianFraccionOption', () => {
    component.getAdicianFraccionOption();
    expect(avisoModifyServiceMock.getAdicianFraccionOption).toHaveBeenCalled();
    expect(component.radioOptions).toEqual([{ label: 'Option 1', value: 1 }]);
  });
  

  it('should fetch and update radioOptions', () => {
    const mockOptions = [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' }
    ];
  
    avisoModifyServiceMock.getAdicianFraccionOption = jest.fn().mockReturnValue(of(mockOptions));
  
    component.getAdicianFraccionOption();
  
    expect(avisoModifyServiceMock.getAdicianFraccionOption).toHaveBeenCalledTimes(1);
    expect(component.radioOptions).toEqual(mockOptions);
  });
  ;

  it('should add all dates when agregar is called with "t"', () => {
    component.selectRangoDias = ['2023-01-01', '2023-01-02'];
    component.agregar('t');
    expect(component.fechasSeleccionadas).toEqual(['2023-01-01', '2023-01-02']);
    expect(component.fechasDatos).toEqual([]);
  });

  it('should remove all dates when quitar is called with "t"', () => {
    component.fechasSeleccionadas = ['2023-01-01', '2023-01-02'];
    component.quitar('t');
    expect(component.fechasSeleccionadas).toEqual([]);
    expect(component.fechasDatos).toEqual(['2023-01-01', '2023-01-02']);
  });

  it('should toggle divBtnCargaMVisible based on idCarga value', () => {
    component.declaracionForm.patchValue({ idCarga: 'TIPCAR.MA' });
    component.valorSeleccionadoTipoCarga();
    expect(component.divBtnCargaMVisible).toBe(false);

    component.declaracionForm.patchValue({ idCarga: 'TIPCAR.CM' });
    component.valorSeleccionadoTipoCarga();
    expect(component.divBtnCargaMVisible).toBe(true);
  });

  it('should update pagination on onItemsPerPageChange', () => {
    component.miembroDeLaEmpresaBodyData = Array.from(
      { length: 10 },
      (_, i) => i + 1
    );
    component.onItemsPerPageChange(5);
    expect(component.itemsPerPage).toBe(5);
    expect(component.currentPage).toBe(1);
  });

  it('should update current page on onPageChange', () => {
    component.onPageChange(2);
    expect(component.currentPage).toBe(2);
  });

  it('should open and close modals correctly', () => {
    const modalInstanceMock = { show: jest.fn(), hide: jest.fn() };
    component.cargaMasivaFrModalInstance =
      modalInstanceMock as unknown as Modal;

    component.openCargaMasivaFrModal();
    expect(modalInstanceMock.show).toHaveBeenCalled();

    component.closeCargaMasivaFrModal();
    expect(modalInstanceMock.hide).toHaveBeenCalled();
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const destroySpy = jest.spyOn(component['destroy$'], 'next');
    const completeSpy = jest.spyOn(component['destroy$'], 'complete');
    component.ngOnDestroy();
    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
