import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { PayMethodResponse } from "../../interfaces/paymethod.interface";
import { useAuth } from "../../../auth/auth.provider";
import { BankResponse } from "../../interfaces/bank.interface";

const FormMethodPay = () => {
  const [bankInfo, setBankInfo] = useState<BankResponse[]>([]);
  const [payMethodInfo, setPayMethodInfo] = useState<PayMethodResponse>({
    id: null,
    userId: null,
    bankId: null,
    cardNumber: null,
    cvv: null,
    expirationDate: null,
    nameCardHolder: null,
  }); // Cambiado a `null` por defecto

  const [nameCard, setNameCard] = useState<string>("");
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [bank, setBank] = useState<string>("");

  const auth = useAuth();
  const user = auth.getUser();
  const token = auth.getToken();

  // Fetch Banks Data
  const fetchBanks = async () => {
    try {
      const res = await fetch(`http://localhost:3000/vortextream/bank`, {
        method: "GET",
      });

      if (!res.ok) throw new Error("Banks not found");

      const resToJson = (await res.json()) as BankResponse[];
      setBankInfo(resToJson);
    } catch (err) {
      console.error('Error fetching banks:', err);
    }
  };

  useEffect(() => {
    fetchBanks();
  }, []);

  // Fetch Pay Method Data
  const fetchPayMethod = async () => {
    if (!user?.id) return;

    try {
      const res = await fetch(
        `http://localhost:3000/vortextream/paymethod/${user.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        console.log('Failed to fetch pay method');
        throw new Error("Paymethod not found");
      }

      const resToJson = (await res.json()) as PayMethodResponse;
      setPayMethodInfo(resToJson);
      console.log('Fetched pay method:', resToJson); // Debugging
    } catch (err) {
      console.error('Error fetching pay method:', err);
    }
  };

  useEffect(() => {
    fetchPayMethod();
  }, [user?.id, token]); // Añadidas dependencias para el useEffect

  // Handle Form Submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!nameCard || !cardNumber || !cvv || !expirationDate || !bank) {
      alert("All inputs are required");
      return;
    }

    const payload = {
      nameCardHolder: nameCard,
      bankId: bank,
      cardNumber,
      cvv,
      expirationDate,
    };

    try {
      const url = payMethodInfo ? 
        `http://localhost:3000/vortextream/paymethod/${user.id}` : 
        `http://localhost:3000/vortextream/paymethod`;

      const method = payMethodInfo ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(payMethodInfo ? "Cannot update payment" : "Cannot create payment");
      }

      const resToJson = await res.json();
      console.log(resToJson);

      alert(payMethodInfo ? "Payment updated successfully" : "Payment created successfully");

      fetchPayMethod();
    } catch (err) {
      console.error('Error handling form submit:', err);
    }
  };

  return (
    <StyledWrapper>
      <div className="modal">
        <form className="form" onSubmit={handleSubmit}>
          <div className="credit-card-info--form">
            <div className="input_container">
              <select
                className="input_label"
                value={bank}
                onChange={(e) => setBank(e.target.value)}
              >
                <option value="" disabled>
                  Bank
                </option>
                {bankInfo.map((bankItem) => (
                  <option key={bankItem.id} value={String(bankItem.id)}>
                    {bankItem.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="credit-card-info--form">
            <div className="input_container">
              <label className="input_label" htmlFor="name_card">
                Card holder full name
              </label>
              <input
                placeholder={payMethodInfo.nameCardHolder || "Enter your full name"}
                title="Input title"
                name="input-name"
                type="text"
                className="input_field"
                id="name_card"
                value={nameCard}
                onChange={(e) => setNameCard(e.target.value)}
              />
            </div>
            <div className="input_container">
              <label className="input_label" htmlFor="card_number">
                Card Number
              </label>
              <input
                placeholder={payMethodInfo.cardNumber ||"0000 0000 0000 0000"}
                title="Input title"
                name="input-card-number"
                type="text"
                className="input_field"
                id="card_number"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
            </div>
            <div className="input_container">
              <label className="input_label" htmlFor="expiration_date">
                Expiry Date / CVV
              </label>
              <div className="split">
                <input
                  placeholder={ payMethodInfo.expirationDate ||"01/23"}
                  title="Expiry Date"
                  name="input-expiration-date"
                  type="text"
                  className="input_field"
                  id="expiration_date"
                  value={expirationDate}
                  onChange={(e) => setExpirationDate(e.target.value)}
                />
                <input
                  placeholder={payMethodInfo.cvv || 'CVV'}
                  title="CVV"
                  name="input-cvv"
                  type="text"
                  className="input_field"
                  id="cvv"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                />
              </div>
            </div>
            <button className="purchase--btn" type="submit">Save</button>
          </div>
        </form>
      </div>
    </StyledWrapper>
  );
};


const StyledWrapper = styled.div`
  .modal {
    margin-top: 2rem;
    width: fit-content;
    height: fit-content;
    background: #ffffff;
    box-shadow: 0px 187px 75px rgba(0, 0, 0, 0.01),
      0px 105px 63px rgba(0, 0, 0, 0.05), 0px 47px 47px rgba(0, 0, 0, 0.09),
      0px 12px 26px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1);
    border-radius: 26px;
    max-width: 450px;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
  }

  .payment--options {
    width: calc(100% - 40px);
    display: grid;
    grid-template-columns: 33% 34% 33%;
    gap: 20px;
    padding: 10px;
  }

  .payment--options button {
    height: 55px;
    background: #f2f2f2;
    border-radius: 11px;
    padding: 0;
    border: 0;
    outline: none;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .payment--options button svg {
    height: 18px;
  }

  .payment--options button:last-child svg {
    height: 22px;
  }

  .input_container select {
    height: 3rem;
    border-radius: 10px;
    border: white;
    padding-left: 0.9rem;
    font-size: 0.8rem;
  }

  .separator {
    width: calc(100% - 20px);
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    gap: 10px;
    color: #8b8e98;
    margin: 0 10px;
  }

  .separator > p {
    word-break: keep-all;
    display: block;
    padding-top: 10px;
    text-align: center;
    font-weight: 600;
    font-size: 11px;
    margin: auto;
  }

  .separator .line {
    display: inline-block;
    width: 100%;
    height: 1px;
    border: 0;
    background-color: #e8e8e8;
    margin: auto;
  }

  .credit-card-info--form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .input_container {
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .split {
    display: grid;
    grid-template-columns: 4fr 2fr;
    gap: 15px;
  }

  .split input {
    width: 100%;
  }

  .input_label {
    font-size: 10px;
    color: #8b8e98;
    font-weight: 600;
  }

  .input_field {
    width: auto;
    height: 40px;
    padding: 0 0 0 16px;
    border-radius: 9px;
    outline: none;
    background-color: #f2f2f2;
    border: 1px solid #e5e5e500;
    transition: all 0.3s cubic-bezier(0.15, 0.83, 0.66, 1);
  }

  .input_field:focus {
    border: 1px solid transparent;
    box-shadow: 0px 0px 0px 2px #242424;
    background-color: transparent;
  }

  .purchase--btn {
    height: 55px;
    background: #f2f2f2;
    border-radius: 11px;
    border: 0;
    outline: none;
    color: #ffffff;
    font-size: 15px;
    font-weight: 700;
    background: linear-gradient(180deg, #363636 0%, #1b1b1b 50%, #000000 100%);
    box-shadow: 0px 0px 0px 0px #ffffff, 0px 0px 0px 0px #000000;
    transition: all 0.3s cubic-bezier(0.15, 0.83, 0.66, 1);
  }

  .purchase--btn:hover {
    box-shadow: 0px 0px 0px 2px #ffffff, 0px 0px 0px 4px #0000003a;
  }

  /* Reset input number styles */
  .input_field::-webkit-outer-spin-button,
  .input_field::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .input_field[type="number"] {
    -moz-appearance: textfield;
  }
`;

export default FormMethodPay;
