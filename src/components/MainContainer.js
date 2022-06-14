import React, {useState, useEffect}from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {

  const [stocks, setStocks] = useState([])
  const [myStocks, setMyStocks] = useState([])
  
  useEffect(() => {
    fetch('http://localhost:3001/stocks')
    .then(response => response.json())
    .then(data => setStocks(data))
  }, [])

  const buyStock = (stock) => {
    if(!myStocks.includes(stock)){
      const updatedMyStocks = [...myStocks, stock]
      setMyStocks(updatedMyStocks)
    }
    else {
      alert('you already have it!')
    }
  } 

  const sellStock = (stock) => {
    const updatedMyStocks = [...myStocks].filter(myStock => myStock.id !== stock.id)
    setMyStocks(updatedMyStocks)
  }

  return (
    <div>
      <SearchBar />
      <div className="row">
        <div className="col-8">
          <StockContainer 
          stocks = {stocks} 
          handleClick = {buyStock}/>
        </div>
        <div className="col-4">
          <PortfolioContainer 
          stocks = {myStocks} 
          handleClick = {sellStock}/>
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
