import MenuItem from '../MenuItem/MenuItem'
import './MenuList.css'

const MenuList = ({items}) => {


    function listOfItems() {
        const listItems = items.map((item) => {
            return (
            <MenuItem
                key={item.id}
                id={item.id}
                name={item.name} 
                thumb={item.thumb} 
                price={item.price}
            />
            );
        });
        return listItems;
    }

    return (
        <div id='menuListContainer'>
            {listOfItems()}
        </div>
    )
}

export default MenuList