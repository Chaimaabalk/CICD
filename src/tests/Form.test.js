import React from 'react';
import { render, fireEvent, waitFor, getAllByText, getAllByLabelText } from '@testing-library/react';
import Form from '../components/Form'


/**
* test suite for the Form component
* @module Form.test
* @requires react
* @requires react-testing-library
* @requires Form
 */

test('renders the Form component and checks for the Save button', () => {
    const { getByText } = render(<Form />);
    const saveButton = getByText('Save');
    expect(saveButton).toBeInTheDocument();
    expect(saveButton).toBeDisabled();
    expect(saveButton).toHaveClass('submit-btn');
    fireEvent.click(saveButton);
  });
  
test('submits the form with valid data and saves it to localStorage and clears the form after a successful submission ', async () => {
    const { getByLabelText, getByText } = render(<Form />);
    const firstNameInput = getByLabelText('First Name:');
    const lastNameInput = getByLabelText('Last Name:');
    const emailInput = getByLabelText('Email:');
    const dobInput = getByLabelText('Date of Birth:');
    const postalCodeInput = getByLabelText('Postal Code:');
    const cityInput = getByLabelText('City:');
    const saveButton = getByText('Save');
  
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.change(dobInput, { target: { value: '2000-01-01' } });
    fireEvent.change(postalCodeInput, { target: { value: '12345' } });
    fireEvent.change(cityInput, { target: { value: 'Paris' } });
  
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
      expect(firstNameInput.value).toBe('');
      expect(lastNameInput.value).toBe('');
      expect(emailInput.value).toBe('');
      expect(dobInput.value).toBe('');
      expect(postalCodeInput.value).toBe('');
      expect(cityInput.value).toBe('');
    });
});

test('displays an error message when the form is submitted with invalid data', async () => {
    const { getByLabelText, getByText } = render(<Form />);
    const firstNameInput = getByLabelText('First Name:');
    const lastNameInput = getByLabelText('Last Name:');
    const emailInput = getByLabelText('Email:');
    const dobInput = getByLabelText('Date of Birth:');
    const postalCodeInput = getByLabelText('Postal Code:');
    const cityInput = getByLabelText('City:');
    const saveButton = getByText('Save');
  
    fireEvent.change(firstNameInput, { target: { value: '123' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe323' } });
    fireEvent.change(emailInput, { target: { value: 'xxxx.xxx@xxxxxxx' } });
    fireEvent.change(dobInput, { target: { value: '2010-01-01' } });
    fireEvent.change(postalCodeInput, { target: { value: '1234' } });
    fireEvent.change(cityInput, { target: { value: 'Paris@' } });
  
    fireEvent.click(saveButton);
  
    await waitFor(() => {
      const Fname = getByText('First name is invalid');
      const Lname = getByText('Last name is invalid');
      const Email = getByText('Email is invalid');
      const Postal = getByText('Postal code is invalid');
      const City = getByText('City is invalid');
      const Age = getByText('You must be over 18 years old');
      expect(Fname).toBeInTheDocument();
      expect(Lname).toBeInTheDocument();
      expect(Email).toBeInTheDocument();
      expect(Postal).toBeInTheDocument();
      expect(City).toBeInTheDocument();
      expect(Age).toBeInTheDocument();
     
    //expect color of the error message
      expect(Fname).toHaveStyle('color: red');
      expect(Lname).toHaveStyle('color: red');
      expect(Email).toHaveStyle('color: red');
      expect(Postal).toHaveStyle('color: red');
      expect(City).toHaveStyle('color: red');
      expect(Age).toHaveStyle('color: red');
      });
  }
);














  