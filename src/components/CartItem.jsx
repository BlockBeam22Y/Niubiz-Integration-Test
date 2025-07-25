function CartItem({ item, handleCart, handleDeleteItem }) {
  return (
    <div className="flex flex-col gap-2 items-center border rounded-lg p-3 w-full bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className='w-full flex justify-between'>
        <h3 className="text-md font-medium text-center text-nowrap">
          {item.article.name}
        </h3>

        <p className="text-lg font-semibold text-green-600">
          S/{item.article.discountPrice}
        </p>
      </div>

      <div className='w-full flex justify-between'>
        <div className="flex items-center justify-center border rounded-md overflow-hidden">
          <button
            className="px-2 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
            onClick={() => handleCart(item.article, -1)}
            disabled={item.amount <= 1}
          >
            -
          </button>

          <span className="w-8 text-center px-2 py-1">
            {item.amount}
          </span>

          <button
            className="px-2 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
            onClick={() => handleCart(item.article, 1)}
          >
            +
          </button>
        </div>

        <button 
          className="self-end px-2 py-1 text-xs text-red-600 hover:text-red-800 transition-colors"
          onClick={() => handleDeleteItem(item)}
        >
          Quitar
        </button>
      </div>
    </div>
  );
}

export default CartItem;