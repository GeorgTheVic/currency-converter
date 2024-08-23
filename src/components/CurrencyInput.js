import React from 'react';

const CurrencyInput = ({ currencies, selectedCurrency, onCurrencyChange, onAmountChange, amount, readOnly }) => {
    return (
        <div>
            <input
                type="number"
                value={amount}
                onChange={onAmountChange}
                readOnly={readOnly}
            />
            <select value={selectedCurrency} onChange={onCurrencyChange}>
                {currencies.map((currency, index) => (
                    <option key={index} value={currency}>
                        {currency}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CurrencyInput;
