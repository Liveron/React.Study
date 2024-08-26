import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import CityModel from "../models/CityModel";
import Action from "../actions/Action";

const BASE_URL = "http://localhost:3000";

type Context = {
  cities: CityModel[];
  currentCity: CityModel;
  isLoading: boolean;
  error: string;
  getCity: (id: number) => void;
  createCity: (newCity: unknown) => void;
  deleteCity: (id: number) => void;
};

const CitiesContext = createContext<Context>({
  cities: [],
  currentCity: new CityModel(),
  isLoading: false,
  error: "",
  getCity: () => {},
  createCity: () => {},
  deleteCity: () => {},
});

type State = {
  cities: CityModel[];
  currentCity: CityModel;
  isLoading: boolean;
  error: string;
};

const initialState: State = {
  cities: [],
  currentCity: new CityModel(),
  isLoading: false,
  error: "",
};

type CitiesProviderProps = {
  children: ReactNode;
};

function reducer(
  state: State,
  action: Action<string, CityModel[] | CityModel | string | number>
): State {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };

    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: (action.payload as CityModel[]) || state.cities,
      };

    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload as CityModel,
      };

    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload as CityModel],
        currentCity: action.payload as CityModel,
      };

    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter(
          (city) => city.id !== (action.payload as number)
        ),
      };

    case "rejected":
      return { ...state, isLoading: false, error: action.payload as string };

    default:
      throw new Error("Unknown action type");
  }
}

export function CitiesProvider({ children }: CitiesProviderProps) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        const response = await fetch(`${BASE_URL}/cities`);
        const data = await response.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error loading cities...",
        });
      }
    }
    fetchCities();
  }, []);

  const getCity = useCallback(
    async function getCity(id: number) {
      if (id === currentCity.id) return;

      dispatch({ type: "loading" });
      try {
        const response = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await response.json();
        dispatch({ type: "city/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error loading the city...",
        });
      }
    },
    [currentCity.id]
  );

  async function createCity(newCity: unknown) {
    dispatch({ type: "loading" });
    try {
      const response = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      dispatch({ type: "city/created", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error creating the city...",
      });
    }
  }

  async function deleteCity(id: number) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      dispatch({ type: "city/deleted", payload: id });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error deleting the city...",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

export function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside the CitiesProvider");

  return context;
}
