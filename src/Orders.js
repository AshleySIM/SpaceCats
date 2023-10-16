import React from 'react';

const Orders = ({ orders, products, lineItems })=> {
  const makeVip = (orders) =>{
    for( let i = 0; i < orders.length; i++)
    { if(orders.length >= 10){
      orders.is_vip = true;
    } 
   }
  };
    console.log(orders.is_vip)
  
  return (
    <div className='ordersDiv'>
      <h2>Orders</h2>
      <ul className='ordersList'>
        {
          orders.filter(order => !order.is_cart).map( order => {
            const orderLineItems = lineItems.filter(lineItem => lineItem.order_id === order.id);
            return (
              <li key={ order.id }>
                ({ new Date(order.created_at).toLocaleString() })
                <ul>
                  {
                    orderLineItems.map( lineItem => {
                      const product = products.find(product => product.id === lineItem.product_id);
                      return (
                        <li key={ lineItem.id }>
                          { product ? product.name: '' }
                        </li>
                      );
                    })
                  }
                </ul>
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};

export default Orders;
