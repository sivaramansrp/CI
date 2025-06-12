import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoTresComponent } from './paso-tres.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { Router } from '@angular/router';
import { FirmaElectronicaComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';

describe('PasoTresComponent', () => {
  let component: PasoTresComponent;
  let fixture: ComponentFixture<PasoTresComponent>;
  let router: Router;
  let navigateSpy: jest.SpyInstance;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasoTresComponent,HttpClientTestingModule,CommonModule, FirmaElectronicaComponent, ToastrModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(PasoTresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
    navigateSpy = jest.spyOn(router, 'navigate');
  });

    it('should navigate to "servicios-extraordinarios/acuse" when FIRMA is valid', () => {
    const navigateSpy = jest.spyOn(router, 'navigate');
    const mockFirma = 'VALID_SIGNATURE';

    component.obtieneFirma(mockFirma);

    expect(navigateSpy).toHaveBeenCalledWith(['servicios-extraordinarios/acuse']);
  });

  it('should not navigate when FIRMA is empty', () => {
    const navigateSpy = jest.spyOn(router, 'navigate');
    const mockFirma = '';

    component.obtieneFirma(mockFirma);

    expect(navigateSpy).not.toHaveBeenCalled();
  });
});
