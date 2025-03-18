import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AggregarComplimentosComponent } from './aggregar-complimentos.component';

describe('AggregarComplimentosComponent', () => {
  let component: AggregarComplimentosComponent;
  let fixture: ComponentFixture<AggregarComplimentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AggregarComplimentosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AggregarComplimentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
