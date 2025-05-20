import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DomicilioDelEstablecimientoComponent } from './domicilio-del-establecimiento.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Tramite260912Query } from '../../estados/tramite-260912.query';
import { Tramite260912Store } from '../../estados/tramite-260912.store';
import { of } from 'rxjs';
import { Catalogo } from '@libs/shared/data-access-user/src';

describe('DomicilioDelEstablecimientoComponent', () => {
  let component: DomicilioDelEstablecimientoComponent;
  let fixture: ComponentFixture<DomicilioDelEstablecimientoComponent>;
  let tramite260912Query: jest.Mocked<Partial<Tramite260912Query>>;
  let tramite260912Store: jest.Mocked<Partial<Tramite260912Store>>;

  beforeEach(async () => {
  
   

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule, DomicilioDelEstablecimientoComponent],
      providers: [
        FormBuilder
      ],
    }).compileComponents();

    tramite260912Query = TestBed.inject(
      Tramite260912Query
    ) as jest.Mocked<Partial<Tramite260912Query>>;
    tramite260912Store = TestBed.inject(
      Tramite260912Store
    ) as jest.Mocked<Partial<Tramite260912Store>>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DomicilioDelEstablecimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.form).toBeDefined();
    expect(component.domicilio).toBeDefined();
    expect(component.representanteLegal).toBeDefined();
  });
 
});