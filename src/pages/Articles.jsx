import { useContext, useEffect, useState } from 'react';
import ArticleCard from '../components/ArticleCard';
import CartItem from '../components/CartItem';
import { useNavigate } from 'react-router';
import LoginForm from '../components/LoginForm';
import { CartContext, CustomerContext } from '../App';

function Articles({ setCustomer, loadCart }) {
    const [articles, setArticles] = useState([]);
    const [modal, setModal] = useState(null);

    const navigate = useNavigate();

    const customer = useContext(CustomerContext);
    const cart = useContext(CartContext);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/v1/articles`)
            .then(res => res.json())
            .then(data => setArticles(data));
    }, []);

    const handleCart = (article, amount = 1) => {
        if (cart) {
            const existingItem = cart.cartItems.find(item => item.article.id === article.id);

            fetch(`${import.meta.env.VITE_API_URL}/api/v1/cart/${cart.id}/items`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    existingItem ? (
                        {
                            articleId: article.id,
                            amount: existingItem.amount + amount,
                        }
                    ) : (
                        {
                            articleId: article.id,
                            amount,
                        }
                    )
                ),
            })
                .then(() => loadCart(cart));
        } else
            fetch(`${import.meta.env.VITE_API_URL}/api/v1/cart`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    customer ? (
                        {
                            customerId: customer.id,
                            cartItem: {
                                articleId: article.id,
                                amount,
                            },
                        }
                    ) : (
                        {
                            cartItem: {
                                articleId: article.id,
                                amount,
                            },
                        }
                    )
                ),
            })
                .then(res => res.json())
                .then(data => loadCart(data));
    };

    const handleDeleteItem = (item) => {
        fetch(`${import.meta.env.VITE_API_URL}/api/v1/cart/${cart.id}/items/${item.article.id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                if (data.totalPrice > 0)
                    loadCart(cart);
                else
                    loadCart(null);
            });
    }
    
    const handleDeleteCart = () => {
        fetch(`${import.meta.env.VITE_API_URL}/api/v1/cart/${cart.id}`, {
            method: 'DELETE',
        })
            .then(loadCart(null));
    }
    
    return (
        <div className="flex p-8 gap-4">
            {
                modal && (
                    <div className='fixed inset-0 flex items-center justify-center z-50 p-4'>
                        <div className='w-full h-full absolute bg-black opacity-50'/>
                        {modal}
                    </div>
                )
            }

            <div className='flex flex-col gap-4'>
                <LoginForm setCustomer={setCustomer} setModal={setModal} loadCart={loadCart} />

                {
                    cart && (
                        <div className="w-72 flex flex-col gap-2 p-4 border rounded-lg shadow-sm bg-gray-50">
                            <h2 className="text-xl font-semibold text-gray-700">Tu Carrito</h2>
                            <h3 className="text-lg font-medium">
                                Precio total: <span className="text-green-600">S/{cart.totalPrice}</span>
                            </h3>

                            <div className="space-x-3 space-y-3 mb-4 flex flex-col">
                                {cart.cartItems?.map(item => (
                                    <CartItem
                                    key={item.id}
                                    item={item}
                                    handleCart={handleCart}
                                    handleDeleteItem={handleDeleteItem}
                                    />
                                ))}
                            </div>

                            <button
                                className="w-full px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
                                onClick={handleDeleteCart}
                                >
                                Vaciar Carrito
                            </button>
                            <button
                                className="w-full px-4 py-2 bg-green-100 text-green-700 rounded hover:bg-green-200 transition"
                                onClick={() => navigate(`/checkout`)}
                                >
                                Finalizar Compra
                            </button>
                        </div>
                )}
            </div>

            <div className='flex-grow'>
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Artículos</h1>

                <div className="grid grid-cols-3 gap-4 mb-8">
                    {
                        articles.map(article => (
                            <ArticleCard
                            key={article.id}
                            article={article}
                            handleCart={handleCart}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default Articles;