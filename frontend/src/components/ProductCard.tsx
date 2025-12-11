/**
 * ProductCard Component
 * Renders product search results from backend
 */
import React from "react";

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  rating: number;
  in_stock: boolean;
  description: string;
}

interface ProductSearchResult {
  query: string;
  total_results: number;
  products: Product[];
}

interface ProductCardProps {
  data?: ProductSearchResult;
  query?: string;
}

// Star rating component
function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <span key={i} className="text-yellow-400">
          {i < fullStars ? "★" : i === fullStars && hasHalfStar ? "★" : "☆"}
        </span>
      ))}
      <span className="text-gray-500 text-sm ml-1">({rating})</span>
    </div>
  );
}

export function ProductCard({ data, query }: ProductCardProps) {
  // Loading state
  if (!data || !data.products) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-48 mb-4"></div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-gray-100 rounded"></div>
          ))}
        </div>
        <p className="mt-4 text-gray-400">Searching for "{query}"...</p>
      </div>
    );
  }

  // No results
  if (data.products.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 text-center">
        <p className="text-6xl mb-4">🔍</p>
        <p className="text-gray-600">
          No products found for "{data.query}"
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Search Results
        </h3>
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
          {data.total_results} found
        </span>
      </div>

      {/* Products List */}
      <div className="space-y-4">
        {data.products.map((product) => (
          <div
            key={product.id}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{product.name}</h4>
                <p className="text-sm text-gray-500 mt-1">
                  {product.description}
                </p>
                <div className="mt-2">
                  <StarRating rating={product.rating} />
                </div>
              </div>
              <div className="text-right ml-4">
                <p className="text-xl font-bold text-green-600">
                  ${product.price}
                </p>
                <span
                  className={`text-sm px-2 py-1 rounded ${
                    product.in_stock
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {product.in_stock ? "In Stock" : "Out of Stock"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


/**
 * ProductDetailCard Component
 * Renders single product details
 */
interface ProductDetail extends Product {
  reviews_count: number;
  warranty: string;
  shipping: string;
}

interface ProductDetailCardProps {
  data?: ProductDetail;
  productId?: string;
}

export function ProductDetailCard({ data, productId }: ProductDetailCardProps) {
  if (!data) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-64 mb-4"></div>
        <div className="h-4 bg-gray-100 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-100 rounded w-3/4"></div>
        <p className="mt-4 text-gray-400">Loading product {productId}...</p>
      </div>
    );
  }

  // Error state
  if ('error' in data) {
    return (
      <div className="bg-red-50 rounded-xl shadow-lg p-6 text-center">
        <p className="text-6xl mb-4">❌</p>
        <p className="text-red-600">{(data as any).error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-6 text-white">
        <h2 className="text-2xl font-bold">{data.name}</h2>
        <p className="opacity-90 capitalize">{data.category}</p>
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-gray-600 mb-4">{data.description}</p>

        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-3xl font-bold text-green-600">${data.price}</p>
            <StarRating rating={data.rating} />
            <p className="text-sm text-gray-500 mt-1">
              {data.reviews_count} reviews
            </p>
          </div>
          <span
            className={`px-4 py-2 rounded-lg text-lg font-medium ${
              data.in_stock
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {data.in_stock ? "✓ In Stock" : "✗ Out of Stock"}
          </span>
        </div>

        {/* Extra details */}
        <div className="grid grid-cols-2 gap-4 border-t pt-4">
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-500">Warranty</p>
            <p className="font-medium">{data.warranty}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-500">Shipping</p>
            <p className="font-medium">{data.shipping}</p>
          </div>
        </div>
      </div>
    </div>
  );
}