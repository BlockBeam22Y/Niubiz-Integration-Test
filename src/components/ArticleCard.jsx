function ArticleCard({ article, handleCart }) {
  return (
    <div className="flex flex-col justify-between w-full border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-semibold text-gray-800">{article.name}</h2>
          <div className="flex flex-col items-end">
            {article.onDiscount ? (
              <>
                <span className="text-lg font-bold text-green-600">
                  S/{article.discountPrice}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  S/{article.price}
                </span>
              </>
            ) : (
              <span className="text-lg font-medium">S/{article.price}</span>
            )}
          </div>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-2">{article.description}</p>
      </div>

      <button
        className="bg-blue-100 text-blue-700 py-2 px-4 hover:bg-blue-200 transition-colors font-medium"
        onClick={() => handleCart(article)}
      >
        Añadir al carrito
      </button>
    </div>
  );
}

export default ArticleCard;