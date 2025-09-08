import { useContext, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import NiubizForm from '../components/NiubizForm';
import PaymentModal from '../components/PaymentModal';
import { CustomerCtx, CartCtx } from '../App';
import CheckoutForm from '../components/CheckoutForm';
import LoginForm from '../components/LoginForm';

function Checkout({ setCustomer, loadCart }) {
    const [sessionToken, setSessionToken] = useState(null);

    const [searchParams, setSearchParams] = useSearchParams();
    const [modal, setModal] = useState(null);
    
    const customer = useContext(CustomerCtx());
    const cart = useContext(CartCtx());

    const navigate = useNavigate();

    const closeModal = () => {
      setSearchParams({});
      setModal(null);
    }

    useEffect(() => {
        if (!cart) {
          navigate('/');
          return;
        }

        fetch(`${import.meta.env.VITE_API_URL}/api/v1/checkout/access`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              cartId: cart.id
            }),
        })
            .then(() => loadCart(cart))
    }, []);

    useEffect(() => {
      if (searchParams.get('error'))
        setModal(
          <PaymentModal closeModal={closeModal} />
        );
    }, [searchParams]);

    const handleSessionToken = (formData) => {
        fetch(`${import.meta.env.VITE_API_URL}/api/v1/checkout/session`, {
            method: 'POST',
            headers: {
                'Authorization': cart.accessToken,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...formData,
                isGuest: !customer,
                cartId: cart.id,
            }),
        })
            .then(res => res.json())
            .then(data => setSessionToken(data.sessionKey));
    };

    return (
      <div className="flex p-8 gap-4">
        {
          modal && (
            <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
                <div className='w-full h-full absolute bg-black opacity-50'/>
                {modal}
            </div>
          )
        }

        <div className='flex flex-col gap-4'>
          <LoginForm setCustomer={setCustomer} setModal={setModal} loadCart={loadCart} />
        </div>

        <div className='flex-grow'>
          {cart && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h1 className="text-2xl font-bold mb-4 text-gray-800">Carrito de Compras</h1>

              <div className='flex flex-col items-center'>
                {cart && cart.accessToken && (
                  <div className="w-128 mb-2 p-2 bg-gray-100 rounded overflow-hidden">
                    <p className="text-xs text-gray-500 truncate">Access token: {cart.accessToken}</p>
                  </div>
                )}

                {sessionToken && (
                  <div className="w-64 mb-4 p-2 bg-gray-100 rounded overflow-hidden">
                    <p className="text-xs text-gray-500 truncate">Session token: {sessionToken}</p>
                  </div>
                )}
              </div>
              
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-700">Total:</h2>
                <span className="text-2xl font-bold text-green-600">S/{cart.totalPrice}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {cart.cartItems.map(item => (
                  <div 
                    key={item.id} 
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <h3 className="font-medium text-gray-800 mb-1">{item.article.name}</h3>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-green-600">
                        ${item.article.discountPrice || item.article.price}
                      </span>
                      <span className="bg-gray-100 px-2 py-1 rounded-full text-sm">
                        x{item.amount}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col items-center gap-4">
                <CheckoutForm sessionToken={sessionToken} handleSessionToken={handleSessionToken} />
                
                {sessionToken && (
                  <NiubizForm
                    sessionToken={sessionToken}
                    cart={cart}
                    className="w-full"
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
}

export default Checkout;