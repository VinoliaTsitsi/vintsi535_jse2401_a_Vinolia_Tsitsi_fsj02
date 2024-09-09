export async functionProducts(page = 1, linit = 20) {
    const response = await fetch(`https://next-ecommerce-api.vercel.app/products?_page=${page}&_limit=${limit}`); 
    if (!response.ok) throw new Error ('Failed to fetch products')
        return response.json(); 
}   

