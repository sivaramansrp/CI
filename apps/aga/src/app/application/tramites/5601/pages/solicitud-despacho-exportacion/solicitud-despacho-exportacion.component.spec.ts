import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitudDespachoExportacionComponent } from './solicitud-despacho-exportacion.component';

describe('SolicitudDespachoExportacionComponent', () => {
  let component: SolicitudDespachoExportacionComponent;
  let fixture: ComponentFixture<SolicitudDespachoExportacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SolicitudDespachoExportacionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitudDespachoExportacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
