import React from 'react';

const Orders = ({ orders, products, lineItems, users })=> {
  const makeVip = (orders, users) =>{
    for( let i = 0; i < orders.length; i++)
    { const order = orders[i];
      const user = users.find((user)=> user.id === orders.user.id);
        if(user && orders.length >= 10){
          user.is_vip = true;
        } 
   }
  };
    
  
  return (
    <div>
      <h2>Orders</h2>
      <ul>
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
