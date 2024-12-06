import React from 'react';
import key from 'uniqid';
import { Cloudinary } from '@cloudinary/url-gen';
import axios from 'axios';

function InputText({
    value, label, handleOnChange, errors, labeled,
}) {
    return (
        <div className={`col-12 py-1 has-validation input-text-content w-auto ${errors && 'error'}`}>
            {labeled && (
                <div className="px-3 py-1">
                    <span>{label}</span>
                </div>
            )}
            <div className="field w-auto">
                <input
                    className={`${(!errors && value) ? 'is-valid' : 'is-invalid'} w-100 px-3 py-2 form-control`}
                    type="text"
                    name="text"
                    value={value}
                    onChange={handleOnChange}
                    placeholder={label}
                    required
                />
            </div>
            {errors && (
                <div className="d-flex flex-column px-3 pt-2 error-message">
                    {errors.map(({ message }) => (<span key={key()}>{message}</span>))}
                </div>
            )}
        </div>
    );
}

function InputNumber({
    value, label, handleOnChange, errors, labeled,
}) {
    return (
        <div className={`col-12 py-1 has-validation input-text-content w-auto ${errors && 'error'}`}>
            {labeled && (
                <div className="px-3 py-1">
                    <span>{label}</span>
                </div>
            )}
            <div className="field w-auto">
                <input
                    className={`${(!errors && value) ? 'is-valid' : 'is-invalid'} w-100 px-3 py-2 form-control`}
                    type="number"
                    name="text"
                    value={value}
                    onChange={handleOnChange}
                    placeholder={label}
                    required
                />
            </div>
            {errors && (
                <div className="d-flex flex-column px-3 pt-2 error-message">
                    {errors.map(({ message }) => (<span key={key()}>{message}</span>))}
                </div>
            )}
        </div>
    );
}

function InputTextArea({
    value, label, handleOnChange, errors, labeled,
}) {
    return (
        <div className={`col-12 py-1 has-validation input-text-content w-auto ${errors && 'error'}`}>
            {labeled && (
                <div className="px-3 py-1">
                    <span>{label}</span>
                </div>
            )}
            <div className="field w-auto">
                <textarea
                    className={`${(!errors && value) ? 'is-valid' : 'is-invalid'} w-100 px-3 py-2 form-control`}
                    type="text"
                    name="text"
                    value={value}
                    rows="12"
                    onChange={handleOnChange}
                    placeholder={label}
                    required
                />
            </div>
            {errors && (
                <div className="d-flex flex-column px-3 pt-2 error-message">
                    {errors.map(({ message }) => (<span key={key()}>{message}</span>))}
                </div>
            )}
        </div>
    );
}

function InputPhoto({
    value, label, handleOnChange, errors, labeled, handleShowAlert
}) {
    // Set up the cloudinary instance with your cloud name
    const cld = new Cloudinary({
        cloud: {
            cloudName: 'newpoint'
        }
    });
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', 'iiyeav82');
            axios.post('https://api.cloudinary.com/v1_1/newpoint/image/upload', formData)
                .then(response => {
                    handleOnChange(response?.data?.url);
                })
                .catch(error => {
                    handleShowAlert({ type: 'err', message: "Something went wrong. Could not delete product!!" });
                    console.error('Error:', error);
                });
        }
    };

    return (
        <div className={`col-12 py-1 has-validation input-text-content w-auto ${errors && 'error'}`}>
            {labeled && (
                <div className="px-3 py-1">
                    <span>{label}</span>
                </div>
            )}
            <div className="field w-auto">
                <input
                    className={`${(!errors && value) ? 'is-valid' : 'is-invalid'} w-100 px-3 py-2 form-control`}
                    type="file"
                    name="text"
                    accept="image/*" // Only allow image files
                    onChange={handleFileChange}
                    placeholder={label}
                    required={value === null}
                />
            </div>
            <div className="img-container p-5">
                <img src={value} alt="product" className="card-img-top" />
            </div>
            {errors && (
                <div className="d-flex flex-column px-3 pt-2 error-message">
                    {errors.map(({ message }) => (<span key={key()}>{message}</span>))}
                </div>
            )}
        </div>
    );
}

function Email({
    value, label, handleOnChange, errors, labeled,
}) {
    return (
        <div className={`col-12 py-1 has-validation input-text-content w-auto ${errors && 'error'}`}>
            {labeled && (
                <div className="px-3 py-1">
                    <span>{label}</span>
                </div>
            )}
            <div className="field w-auto">
                <input
                    className={`${(!errors && value) ? 'is-valid' : 'is-invalid'} w-100 px-3 py-2 form-control`}
                    type="email"
                    name="email"
                    onChange={handleOnChange}
                    placeholder="example@gmail.com"
                    required
                />
            </div>
            {errors && (
                <div className="d-flex flex-column px-3 pt-2 error-message">
                    {errors.map(({ message }) => (<span key={key()}>{message}</span>))}
                </div>
            )}
        </div>
    );
}

function Password({
    value, label, handleOnChange, errors,
}) {
    return (
        <div className={`col-12 py-1 input-text-content w-auto has-validation ${errors && 'error'}`}>
            <div className="px-3 py-1">
                <span>{label}</span>
            </div>
            <div className="field w-auto w-auto d-flex flex-row">
                <input
                    className={`${(!errors && value) ? 'is-valid' : 'is-invalid'} w-auto px-3 py-2 flex-grow-1 form-control`}
                    type={'password'}
                    onChange={handleOnChange}
                    name="password"
                    placeholder="********"
                    required
                />
            </div>
            {errors && (
                <div className="d-flex flex-column px-3 pt-2 error-message">
                    {errors.map(({ message }) => (<span key={key()}>{message}</span>))}
                </div>
            )}
        </div>
    );
}

function Submit({ label, classes }) {
    return (
        <div className="py-1 input-text-content w-auto">
            <input type="submit" className={`w-100 px-3 py-2 ${classes}`} value={label} />
        </div>
    );
}

export {
    InputText, Email, Password, Submit, InputTextArea, InputNumber, InputPhoto
};
