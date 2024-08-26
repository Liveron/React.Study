import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import { MenuItemModel } from "./models";
import MenuItem from "./MenuItem";

function Menu() {
  const menu = useLoaderData() as MenuItemModel[];

  return (
    <ul className="divide-y divide-stone-200 px-2">
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

export async function loader(): Promise<MenuItemModel[]> {
  const menu = await getMenu();
  console.log(menu);
  return menu;
}

export default Menu;
