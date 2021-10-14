import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => {
  return value.trim() === "";
};
const isFiveChars = (value) => {
  return value.trim().length > 5;
};

const Checkout = (props) => {
  const [formValidity, setFormValidity] = useState({
    name: true,
    street: true,
    post: true,
    city: true,
  });
  const nameRef = useRef();
  const streetRef = useRef();
  const postRef = useRef();
  const cityRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();
    const enterName = nameRef.current.value;
    const enterStreet = streetRef.current.value;
    const enterPost = postRef.current.value;
    const enterCity = cityRef.current.value;

    const nameValid = !isEmpty(enterName);
    const streetValid = !isEmpty(enterStreet);
    const cityValid = !isEmpty(enterCity);
    const postValid = isFiveChars(enterPost);

    setFormValidity({
      name: nameValid,
      street: streetValid,
      post: postValid,
      city: cityValid,
    });

    const formIsValidity = nameValid && streetValid && cityValid && postValid;

    if (!formIsValidity) {
      return;
    }

    props.onConfirm({
      name: enterName,
      street: enterStreet,
      post: enterPost,
      city: enterCity,
    });
  };

  const nameClasses = `${classes.control} ${
    formValidity.name ? "" : classes.invalid
  }`;
  const streetClasses = `${classes.control} ${
    formValidity.street ? "" : classes.invalid
  }`;
  const postClasses = `${classes.control} ${
    formValidity.post ? "" : classes.invalid
  }`;
  const cityClasses = `${classes.control} ${
    formValidity.city ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameClasses}>
        <label htmlFor="name">Your Name</label>
        <input ref={nameRef} type="text" id="name" />
        {!formValidity.name && <p>Please enter a valid name.</p>}
      </div>
      <div className={streetClasses}>
        <label htmlFor="street">Street</label>
        <input ref={streetRef} type="text" id="street" />
        {!formValidity.street && <p>Please enter a valid street.</p>}
      </div>
      <div className={postClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input ref={postRef} type="text" id="postal" />
        {!formValidity.post && <p>Please enter a valid postal code.</p>}
      </div>
      <div className={cityClasses}>
        <label htmlFor="city">City</label>
        <input ref={cityRef} type="text" id="city" />
        {!formValidity.city && <p>Please enter a valid address.</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
