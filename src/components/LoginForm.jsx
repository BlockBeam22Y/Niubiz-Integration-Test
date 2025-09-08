import { useContext, useState } from 'react';
import { CartCtx, CustomerCtx } from '../App';

import DuplicateModal from '../components/DuplicateModal';

function LoginForm({ setCustomer, setModal, loadCart }) {
    const [nDni, setNDni] = useState('');
    const [password, setPassword] = useState('');
    
    const customer = useContext(CustomerCtx());
    const cart = useContext(CartCtx());
    
    const handleLinkCart = (customer) => {
        fetch(`${import.meta.env.VITE_API_URL}/api/v1/cart/${cart.id}/customer`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                customerId: customer.id,
            }),
        })
            .then(() => {
                loadCart(cart);
                setModal(null);
            });
    };

    const handleDeleteCurrentCart = (savedCart) => {
        console.log(savedCart)
        fetch(`${import.meta.env.VITE_API_URL}/api/v1/cart/${cart.id}`, {
            method: 'DELETE'
        })
            .then(() => {
                loadCart(savedCart);
                setModal(null);
            });
    };
            
    const handleDuplicateCarts = (savedCart, customer) => {
        if (cart) {
            if (savedCart)
                setModal(
                    <DuplicateModal
                        handleLinkCart={
                            () => handleLinkCart(customer)
                        }
                        handleDeleteCurrentCart={
                            () => handleDeleteCurrentCart(savedCart)
                        }
                    />
                );
            else
                handleLinkCart(customer);
        } else
            loadCart(savedCart);
    }
    
    const handleLogin = (nDni, password) => {
        fetch(`${import.meta.env.VITE_API_URL}/api/v1/customers/${nDni}`)
            .then(res => {
                if (!res.ok)
                    throw new Error('Something went wrong!');

                return res.json();
            })
            .then(data => {
                setCustomer(data);
                handleDuplicateCarts(data.cart, data);
            })
    };

    return (
        customer ? (
            <div className="w-72 p-2 bg-blue-50 rounded-lg">
                <span className="font-medium">Bienvenido, </span>
                <span className="text-blue-600 font-semibold">{customer.name}</span>
            </div>
        ) : (
            <div className="w-72 flex flex-col items-center gap-3 w-64 mx-auto p-4 bg-white rounded-lg shadow-sm">
                <h2 className="text-xl font-bold text-gray-800">¿Ya eres cliente?</h2>

                <input 
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="DNI"
                    type="text"
                    value={nDni}
                    onChange={(event) => setNDni(event.target.value)}
                />

                <input 
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Contraseña"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />

                <button
                    onClick={() => handleLogin(nDni, password)}
                    className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                    Iniciar sesión
                </button>
                </div>
        )
    );
}

export default LoginForm;