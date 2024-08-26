import { useCities } from "../contexts/CitiesContext";
import CountryModel from "../models/CountryModel";
import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Message from "./Message";
import Spinner from "./Spinner";

export default function CountryList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  const countries = cities.reduce(
    (arr, city) =>
      !arr.some((x) => x.name === city.country)
        ? [...arr, { name: city.country, emoji: city.emoji }]
        : arr,
    new Array<CountryModel>()
  );

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.name} />
      ))}
    </ul>
  );
}
