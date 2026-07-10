import React from 'react';
import './Menu.css';

function Menu() {
  const menuData = {
    starters: [
      {
        name: 'Bruschetta',
        description: 'Fresh tomatoes, basil, olive oil, and toasted baguette slices',
        price: '$8.50'
      },
      {
        name: 'Caesar Salad',
        description: 'Crisp romaine with homemade Caesar dressing',
        price: '$9.00'
      }
    ],
    mainCourses: [
      {
        name: 'Grilled Salmon',
        description: 'Served with lemon butter sauce and seasonal vegetables',
        price: '$22.00'
      },
      {
        name: 'Ribeye Steak',
        description: '12 oz prime cut with garlic mashed potatoes',
        price: '$28.00'
      },
      {
        name: 'Vegetable Risotto',
        description: 'Creamy Arborio rice with wild mushrooms',
        price: '$18.00'
      }
    ],
    desserts: [
      {
        name: 'Tiramisu',
        description: 'Classic Italian dessert with mascarpone',
        price: '$7.50'
      },
      {
        name: 'Cheesecake',
        description: 'Creamy cheesecake with berry compote',
        price: '$7.00'
      }
    ],
    beverages: [
      {
        name: 'Red Wine (Glass)',
        description: 'A selection of Italian reds',
        price: '$10.00'
      },
      {
        name: 'White Wine (Glass)',
        description: 'Crisp and refreshing',
        price: '$9.00'
      },
      {
        name: 'Craft Beer',
        description: 'Local artisan brews',
        price: '$6.00'
      },
      {
        name: 'Espresso',
        description: 'Strong and aromatic',
        price: '$3.00'
      }
    ]
  };

  const MenuCategory = ({ title, items }) => (
    <div className="menu-category">
      <h2>{title}</h2>
      {items.map((item, index) => (
        <div key={index} className="menu-item">
          <div className="item-header">
            <h3>{item.name}</h3>
            <span className="price">{item.price}</span>
          </div>
          <p className="description">{item.description}</p>
        </div>
      ))}
    </div>
  );

  return (
    <div className="menu-container">
      <h1>Our Menu</h1>
      <MenuCategory title="Starters" items={menuData.starters} />
      <MenuCategory title="Main Courses" items={menuData.mainCourses} />
      <MenuCategory title="Desserts" items={menuData.desserts} />
      <MenuCategory title="Beverages" items={menuData.beverages} />
    </div>
  );
}

export default Menu;
