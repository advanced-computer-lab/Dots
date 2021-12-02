import React, { Component } from 'react';

class EditForm extends Component {
    state = {
        data: {
            firstName: '',
            lastName: '',
            homeAddress: '',
            countryCode: '',
            phoneNumber: '',
            email: '',
            passportNumber: '',
        },
        errors: {
            firstNameError: '', lastNameError: '', phoneNumberError: '', emailError: '',
        }
    }
    render() {
        return (
            <div>
                Data
            </div>
        );
    }
}

export default EditForm;