import { useContext, useEffect, useState } from 'react';
import { CartCtx, CustomerCtx } from '../App';

function CheckoutForm({ sessionToken, handleSessionToken }) {
    const [formData, setFormData] = useState({
        email: '',
        nDni: '',
        address: '',
        phone: '',
    });

    const cart = useContext(CartCtx());
    const customer = useContext(CustomerCtx());

    useEffect(() => {
        if (!customer) return;

        setFormData({
            email: customer.email,
            nDni: customer.nDni,
            address: customer.address,
            phone: customer.phone,
        });
    }, [customer]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <div className='flex flex-col items-center gap-2'>
            <h2 className="text-xl font-bold text-gray-800">Información del Cliente</h2>

            <div className='w-full flex gap-2'>
                <input
                    className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    placeholder='Email'
                    name='email'
                    value={formData.email}
                    onChange={handleInputChange}
                /> 
            </div>
            <div className='w-full flex gap-2'>
                <input
                    className='w-36 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    placeholder='DNI'
                    name='nDni'
                    value={formData.nDni}
                    onChange={handleInputChange}
                /> 
                <input
                    className='w-36 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    placeholder='Celular'
                    name='phone'
                    value={formData.phone}
                    onChange={handleInputChange}
                />
            </div>
            <div className='w-full flex gap-2'>
                <input
                    className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    placeholder='Dirección'
                    name='address'
                    value={formData.address}
                    onChange={handleInputChange}
                />
            </div>
            
            {cart.accessToken && !sessionToken && (
                <button
                    disabled={Object.values(formData).some(el => !el)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                    onClick={() => handleSessionToken(formData)}
                >
                  Proceder al Pago
                </button>
            )}
        </div>
    );
}

export default CheckoutForm;