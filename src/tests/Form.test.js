import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Form from '../components/Form'

test('renders the Form component and checks for the Save button', () => {
    const { getByText } = render(<Form />);
    const saveButton = getByText('Save');
    expect(saveButton).toBeInTheDocument();
    expect(saveButton).toBeDisabled();
    expect(saveButton).toHaveClass('submit-btn');
    fireEvent.click(saveButton);
  });
  
  test('submits the form with valid data and saves it to localStorage', async () => {
    const { getByLabelText, getByText } = render(<Form />);
    const firstNameInput = getByLabelText('First Name:');
    const lastNameInput = getByLabelText('Last Name:');
    const emailInput = getByLabelText('Email:');
    const dobInput = getByLabelText('Date of Birth:');
    const postalCodeInput = getByLabelText('Postal Code:');
    const saveButton = getByText('Save');
  
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.change(dobInput, { target: { value: '2000-01-01' } });
    fireEvent.change(postalCodeInput, { target: { value: '12345' } });
  
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(localStorage.getItem('formData')).toBeTruthy();
      const formData = JSON.parse(localStorage.getItem('formData'));
      expect(formData.firstName).toBe('John');
      expect(formData.lastName).toBe('Doe');
      expect(formData.email).toBe('john.doe@example.com');
      expect(formData.dateOfBirth).toBe('2000-01-01');
      expect(formData.postalCode).toBe('12345');
      expect(getByText('Form saved successfully!')).toBeInTheDocument();
    });
  });
  