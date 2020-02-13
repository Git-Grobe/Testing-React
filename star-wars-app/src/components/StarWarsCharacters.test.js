import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import { getData as mockGetData } from '../api';
import StarWarsCharacters from './StarWarsCharacters';

jest.mock('../api');

test('renders page, list of characters, functioning previous/next buttons', async() => {
    mockGetData.mockResolvedValueOnce({ 
        results:[
        { name:'Luke Skywalker', url:'test'}
        ]
    });
    const { getByText } = render(<StarWarsCharacters />);
    const previousBttn = getByText(/previous/i);
    const nextBttn = getByText(/next/i);
    fireEvent.click(previousBttn);
    fireEvent.click(nextBttn);
    expect(mockGetData).toHaveBeenCalledTimes(1);    
    await wait(() =>  expect(getByText(/luke/i)));

});