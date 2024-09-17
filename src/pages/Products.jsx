import { useState , useEffect, useContext } from 'react'
import { Badge, Button, Pagination } from 'antd'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { CartContext } from '../context/CartContext'
import { Menu, X } from 'react-feather'; 
// import { IoMdCart } from "react-icons/io";

function Products() {
  const [products, setProducts] = useState([])
  const [limit, setLimit] = useState(20)
  const [skip, setSkip] = useState(0)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)

  // Added state for search, category, and price range
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState(''); // Predefined price range
  const [isOpen, setIsOpen] = useState(false);

  const {cartItems , addItemToCart , isItemAdded} = useContext(CartContext)

  console.log("cartItems==>", cartItems);

  // Fetch products from DummyJSON API
  useEffect(() => {
    setLoading(true)
    fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`)
      .then(res => res.json())
      .then((res) => {
        console.log("response==>", res);
        // console.log("response==>", products.category);
        setProducts(res.products)
        setTotal(res.total)
        setLoading(false)
      });
  }, [limit, skip])

  // Function to get price range from dropdown selection
  const getPriceRange = (range) => {
    switch (range) {
      case '0-20':
      return [0, 20];
    case '0-40':
      return [0, 40];
      case '0-50':
        return [0, 50];
      case '50-100':
        return [50, 100];
      case '100-200':
        return [100, 200];
      case '200+':
        return [200, Infinity];
      default:
        return [0, Infinity];
    }
  }

  // Filtering logic for search, category, and price range
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || product.category === selectedCategory;
    const [minPrice, maxPrice] = getPriceRange(selectedPriceRange);
    const matchesPriceRange = product.price >= minPrice && product.price <= maxPrice;
    return matchesSearch && matchesCategory && matchesPriceRange;
  });

  return (
    <div className='p-6 container mx-auto'>
    
      {/* navbar ka kaam */}
      <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50 ">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-purple-600">
          E-commerce
        </Link>

        {/* Menu Icon for Mobile */}
        <div className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6 text-purple-600" /> : <Menu className="w-6 h-6 text-purple-600" />}
        </div>

        {/* Navigation Links */}
        <div className={`md:flex items-center space-x-4 ${isOpen ?  'block' : 'hidden'}`}>
          <Link to="/" className="text-gray-700 hover:text-purple-600 transition">Home</Link>
          <Link to="/about" className="text-gray-700 hover:text-purple-600 transition">About</Link>
          <Link to="/products" className="text-gray-700 hover:text-purple-600 transition">Products</Link>
          <Link to="/contact" className="text-gray-700 hover:text-purple-600 transition">Contact</Link>
        </div>


        {/* Custom Cart Icon */}
        <div className="hidden md:flex">
        <Link to={'/cart'}>
          <Badge count={cartItems.length}>
            <ShoppingCartOutlined style={{fontSize : 25}}/>
          </Badge>
        </Link>
          
        </div>
      </div>
    </nav>
      {/* navbar ka kaam end */}

     
     
      {/* Added Search Input */}
      <div className="container mx-auto p-4 mt-10">
        {/* Search Box */}

        <div className="main flex items-center">
        <input
          type="text"
          
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-12 py-2 mx-2  mb-4"
        />

        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border px-12 py-2 mx-2  mb-4"
        >
          <option className='text-purple-600' value="">All Categories</option>
          <option className='text-purple-600' value="smartphones">Smartphones</option>
          <option className='text-purple-600' value="laptops">Laptops</option>
          <option className='text-purple-600' value="fragrances">Fragrances</option>
          <option className='text-purple-600' value="skincare">Skincare</option>
          <option className='text-purple-600' value="groceries">Groceries</option>
          <option className='text-purple-600' value="home Decoration">Home Decoration</option>
          <option className='text-purple-600' value="furniture">Furniture</option>
          <option className='text-purple-600' value="tops">Tops</option>
          <option className='text-purple-600' value="women's Dresses">Women's Dresses</option>
          <option className='text-purple-600' value="women's Shoes">Women's Shoes</option>
          <option className='text-purple-600'  value="men's Shoes">Men's Shoes</option>
          <option className='text-purple-600' value="men's Shirts">Men's Shirts</option>
          <option className='text-purple-600' value="men's Watches">Men's Watches</option>
          <option className='text-purple-600' value="women's Bags">Women's Bags</option>
          <option className='text-purple-600'  value="women's Jewellery">Women's Jewellery</option>
          <option className='text-purple-600' value="sunglasses">Sunglasses</option>
          <option className='text-purple-600' value="automotive">Automotive</option>
          <option className='text-purple-600' value="motorcycle">Motorcycle</option>
          <option className='text-purple-600' value="lighting">Lighting</option>
          {/* Add more categories if needed */}
        </select>

        {/* Price Range Filter */}
        <div className="mb-4">
          <label className='pr-2 pl-3 text-purple-600'>Price Range:</label>
          <select
            value={selectedPriceRange}
            onChange={(e) => setSelectedPriceRange(e.target.value)}
            className="border px-7 py-2 mx-2 mt-4  mb-4"
          >
            <option  value="">All Prices</option>
            <option className='text-purple-600' value="0-20">0 - 20</option>
            <option className='text-purple-600' value="0-40">0 - 40</option>
            <option className='text-purple-600' value="0-50">0 - 50</option>
            <option className='text-purple-600' value="50-100">50 - 100</option>
            <option className='text-purple-600' value="100-200">100 - 200</option>
            <option className='text-purple-600' value="200+">200+</option>
          </select>
        </div>
        </div>
        



        {/* Product Grid Display */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 my-10'>
          { loading ? <p className='text-center my-2'>Loading...</p> : null }
          {
            filteredProducts.map((data) => (
              <div key={data.id} className='border shadow items-center flex justify-center flex-col'>
                <img src={data.thumbnail} alt="product_image" height={200} width={200} />
                <div className='flex justify-between w-full p-2'>
                  <h1 className='font-semibold'>{data.title}</h1>
                  <h1 className='font-semibold'>{data.price}</h1>
                </div>

                <div>
                  <Button onClick={() => addItemToCart(data)}
                    className='w-full m-1 my-4 px-5 py-4 text-white bg-purple-500'>
                    {isItemAdded(data.id) ? `Added (${isItemAdded(data.id).quantity})` : `Add To Cart`}
                  </Button>
                </div>
              </div>
            ))
          }
        </div>

        {/* Pagination */}
        <Pagination
          onChange={(num) => setSkip((num - 1) * limit)}
          onShowSizeChange={(page, pageSize) => setLimit(pageSize)}
          defaultCurrent={1}
          total={total}
          pageSize={limit}
        />
      </div>
    </div>
  )
}

export default Products;
