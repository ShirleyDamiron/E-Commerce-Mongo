import React from 'react'

function Products(props) {
    let products
    if (props.filteredProducts.length > 0) {
      products = props.filteredProducts
    } else {
      products = props.products
    }
    return(
        <>
      <h1>Plaid Me</h1>
      <h2>The New Set Of Vinatge Fashion</h2>
      <h3>Filter Your Choice Down Below!</h3>
      {/* filter of type */}
      <div className="filter-container">
        <select id="filter" className="filterType" onChange={props.filterProductsFunc}>
          <option value="none">Filter By Type</option>
          <option value="Bottoms">Bottoms</option>
          <option value="Overlay">Overlay</option>
          <option value="Shoes">Shoes</option>
          <option value="Dresses">Dresses</option>
          <option value="Skirts">Skirts</option>
        </select>
        {/* filter of price */}
        <select className="filterPrice" onChange={props.filterProductsFunc}>
          <option value="none">Filter By Price</option>
          <option value="high">Highest to Lowest</option>
          <option value="low">Lowest to Highest</option>
        </select>
      </div>
      

      <div className="products-container">
        {products.map(product => {
          return (
            <figure className="image-container">
            <img
              src={product.IMG_SRC}
              alt={product.Product_Name}
            />
            {/* text under each image */}
            <figcaption>
             {product.Product_Name}
            </figcaption>
            <p>${product.Price}</p>
          </figure>
          )
        })}
      </div>
      </>
    );
}

export default Products 