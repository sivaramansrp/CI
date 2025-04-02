import { render, screen } from '@testing-library/angular';
import { CafeDeExportadoresComponent } from '../cafe-de-exportadores/cafe-de-exportadores.component';
import { TramiteStore } from '../../estados/tramite290101.store';
import { TramiteStoreQuery } from '../../estados/tramite290101.query';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

describe('CafeDeExportadoresComponent', () => {
  let mockTramiteStore: jest.Mocked<TramiteStore>;
  let mockTramiteStoreQuery: jest.Mocked<TramiteStoreQuery>;

  beforeEach(async () => {
    mockTramiteStore = {
      setCafExportTramite: jest.fn(),
    } as unknown as jest.Mocked<TramiteStore>;

    mockTramiteStoreQuery = {
      selectSolicitudTramite$: of({
        CafExportFormatState: { /* mock data */ },
      }),
    } as unknown as jest.Mocked<TramiteStoreQuery>;

    await render(CafeDeExportadoresComponent, {
      providers: [
        FormBuilder,
        { provide: TramiteStore, useValue: mockTramiteStore },
        { provide: TramiteStoreQuery, useValue: mockTramiteStoreQuery },
      ],
    });
  });

  it('should create component', async () => {
    expect(await screen.findByTestId('cafe-de-exportadores')).toBeTruthy();
  });

  it('should call setCafExportTramite in ngOnInit()', () => {
    expect(mockTramiteStore.setCafExportTramite).toHaveBeenCalled();
  });

  it('should initialize form', async () => {
    const component = await screen.findByTestId('cafe-de-exportadores');
    expect(component).toBeTruthy();
  });
});
