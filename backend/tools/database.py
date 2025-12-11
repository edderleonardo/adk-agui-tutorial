"""
Database Tools - Simulan acceso a base de datos
En producción, conectarías a PostgreSQL, MongoDB, etc.
"""
from typing import Annotated, Optional


# Simulated product database
PRODUCTS_DB = [
    {
        "id": "prod_001",
        "name": "Wireless Headphones Pro",
        "price": 149.99,
        "category": "electronics",
        "rating": 4.5,
        "in_stock": True,
        "description": "Premium wireless headphones with noise cancellation"
    },
    {
        "id": "prod_002",
        "name": "Mechanical Keyboard RGB",
        "price": 89.99,
        "category": "electronics",
        "rating": 4.8,
        "in_stock": True,
        "description": "Mechanical gaming keyboard with RGB lighting"
    },
    {
        "id": "prod_003",
        "name": "Ergonomic Mouse",
        "price": 59.99,
        "category": "electronics",
        "rating": 4.2,
        "in_stock": False,
        "description": "Ergonomic wireless mouse for comfortable use"
    },
    {
        "id": "prod_004",
        "name": "4K Monitor 27 inch",
        "price": 399.99,
        "category": "electronics",
        "rating": 4.7,
        "in_stock": True,
        "description": "27 inch 4K UHD monitor for professionals"
    },
    {
        "id": "prod_005",
        "name": "USB-C Hub",
        "price": 49.99,
        "category": "accessories",
        "rating": 4.3,
        "in_stock": True,
        "description": "Multi-port USB-C hub with HDMI and SD card reader"
    }
]


def search_products(
        query: Annotated[str, "Search query for products"],
        category: Annotated[Optional[str], "Filter by category"] = None,
        max_price: Annotated[Optional[float], "Maximum price filter"] = None,
        in_stock_only: Annotated[bool, "Only show in-stock items"] = False
) -> dict:
    """
    Search products in the database with optional filters.
    Returns matching products based on query and filters.
    """
    results = []
    query_lower = query.lower()

    for product in PRODUCTS_DB:
        # Text search in name and description
        if (query_lower in product["name"].lower() or
                query_lower in product["description"].lower()):

            # Apply filters
            if category and product["category"] != category:
                continue
            if max_price and product["price"] > max_price:
                continue
            if in_stock_only and not product["in_stock"]:
                continue

            results.append(product)

    return {
        "query": query,
        "filters_applied": {
            "category": category,
            "max_price": max_price,
            "in_stock_only": in_stock_only
        },
        "total_results": len(results),
        "products": results
    }


def get_product_details(
        product_id: Annotated[str, "The product ID to get details for"]
) -> dict:
    """
    Get detailed information about a specific product.
    """
    for product in PRODUCTS_DB:
        if product["id"] == product_id:
            # Add extra details for single product view
            return {
                **product,
                "reviews_count": 150,
                "warranty": "2 years",
                "shipping": "Free shipping on orders over $50"
            }

    return {
        "error": f"Product not found: {product_id}",
        "available_ids": [p["id"] for p in PRODUCTS_DB]
    }