/**
 * Success Component
 *
 * This React functional component displays a confirmation message after a successful action,
 * such as confirming a shipment. It informs the user about the expected delivery timeframe.
 *
 * @component
 * @example
 * return (
 *     <Success />
 * )
 */

import React from 'react';

const Success = () => {
    return (
        <div className="success-container">
            <h2>Shipment Confirmed!</h2>
            <p>
                Thank you for using this platform to make the environment better. Your shipment would arrive in 5 to 10
                business days.
            </p>
        </div>
    );
};

export default Success;