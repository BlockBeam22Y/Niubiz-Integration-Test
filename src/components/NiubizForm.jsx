import { useEffect } from 'react';

function NiubizForm({ sessionToken, cart }) {
    useEffect(() => {
        const script = document.createElement('script');

        script.type = 'text/javascript';
        script.src = import.meta.env.VITE_NIUBIZ_FORM_SCRIPT;
        script.async = true;

        script.dataset.sessiontoken = sessionToken;
        script.dataset.channel = 'web';
        script.dataset.merchantid = `${import.meta.env.VITE_NIUBIZ_MERCHANT_ID}`;
        script.dataset.purchasenumber = cart.id;
        script.dataset.amount = cart.totalPrice;
        script.dataset.expirationminutes = 20;
        script.dataset.timeouturl = '/';
        script.dataset.merchantlogo = 'https://client.depilzone.net/assets/images/logos/Logo-Depilzone-2.png';
        script.dataset.formbuttoncolor = '#000000';

        const niubizForm = document.getElementById('niubiz-form');
        niubizForm.appendChild(script);
    }, []);

    return (
        <form
            id='niubiz-form'
            action={`${import.meta.env.VITE_API_URL}/api/v1/checkout/authorize/${cart.id}`}
            method='post'
        />
    );
}

export default NiubizForm;