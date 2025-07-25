function DuplicateModal({ handleLinkCart, handleDeleteCurrentCart }) {
    return (
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full relative border border-gray-100">
  <div className="flex flex-col items-center text-center space-y-5">
    {/* Icono de advertencia */}
    <div className="bg-blue-100 p-3.5 rounded-full">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-10 w-10 text-blue-600" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
        />
      </svg>
    </div>

    {/* Texto */}
    <div className="space-y-2">
      <h3 className="text-2xl font-bold text-gray-900">Tienes un carrito activo</h3>
      <p className="text-gray-600 text-lg">
        Al iniciar sesión, encontramos productos guardados anteriormente en tu cuenta.
      </p>
    </div>

    {/* Botones */}
    <div className="flex flex-col w-full space-y-3 pt-2">
      <button
        onClick={handleLinkCart}
        className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 shadow-sm group"
      >
        <span className="block font-semibold">Usar carrito actual</span>
      </button>
      
      <button
        onClick={handleDeleteCurrentCart}
        className="w-full px-6 py-3 bg-gray-50 hover:bg-gray-100 text-gray-800 font-medium rounded-lg transition-all duration-200 border border-gray-200 group"
      >
        <span className="block font-semibold">Recuperar carrito guardado</span>
      </button>
    </div>
  </div>
</div>
    );
}

export default DuplicateModal;