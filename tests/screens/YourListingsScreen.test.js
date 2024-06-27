import { render, act } from '@testing-library/react-native';
import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import YourListingsScreen, { fetchListedItems } from '..screens/YourListingsScreen'; // Adjust the import based on the actual path
import { UserContext } from '../UserContext';
import { ProductContext } from '../ProductContext';

// Mock axios
vi.mock('axios');

describe('fetchListedItems', () => {
  it('should fetch and set products', async () => {
    const mockData = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];
    axios.get.mockResolvedValue({ data: mockData });

    let setProducts;
    let setLoading;

    // Mock setState functions
    const useStateMock = (initialState) => [initialState, vi.fn()];
    vi.spyOn(React, 'useState').mockImplementationOnce(useStateMock); // for products
    vi.spyOn(React, 'useState').mockImplementationOnce(useStateMock); // for loading

    await act(async () => {
      render(
        <UserContext.Provider value={{ userId: 'testUserId' }}>
          <ProductContext.Provider value={{ setSelectedItem: vi.fn() }}>
            <YourListingsScreen />
          </ProductContext.Provider>
        </UserContext.Provider>
      );

      // Extract the setState mock functions
      setProducts = React.useState()[1];
      setLoading = React.useState()[1];
    });

    // Call the fetchListedItems function
    await act(async () => {
      await fetchListedItems('testUserId', setProducts, setLoading);
    });

    // Assertions
    expect(axios.get).toHaveBeenCalledWith(
      'http://192.168.0.115:8000/products/bySellers?users=testUserId'
    );
    expect(setProducts).toHaveBeenCalledWith(mockData);
    expect(setLoading).toHaveBeenCalledWith(false);
  });
});
