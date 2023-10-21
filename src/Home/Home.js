import './Home.css';
import { useState, useEffect } from 'react';
import ProductDetails from '../ProductDetails/ProductDetails';

function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoriesList, setCategoriesList] = useState([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  
  const [scrollPosition, setScrollPosition] = useState(0);

  

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [searchQuery, products, activeCategory]);

  useEffect(() => {
    
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    
    if (scrollPosition >= document.body.scrollHeight - window.innerHeight - 100 && !isLoadingMore && activeCategory === null) {
      setIsLoadingMore(true);
      
      setTimeout(() => {
        loadMoreProducts();
        setIsLoadingMore(false);
        
      }, 1000); 
    }
  }, [scrollPosition, isLoadingMore]);

  

  const fetchData = () => {
    fetch('https://dummyjson.com/products')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data.products);
        const categories = [...new Set(data.products.map((product) => product.category))];
        setCategories(categories);
        filterProducts();
      })
      .catch((error) => {
        console.error('Error fetching data from the API:', error);
      });
  };

  const setCategories = (categories) => {
    setActiveCategory(null);
    setCategoriesList(categories);
  };

  const handleCategoryFilter = (category) => {
    setActiveCategory(category);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const closeProductDetails = () => {
    setSelectedProduct(null);
  };

  const filterProducts = () => {
    let filtered = [...products];

    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (activeCategory) {
      filtered = filtered.filter((product) => product.category === activeCategory);
    }

    setFilteredProducts(filtered.slice(0, 18)); 
  };

  const loadMoreProducts = () => {
    
    const currentCount = filteredProducts.length;

    const allCategoryProducts = products.filter((product) => !activeCategory || product.category === activeCategory);
    setFilteredProducts([...filteredProducts, ...allCategoryProducts.slice(currentCount, currentCount + 18)]);
  };

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top nav3">
        <div className='navd'>
        <a className="navbar-brand" href="/">E-Commerce Store</a>
      <button className={null===activeCategory ?'btn btn-light' : 'btn btn-secondary'} onClick={() => handleCategoryFilter(null)}>All</button>
      {categoriesList.map((category) => (
        <button className={category===activeCategory ?'btn btn-light nav-item active' : 'btn btn-secondary nav-item active'} key={category} onClick={() => handleCategoryFilter(category)}>
          {category}
        </button>
      ))}
      <input
          type="search"
          placeholder="Search Products"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        </div>
      
    </nav>
      <header className="header">
        
      </header>
      <ul className='list'>
        {filteredProducts.map((product) => (
          <li key={product.id} className='iteam'>
            <img
              src={product.thumbnail}
              className="productImage"
              alt={product.title}
              onClick={() => handleProductClick(product)}
            />
            <div className='priceCont'>
            <p>{product.title}</p>
            <p>Price: ${product.price}</p>
            </div>
            <p className='discrip'>{product.description}</p>
            
          </li>
        ))}
      </ul>
      {selectedProduct && <ProductDetails product={selectedProduct} onClose={closeProductDetails} />}
    </div>
  );
}

export default Home