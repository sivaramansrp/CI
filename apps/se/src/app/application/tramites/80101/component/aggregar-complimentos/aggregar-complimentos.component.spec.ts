import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AggregarComplimentosComponent } from './aggregar-complimentos.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AggregarComplimentosComponent', () => {
  let component: AggregarComplimentosComponent;
  let fixture: ComponentFixture<AggregarComplimentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AggregarComplimentosComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AggregarComplimentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
