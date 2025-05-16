import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AcuseReciboComponent } from './acuse-recibo.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TablaAcciones } from '@libs/shared/data-access-user/src';

describe('AcuseReciboComponent', () => {
  let component: AcuseReciboComponent;
  let fixture: ComponentFixture<AcuseReciboComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcuseReciboComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AcuseReciboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize acciones with correct values', () => {
    expect(component.acciones).toEqual([
      TablaAcciones.VER,
      TablaAcciones.DESCARGAR,
    ]);
  });

  it('should initialize acuseReciboTablaDatos as an empty array', () => {
    expect(component.acuseReciboTablaDatos).toEqual([]);
  });
});
