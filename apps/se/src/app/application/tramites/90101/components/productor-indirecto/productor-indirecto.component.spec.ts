import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { ProsecService } from 'libs/shared/data-access-user/src/core/services/90101/prosec.module';
import { ProductorIndirectoComponent } from './productor-indirecto.component';

describe('ProductorIndirectoComponent', () => {
  let component: ProductorIndirectoComponent;
  let fixture: ComponentFixture<ProductorIndirectoComponent>;
  let prosecService: ProsecService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductorIndirectoComponent],
      imports: [HttpClientTestingModule],
      providers: [FormBuilder, ProsecService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductorIndirectoComponent);
    component = fixture.componentInstance;
    prosecService = TestBed.inject(ProsecService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize productorIndirecto form group', () => {
    expect(component.productorIndirecto).toBeDefined();
  });

  it('should call recuperarDatos on ngOnInit', () => {
    spyOn(component, 'recuperarDatos');
    component.ngOnInit();
    expect(component.recuperarDatos).toHaveBeenCalled();
  });

  it('should populate productorDatos on successful data retrieval', () => {
    const mockResponse = [{ tbodyData: 'data1' }, { tbodyData: 'data2' }];
    spyOn(prosecService, 'obtenerTablaDatos').and.returnValue(of(mockResponse));
    component.recuperarDatos();
    expect(component.productorDatos.length).toBe(2);
    expect(component.productorDatos[0].tbodyData).toBe('data1');
  });

  it('should handle error on data retrieval failure', () => {
    spyOn(prosecService, 'obtenerTablaDatos').and.returnValue(throwError({ status: 500 }));
    spyOn(console, 'error');
    component.recuperarDatos();
    expect(console.error).toHaveBeenCalledWith('Error al obtener los datos:', { status: 500 });
    expect(component.productorDatos.length).toBe(0);
  });
});
