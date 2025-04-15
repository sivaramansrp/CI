import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdicionProcesosComponent } from './adicionProcesos.component';

describe('AdicionProcesosComponent', () => {
  let component: AdicionProcesosComponent;
  let fixture: ComponentFixture<AdicionProcesosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdicionProcesosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdicionProcesosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
