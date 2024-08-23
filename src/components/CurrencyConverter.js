import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CurrencyInput from './CurrencyInput';

const CurrencyConverter = () => {
    const [currencies, setCurrencies] = useState([]);
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('EUR');
    const [exchangeRate, setExchangeRate] = useState(1);
    const [amount, setAmount] = useState(1);
    const [convertedAmount, setConvertedAmount] = useState(1);

    useEffect(() => {
        axios.get('http://api.exchangeratesapi.io/v1/latest?access_key=783473e37857dbcda0cc0d526e2b5608')

            .then(response => {
                const currencyList = Object.keys(response.data.rates);
                setCurrencies(currencyList);
                setExchangeRate(response.data.rates[toCurrency]);
            })
            .catch(error => {
                console.error('Error fetching exchange rates', error);
            });
    }, [toCurrency]);

    useEffect(() => {
        setConvertedAmount((amount * exchangeRate).toFixed(2));
    }, [amount, exchangeRate]);

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

    const handleFromCurrencyChange = (e) => {
        setFromCurrency(e.target.value);
    };

    const handleToCurrencyChange = (e) => {
        setToCurrency(e.target.value);
        axios.get(`https://api.exchangeratesapi.io/latest?base=${fromCurrency}&symbols=${e.target.value}`)
            .then(response => {
                setExchangeRate(response.data.rates[e.target.value]);
            })
            .catch(error => {
                console.error('Error fetching exchange rate', error);
            });
    };

    return (
        <div>
            <CurrencyInput
                currencies={currencies}
                selectedCurrency={fromCurrency}
                onCurrencyChange={handleFromCurrencyChange}
                onAmountChange={handleAmountChange}
                amount={amount}
            />
            <h2>=</h2>
            <CurrencyInput
                currencies={currencies}
                selectedCurrency={toCurrency}
                onCurrencyChange={handleToCurrencyChange}
                amount={convertedAmount}
                readOnly
            />
        </div>
    );
};

export default CurrencyConverter;
