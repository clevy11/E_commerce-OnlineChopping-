import React, { useState, useRef, useEffect } from 'react';
import { Validate } from '../helpers';
import  { useParams } from 'react-router-dom';
import { updateProducts } from '../api';
import useAuth from '../hooks/useAuth';
import Alert from './Shared/Alert';
import { Button } from './Shared/Elements';
import { Product } from "../models";
import { InputText, InputNumber, InputPhoto, InputTextArea} from "./Shared/Input";
import { getProduct } from '../api/_product';
import { set } from 'lodash';


function EditProduct({ alert: defaultAlert }) {
  const { setAuth } = useAuth();

  const [status, setStatus] = useState();

  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState();
  const [price, setPrice] = useState();

  const [nameErrors, setNameErrors] = useState(null);
  const [descriptionErrors, setDescriptionErrors] = useState(null);
  const [imageErrors, setImageErrors] = useState(null);
  const [priceErrors, setPriceErrors] = useState(null);

  const [alert, setAlert] = useState(defaultAlert);
  const [showAlert, setShowAlert] = useState(true);
  const form = useRef();
  const canContinue = !!(!nameErrors && !descriptionErrors && !imageErrors && !priceErrors && name && description && image && price);
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  

  useEffect(() => {
    fetchProduct(productId);
}, []);

const fetchProduct = (id) => {
    getProduct(id, (err, data) => {
        if (err) {
            // Handle error
        } else {
            setProduct(data?.data);
            setName(data?.data?.name);
            setDescription(data?.data?.description);
            setImage(data?.data?.image);
            setPrice(data?.data?.price);
        }
    });
};

  const handleNameChange = e => {
    setName(e.target.value);
    const { error } = Validate('product', { name: e.target.value });
    setNameErrors(error ? error.details : undefined);
  };
  const handleDescriptionChange = e => {
    setDescription(e?.target?.value);
    const { error } = Validate('product', { description: e?.target?.value });
    setDescriptionErrors(error ? error.details : undefined);
  };
  const handleImageChange = e => {
    console.log("EVENT: ", e)
    setImage(e);
    const { error } = Validate('product', { image: e });
    setImageErrors(error ? error.details : undefined);
  };
  const handlePriceChange = e => {
    setPrice(e.target.value);
    const { error } = Validate('product', { price: e.target.value });
    setPriceErrors(error ? error.details : undefined);
  };

  const ValidateInputs = () => {
    handleNameChange({ target: { value: name } });
    handleDescriptionChange({ target: { value: description } });
    handleImageChange({ target: { value: image } });
    handlePriceChange({ target: { value: price } });
  };
  const handleCloseAlert = () => {
    setShowAlert(false);
  };
  const handleShowAlert = data => {
    setAlert(data || defaultAlert);
    setShowAlert(true);
  };
  const updateProduct = e => {
    if(e) {
      e.preventDefault();
    }
    
    if (status !== 'pending') {
      if (!canContinue) {
        ValidateInputs();
      } else {
        setStatus('pending');
        const updatedProduct = product;
        updatedProduct.name = name;
        updatedProduct.description = description;
        updatedProduct.price = price;
        updatedProduct.image = image;

        updateProducts(product, (err, data) => {
          try {
            if (err) {
              setStatus('fail');
              handleShowAlert({ type: 'err', message: err.response?.data?.errors[0]?.defaultMessage });
            } else {
              handleShowAlert({ type: 'info', message: "Product updated successfully" });
              setPrice("")
              setDescription("")
              setName("")
              setImage("")
            }
          } catch (error) {
            handleShowAlert({ type: 'err', message: "Something went wrong!!" });
          }
        });
      }
    }
  };

  return (
    <div className="mt-4">
      <div className="row">
        <div className="col-12 right d-flex justify-content-center align-items-center">
          <div>
            <div className="c-f-content">
              <div className="c-f-i-content py-4 px-5">
                {(showAlert && alert) && (<Alert info={alert} handleCloseAlert={handleCloseAlert} />)}
                <div className="">
                  <h6>Creating product item:  </h6>
                  <form
                    onSubmit={updateProduct}
                    className="needs-validation"
                    ref={form}
                  >
                    <div className='row'>
                      <div className='col-6'>

                      <InputPhoto
                        handleOnChange={handleImageChange}
                        value={image}
                        errors={imageErrors}
                        label={"Product picture"}
                        labeled
                    />
                      </div>
                      <div className='col-6'>
                      <InputText
                      handleOnChange={handleNameChange}
                      value={name}
                      label={"Product name"}
                      errors={nameErrors}
                      labeled
                    />
                    <InputTextArea
                      handleOnChange={handleDescriptionChange}
                      value={description}
                      label={"Product description"}
                      errors={descriptionErrors}
                      labeled
                    />
                    <InputNumber
                      handleOnChange={handlePriceChange}
                      label={"Product price"}
                      value={price}
                      errors={priceErrors}
                    />
                    <Button label="Update product" classes="primary-button" />
                      </div>
                    </div>
                    
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;
