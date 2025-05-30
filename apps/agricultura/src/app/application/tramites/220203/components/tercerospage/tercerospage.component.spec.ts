import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TercerospageComponent } from './tercerospage.component';
import { HttpClientModule } from '@angular/common/http';

describe('TercerospageComponent', () => {
  let component: TercerospageComponent;
  let fixture: ComponentFixture<TercerospageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TercerospageComponent, HttpClientModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TercerospageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
