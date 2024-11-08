import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import UserService from '../user'; 
import { useFetch } from '../../../composables/useFetch';
import { useLoadingStore } from '../../../stores/loadingStore';
import { User } from '../../../interfaces/User';
import { createPinia, setActivePinia } from 'pinia';

vi.mock('../../../composables/useFetch', () => ({
  useFetch: () => ({
    fetchData: vi.fn().mockResolvedValue({ result: null, error: null }),
    error: null,
    result: null,
  }),
}));

vi.mock('../../stores/loadingStore', () => ({
  useLoadingStore: () => ({
    isLoading: false,
  }),
}));

describe('UserService', () => {
  let userService: UserService;
  let loadingStore: ReturnType<typeof useLoadingStore>;
  let fetchData: ReturnType<typeof useFetch>['fetchData'];

  beforeEach(() => {
    setActivePinia(createPinia())
    userService = new UserService();
    loadingStore = useLoadingStore();
    fetchData = useFetch().fetchData as Mock;
  });

  it('should fetch users', async () => {
    const params = 'page=1';
    const response = await userService.getUsers(params);
    console.log(loadingStore.isLoading)


    // expect(loadingStore.isLoading).toBe(true);
    expect(fetchData).toHaveBeenCalledWith('get', `/users?${params}`);
    expect(loadingStore.isLoading).toBe(false);
    expect(response).toEqual({
      error: null,
      result: null,
    });
  });

  // it('should fetch a single user', async () => {
  //   // Arrange
  //   const userId = '1';
  //   fetchData.mockResolvedValueOnce(undefined); // Simula a resolução da promessa

  //   // Act
  //   const response = await userService.getUser(userId);

  //   // Assert
  //   expect(fetchData).toHaveBeenCalledWith('get', `/users/${userId}`);
  //   expect(response).toEqual({
  //     error: null,
  //     result: null,
  //   });
  // });

  // it('should create a user', async () => {
  //   const newUser: User = { 
  //     id: '2', 
  //     name: 'John Doe', 
  //     email: 'jdoe@example.com', 
  //     dateOfBirth: new Date() 
  //   };
  //   fetchData.mockResolvedValueOnce(undefined); // Simula a resolução da promessa

  //   // Act
  //   const response = await userService.createUser(newUser);

  //   // Assert
  //   expect(fetchData).toHaveBeenCalledWith('post', '/users', newUser);
  //   expect(response).toEqual({
  //     error: null,
  //     result: null,
  //   });
  // });

  // it('should update a user', async () => {
  //   // Arrange
  //   const userId = '1';
  //   const updatedUser: User = { 
  //     id: '1', 
  //     name: 'Jane Doe', 
  //     email: 'janedoe@example.com', 
  //     dateOfBirth: new Date() 
  //   };
  //   fetchData.mockResolvedValueOnce(undefined); // Simula a resolução da promessa

  //   // Act
  //   const response = await userService.updateUser(userId, updatedUser);

  //   // Assert
  //   expect(fetchData).toHaveBeenCalledWith('patch', `/users/${userId}`, updatedUser);
  //   expect(response).toEqual({
  //     error: null,
  //     result: null,
  //   });
  // });

  // it('should delete a user', async () => {
  //   // Arrange
  //   const userId = '1';
  //   fetchData.mockResolvedValueOnce(undefined); // Simula a resolução da promessa

  //   // Act
  //   const response = await userService.deleteUser(userId);

  //   // Assert
  //   expect(fetchData).toHaveBeenCalledWith('delete', `/users/${userId}`);
  //   expect(response).toEqual({
  //     error: null,
  //     result: null,
  //   });
  // });
});
