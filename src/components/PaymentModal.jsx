function PaymentModal({ closeModal }) {
    return (
        <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full relative">
            <button
                onClick={closeModal}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="Cerrar"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            
            <div className="flex flex-col items-center text-center space-y-4">
                <div className="bg-red-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Error en el pago</h3>
                <p className="text-gray-600">Algo salió mal con el pago, vuelve a intentarlo</p>
                <button
                onClick={closeModal}
                className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                Entendido
                </button>
            </div>
        </div>
    );
}

export default PaymentModal;