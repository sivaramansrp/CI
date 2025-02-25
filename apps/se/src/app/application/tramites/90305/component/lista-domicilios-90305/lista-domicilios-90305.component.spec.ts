import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaDomicilios90305Component } from './lista-domicilios-90305.component';

describe('ListaDomicilios90305Component', () => {
  let component: ListaDomicilios90305Component;
  let fixture: ComponentFixture<ListaDomicilios90305Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaDomicilios90305Component],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaDomicilios90305Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
