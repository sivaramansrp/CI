import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TercerospageComponent } from './tercerospage.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TercerospageComponent', () => {
  let component: TercerospageComponent;
  let fixture: ComponentFixture<TercerospageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TercerospageComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TercerospageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
