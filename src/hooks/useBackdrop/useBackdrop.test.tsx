import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { BackdropProvider, useBackdrop } from './useBackdrop';

describe('useBackdrop', () => {
  it('should open and close the backdrop', () => {
    const TestComponent = () => {
      const { openBackdrop, closeBackdrop, isOpenBackdrop } = useBackdrop();

      return (
        <div>
          <button data-testid="open-button" onClick={openBackdrop}>
            Open Backdrop
          </button>
          <button data-testid="close-button" onClick={closeBackdrop}>
            Close Backdrop
          </button>
        </div>
      );
    };

    const { getByTestId } = render(
      <RecoilRoot>
        <BackdropProvider>
          <TestComponent />
        </BackdropProvider>
      </RecoilRoot>
    );

    const openButton = getByTestId('open-button');
    const closeButton = getByTestId('close-button');
    const backdrop = getByTestId('backdrop-container');

    expect(backdrop.getAttribute('data-visible')).toEqual("false");

    fireEvent.click(openButton);
    expect(backdrop.getAttribute('data-visible')).toEqual("true");

    fireEvent.click(closeButton);
    expect(backdrop.getAttribute('data-visible')).toEqual("false");
  });
});