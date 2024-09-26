import styled from "styled-components";
import { PayMethodResponse } from "../../../../common/interfaces/paymethod.interface";
import { useState } from "react";
import useAlert from "../../../private/userMenu/components/alert.component";
import { useAuth } from "../../../../auth/auth.provider";
import { useNavigate } from "react-router-dom";

interface FormCheckoutProps {
  payMethod: PayMethodResponse | null;
}

const FormCheckout = ({ payMethod }: FormCheckoutProps) => {
  const auth = useAuth() //get auth context
  const user = auth.getUser()
  const token = auth.getToken()
  const goTo = useNavigate()

  const { nameCardHolder, cardNumber } = payMethod || {}; //extract name card and card number of payMethod 
  const { showAlert } = useAlert();
  
  const [totalPrice, setTotalPrice] = useState(7.99);
  const [duration, setDuration] = useState("");

  //change price if user choose a month
  const handleDurationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDuration = event.target.value;
    let price = 0;

    //price of premium plans
    switch (selectedDuration) {
      case "1 Month":
        price = 7.99;
        break;
      case "3 Month":
        price = 19.99;
        break;
      case "12 Month":
        price = 49.99;
        break;
      default:
        price = 7.99; 
    }

    setDuration(selectedDuration);
    setTotalPrice(price);
  };

  //when user push checkout, buy and change status subscription
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    try {
      const changeSubscription = await fetch(`${import.meta.env.VITE_BACKEND_URL}/subcriptions/${user.id}`, {
        method: 'PATCH',
        headers:{
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status: true,
          payMethodId: payMethod?.id,
          duration: duration
        })
      })

      if(!changeSubscription.ok){   
        showAlert('error', 'Subcription cannot be pay', 'error')
        throw new Error('Cannot')
      }

      showAlert('success', 'Subscription purchased', 'Succesfully')
      auth.saveSessionInfo(user, token, true)
      goTo('/')
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <StyledWrapper>
      <form action="" className="form" onSubmit={handleSubmit}>
        <p className="title-checkout-box">
          Checkout<span>VorteXtream</span>
        </p>
       
        <select onChange={handleDurationChange}>
          <option value="" disabled>Choose duration</option>
          <option value="1 Month">1 Month</option>
          <option value="3 Month">3 Month</option>
          <option value="12 Month">12 Month</option>
        </select>
        
        <div className="paymethod-info-checkoutPage">
          <h2 className="payment-save-title">Payment Save</h2>
          <h3>{nameCardHolder}</h3>
          <h4>{cardNumber}</h4>
        </div>

        <div className="total-payment">
          <h2>Total:</h2>
          <h2 className="totalamount">USD {totalPrice.toFixed(2)}</h2>
        </div>
        
        <button className="oauthButton" type="submit">
          Checkout!
          <svg
            className="icon"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 17 5-5-5-5" />
            <path d="m13 17 5-5-5-5" />
          </svg>
        </button>
      </form>
    </StyledWrapper>
  );
};
const StyledWrapper = styled.div`
  /* DEOXY Was Here */
  .form {
    --background: #d3d3d3;
    --input-focus: #2d8cf0;
    --font-color: #323232;
    --font-color-sub: #666;
    --bg-color: #fff;
    --main-color: #323232;
    padding: 20px;
    background-color: #151515;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    border: 2px solid var(--main-color);
    box-shadow: 4px 4px var(--main-color);
    height: 45.8rem;

  }

  .payment-save-title{
   color: #F08080;
  }

  .form > p {
    font-family: var(--font-DelaGothicOne);
    color: var(--font-color);
    font-weight: 700;
    font-size: 20px;
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
    text-align: center;
    width: 100%;
    color: white;
  }

  .form > p > span {
    font-weight: 600;
    font-size: 17px;
    text-align: center;
    color: #F08080;
  }

  .separator {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }

  .separator > div {
    width: 100px;
    height: 3px;
    border-radius: 5px;
    background-color: var(--font-color-sub);
  }

  .separator > span {
    color: var(--font-color);
    font-family: var(--font-SpaceMono);
    font-weight: 600;
  }

  .title-checkout-box{
    color: #F08080;
  }

  .oauthButton {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    /* margin: 50px auto 0 auto; */
    padding: auto 15px 15px auto;
    width: 250px;
    height: 40px;
    border-radius: 5px;
    border: 2px solid var(--main-color);
    background-color: var(--bg-color);
    box-shadow: 4px 4px var(--main-color);
    font-size: 16px;
    font-weight: 600;
    color: var(--font-color);
    cursor: pointer;
    transition: all 250ms;
    position: relative;
    overflow: hidden;
    z-index: 1;
  }

  .oauthButton::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 0;
    background-color: #212121;
    z-index: -1;
    -webkit-box-shadow: 4px 8px 19px -3px rgba(0, 0, 0, 0.27);
    box-shadow: 4px 8px 19px -3px #F08080;
    transition: all 250ms;
  }

  .oauthButton:hover {
    color: #F08080;
  }

  .oauthButton:hover::before {
    width: 100%;
  }

  .form > input, select {
    width: 250px;
    height: 40px;
    border-radius: 5px;
    border: 2px solid var(--main-color);
    background-color: var(--bg-color);
    box-shadow: 4px 4px  #F08080;
    font-size: 15px;
    font-weight: 600;
    color: var(--font-color);
    padding: 5px 10px;
    outline: none;
  }

  .paymethod-info-checkoutPage{
   width: 250px;
    height: 10rem;
    border-radius: 5px;
    border: 2px solid var(--main-color);
    background-color: var(--bg-color);
    box-shadow: 4px 4px  #F08080;
    font-size: 15px;
    font-weight: 600;
    color: var(--font-color);
    padding: 5px 10px;
    outline: none;
  }

  .icon {
    width: 1.5rem;
    height: 1.5rem;
  }

  .total-payment{
    display: flex;
    gap: 2rem;
    color: white
  }

  .totalamount{
   color: #F08080;
  }
`;

export default FormCheckout;
