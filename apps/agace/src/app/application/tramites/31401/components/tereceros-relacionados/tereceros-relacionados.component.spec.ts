import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TerecerosRelacionadosComponent } from './tereceros-relacionados.component';

describe('TerecerosRelacionadosComponent', () => {
  let component: TerecerosRelacionadosComponent;
  let fixture: ComponentFixture<TerecerosRelacionadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TerecerosRelacionadosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TerecerosRelacionadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
