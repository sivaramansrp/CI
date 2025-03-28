import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Router } from '@angular/router';
import { PasoTresComponent } from './paso-tres.component';
import { FirmaElectronicaComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';

describe('PasoTresComponent', () => {
  let component: PasoTresComponent;
  let fixture: ComponentFixture<PasoTresComponent>;
  let router: Router;
  let navigateSpy: jest.SpyInstance;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FirmaElectronicaComponent,
        RouterTestingModule.withRoutes([]),
      ],
      declarations: [PasoTresComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PasoTresComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    navigateSpy = jest.spyOn(router, 'navigate');
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

});
