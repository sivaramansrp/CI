import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosTratadosAcuerdosComponent } from './datos-tratados-acuerdos.component';

describe('DatosTratadosAcuerdosComponent', () => {
  let component: DatosTratadosAcuerdosComponent;
  let fixture: ComponentFixture<DatosTratadosAcuerdosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosTratadosAcuerdosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosTratadosAcuerdosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
