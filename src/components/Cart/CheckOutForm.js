import { useRef, useState } from "react";
import styles from "./CheckOutForm.module.css";

//const isEmpty = value => value.trim().length === 0;
const isEmpty = value => value.trim() === '';
const isNotFiveChars = value => value.trim().length !== 5;

const CheckOutForm = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();  
  
    const confirmHandler = (event) =>{
        event.preventDefault();
        
        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostal = postalInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredCityIsValid = !isEmpty(enteredCity);
        const enteredPostalCodeIsValid = !isNotFiveChars(enteredPostal);

        setFormInputsValidity({
            name: enteredNameIsValid,
            street: enteredNameIsValid,
            city: enteredCityIsValid,
            postalCode: enteredPostalCodeIsValid
        });

        const formIsValid =(
            enteredNameIsValid && 
            enteredStreetIsValid && 
            enteredCityIsValid && 
            enteredPostalCodeIsValid
        );

        if(!formIsValid){
            return;
        }
        //Submit the cart data
        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            city: enteredCity,
            postalCode: enteredPostal
        })
  };

  const nameControlStyles = `${styles.control} ${formInputsValidity.name ? '' : styles.invalid}`;
  const streetControlStyles = `${styles.control} ${formInputsValidity.street ? '' : styles.invalid}`;
  const postalCodeControlStyles = `${styles.control} ${formInputsValidity.postalCode ? '' : styles.invalid}`;
  const cityControlStyles = `${styles.control} ${formInputsValidity.city ? '' : styles.invalid}`;
  
  return (
    <form className={styles.form} onSubmit={confirmHandler}>
      <div className={nameControlStyles}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef}/>
        {!formInputsValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={streetControlStyles}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef}/>
        {!formInputsValidity.street && <p>Please enter a valid street!</p>}
      </div>
      <div className={postalCodeControlStyles}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalInputRef}/>
        {!formInputsValidity.postalCode && <p>Please enter a valid postal code (5 characters long)!</p>}
      </div>
      <div className={cityControlStyles}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef}/>
        {!formInputsValidity.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={styles.actions}>
        <button type="button" onClick={props.onCancel}>Cancel</button>
        <button>Confirm</button>
      </div>
    </form>
  );
};

export default CheckOutForm;
