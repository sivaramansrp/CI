import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroExportadorAutorizadoComponent } from '../registro-exportador-autorizado.component';

describe('RegistroExportadorAutorizadoComponent', () => {
  let component: RegistroExportadorAutorizadoComponent;
  let fixture: ComponentFixture<RegistroExportadorAutorizadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroExportadorAutorizadoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroExportadorAutorizadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
