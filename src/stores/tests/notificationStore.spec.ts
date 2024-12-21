import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useNotificationStore } from '../notificationStore';
import { Notification } from "../../interfaces/api/Notification";

describe('Notification Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.useFakeTimers()
    vi.spyOn(global, 'setTimeout');
  });

  it('should initialize state correctly', () => {
    const notificationStore = useNotificationStore();
    expect(notificationStore.connection).toBeNull();
    expect(notificationStore.notifications).toHaveLength(0);
    expect(notificationStore.fullLength).toBe(0);
  });

  it('should add a notification to the top of the list', () => {
    const notificationStore = useNotificationStore();
    const notification: Notification = { 
      id: 1, 
      title: 'Test Notification Title',
      type: 'success',
      createdAt: new Date().toISOString(), 
      args: '',
    };

    notificationStore.add(notification);
    expect(notificationStore.notifications[0]).toEqual(notification);
    expect(notificationStore.notifications).toHaveLength(1);
  });

  it('should remove a notification by ID', () => {
    const notificationStore = useNotificationStore();
    const notification1: Notification = { 
      id: 1, 
      title: 'Notification 1',
      type: 'success',
      createdAt: new Date().toISOString(), 
      args: '',
    };

    const notification2: Notification = { 
      id: 2, 
      title: 'Notification 2',
      type: 'success',
      createdAt: new Date().toISOString(), 
      args: '',
    };
    
    notificationStore.add(notification1);
    notificationStore.add(notification2);

    notificationStore.remove(1);
    expect(notificationStore.notifications).toHaveLength(1);
    expect(notificationStore.notifications[0].id).toBe(2);

    notificationStore.remove(3); // Test non-existing ID
    expect(notificationStore.notifications).toHaveLength(1); // No removal should happen
  });

  it('should connect to WebSocket server', () => {
    const notificationStore = useNotificationStore();
    const mockWebSocket = {
      onopen: vi.fn(),
      onmessage: vi.fn(),
      onerror: vi.fn(),
      close: vi.fn(),
    };

    global.WebSocket = vi.fn(() => mockWebSocket) as any;
    notificationStore.connectToServer();

    expect(global.WebSocket).toHaveBeenCalledWith(expect.stringContaining('ws/notifications/?'));    
    expect(notificationStore.connection).toStrictEqual(mockWebSocket);
  });

  it('should handle WebSocket onmessage event', () => {
    const notificationStore = useNotificationStore();
    const mockWebSocket = {
      onopen: vi.fn(),
      onmessage: vi.fn(),
      onerror: vi.fn(),
      close: vi.fn(),
    };
    global.WebSocket = vi.fn(() => mockWebSocket as any) as any;

    notificationStore.connectToServer();

    const messageEvent = { 
      data: JSON.stringify({ 
        error: false, 
        data: { 
          id: 1, 
          title: 'New Notification',
          type: 'success',
          createdAt: new Date().toISOString(), 
          args: '',
        }
      }) 
    };
    mockWebSocket.onmessage!(messageEvent as MessageEvent);

    expect(notificationStore.notifications).toHaveLength(1);
    expect(notificationStore.notifications[0].title).toBe('New Notification');
    expect(notificationStore.fullLength).toBe(1);
  });

  it('should handle WebSocket onerror event and retry connection', () => {
    const notificationStore = useNotificationStore();
    const mockWebSocket = {
      onopen: vi.fn(),
      onmessage: vi.fn(),
      onerror: vi.fn(),
      close: vi.fn(),
    };

    global.WebSocket = vi.fn(() => mockWebSocket) as any;
    notificationStore.connectToServer();
    mockWebSocket.onerror!(new Event('error'));

    // check whether the delay was called successful
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 10000);

    vi.runAllTimers();
  });

  afterEach(() => {
    vi.clearAllTimers(); 
    vi.restoreAllMocks();
  });
});