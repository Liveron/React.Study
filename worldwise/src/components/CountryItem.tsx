import CountryModel from "../models/CountryModel";
import styles from "./CountryItem.module.css";

type CountryItemProps = {
  country: CountryModel;
};

function CountryItem({ country }: CountryItemProps) {
  return (
    <li className={styles.countryItem}>
      <span>{country.emoji}</span>
      <span>{country.name}</span>
    </li>
  );
}

export default CountryItem;
