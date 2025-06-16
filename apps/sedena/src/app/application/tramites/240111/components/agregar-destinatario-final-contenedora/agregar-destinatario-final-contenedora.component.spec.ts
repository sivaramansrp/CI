// @ts-nocheck
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  Pipe,
  PipeTransform,
  Injectable,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
  Directive,
  Input,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { AgregarDestinatarioFinalContenedoraComponent } from './agregar-destinatario-final-contenedora.component';
import { Tramite240111Store } from '../../estados/tramite240111Store.store';
import { DatosSolicitudService } from '../../../../shared/services/datos-solicitud.service';

@Directive({ selector: '[myCustom]' })
class MyCustomDirective {
  @Input() myCustom;
}
@Pipe({ name: 'translate' })
class TranslatePipe implements PipeTransform {
  transform(value: any): any {
    return value;
  }
}

@Pipe({ name: 'phoneNumber' })
class PhoneNumberPipe implements PipeTransform {
  transform(value: any): any {
    return value;
  }
}

@Pipe({ name: 'safeHtml' })
class SafeHtmlPipe implements PipeTransform {
  transform(value: any): any {
    return value;
  }
}
@Injectable()
class MockTramite240111Store {
  updateDestinatarioFinalTablaDatos = jest.fn();
}
@Injectable()
class MockDatosSolicitudService {
  obtenerFraccionesCatalogo = jest.fn().mockReturnValue(of([]));
  obtenerUMCCatalogo = jest.fn().mockReturnValue(of([]));
  obtenerMonedaCatalogo = jest.fn().mockReturnValue(of([]));
  obtenerListaCodigosPostales = jest.fn().mockReturnValue(of([]));
  obtenerListaPaises = jest.fn().mockReturnValue(of([]));
  obtenerListaEstados = jest.fn().mockReturnValue(of([]));
  obtenerListaMunicipios = jest.fn().mockReturnValue(of([]));
  obtenerListaLocalidades = jest.fn().mockReturnValue(of([]));
  obtenerListaColonias = jest.fn().mockReturnValue(of([]));
  obtenerListaTiposPersona = jest.fn().mockReturnValue(of([]));
  [key: string]: any;
}


describe('AgregarDestinatarioFinalContenedoraComponent', () => {
  let fixture: ComponentFixture<AgregarDestinatarioFinalContenedoraComponent>;
  let component: AgregarDestinatarioFinalContenedoraComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        AgregarDestinatarioFinalContenedoraComponent,
      ],
      declarations: [
        TranslatePipe,
        PhoneNumberPipe,
        SafeHtmlPipe,
        MyCustomDirective,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}),
            queryParams: of({}),
            data: of({}),
          },
        },
        {
          provide: DatosSolicitudService,
          useClass: MockDatosSolicitudService,
        },
        {
          provide: Tramite240111Store,
          useClass: MockTramite240111Store,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarDestinatarioFinalContenedoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should run #updateDestinatarioFinalTablaDatos()', () => {
    component.updateDestinatarioFinalTablaDatos({});
    expect(component.tramiteStore.updateDestinatarioFinalTablaDatos).toHaveBeenCalled();
  });
});
