import { describe, it, expect, vi, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useAlertStore } from '../alertStore';
import { Alert } from '../../interfaces/Alert';

describe('Alert Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should add an alert', () => {
    const alertStore = useAlertStore();
    const alert: Alert = { 
      title: 'Test Alert', 
      type: 'success' ,
      content: 'This is an alert test',
    };

    alertStore.add(alert);
    expect(alertStore.alerts.length).toBe(1);
    expect(alertStore.alerts[0].title).toBe('Test Alert');
    expect(alertStore.alerts[0].type).toBe('success');
  });

  it('should remove an alert', () => {
    const alertStore = useAlertStore();
    const alert: Alert = { 
      title: 'Test Alert', 
      type: 'success' ,
      content: 'This is an alert test',
    };

    alertStore.add(alert);
    alertStore.remove(alert);
    expect(alertStore.alerts.length).toBe(0);
  });

  it('should remove an alert after timeout', async () => {
    const alertStore = useAlertStore();
    const alert: Alert = { 
      title: 'Timeout Alert', 
      type: 'warning' ,
      content: 'This is an alert test warning',
    };

    vi.useFakeTimers(); // Usar temporizador falso para controlar o tempo
    alertStore.add(alert, 1); // Adiciona com timeout de 1 segundo

    expect(alertStore.alerts.length).toBe(1);

    vi.advanceTimersByTime(1000); // Avança o tempo em 1 segundo
    expect(alertStore.alerts.length).toBe(0);

    vi.useRealTimers(); // Retorna aos temporizadores reais
  });
});
