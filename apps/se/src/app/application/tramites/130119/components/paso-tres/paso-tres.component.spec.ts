import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoTresComponent } from './paso-tres.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

describe('PasoTresComponent', () => {
  let component: PasoTresComponent;
  let fixture: ComponentFixture<PasoTresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasoTresComponent],
      providers: [
        { 
          provide: ToastrService, 
          useValue: { success: jest.fn(), error: jest.fn(), info: jest.fn(), warning: jest.fn() } 
        } 
      ],
      schemas: [NO_ERRORS_SCHEMA] 
    }).compileComponents();

    fixture = TestBed.createComponent(PasoTresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear', () => {
    expect(component).toBeTruthy();
  });
});
