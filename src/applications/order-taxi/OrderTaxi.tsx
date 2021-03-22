import React, { useEffect, useState } from "react";
import Title from "../../components/Title";
import Input from "../../components/Input";
import YandexMap from "../../components/YandexMap";
import { Coordinates } from "../../components/YandexMap/YandexMap.types";

import cn from "./OrderTaxi.module.pcss";
import Carriage from "../../components/Carriage";
import { fetchCars, sendOrder } from "../../../mocks/mock";
import CarriageItem from "../../components/Carriage/parts/CarriageItem";
import Button from "../../components/Button";
import formatDate from "../../utils/formatDate";
import { useDispatch, useSelector } from "react-redux";
import { SET_SEARCHED_ADDRESSES } from "../../store/constants";

const IZHEVSK_COORDINATES: Coordinates = [56.86, 53.23];

const ADDRESS_ERRORS = {
  invalid: "Адрес не найден",
  empty: "Это поле обязательное",
};

const OrderTaxi = () => {
  const [address, setAddress] = useState("");
  const [addressCoordinates, setAddressCoordinates] = useState(null);
  const [addressError, setAddressError] = useState("");
  const [carriage, setCarriage] = useState([]);
  const [suggests, setSuggets] = useState([]);

  const searchedAddresses = useSelector(
    (state: { searchedAddresses: { searchedAddresses } }) =>
      state.searchedAddresses.searchedAddresses
  );
  const dispatch = useDispatch();

  const onAddressSearchError = () => {
    setAddressError(ADDRESS_ERRORS.invalid);
  };

  const onAddressSearchValid = () => {
    setAddressError("");
  };

  const createOrder = () => {
    if (!addressError && addressCoordinates && address) {
      const order = {
        source_time: formatDate(new Date()),
        addresses: [
          {
            address: address,
            lat: addressCoordinates[0],
            lon: addressCoordinates[1],
          },
        ],
        crew_id: 123,
      };
      dispatch({
        type: SET_SEARCHED_ADDRESSES,
        payload: searchedAddresses
          ? searchedAddresses.concat([address])
          : [address],
      });

      sendOrder(order).then((res: any) => {
        if (res && res.descr === "OK") {
          alert("Заказ успешно создан");
        }
      });
    }
  };

  const pointsFromCarriage = (): Coordinates[] => {
    if (carriage.length) {
      return carriage.map((car) => [car.lat, car.lon]);
    }
    return [];
  };

  useEffect(() => {
    if (!addressError && addressCoordinates && address) {
      const searchData = {
        source_time: formatDate(new Date()),
        addresses: [
          {
            address: address,
            lat: addressCoordinates[0],
            lon: addressCoordinates[1],
          },
        ],
      };
      const { data } = fetchCars(searchData);
      if (data && data.crews_info) {
        setCarriage(data.crews_info);
      }
    } else {
      setCarriage([]);
    }
  }, [addressError, address, addressCoordinates]);

  useEffect(() => {
    if (!address) {
      setAddressError(ADDRESS_ERRORS.empty);
    }
  }, [address]);

  useEffect(() => {
    if (searchedAddresses) {
      setSuggets(searchedAddresses);
    }
  }, [searchedAddresses]);

  return (
    <div className={"container"}>
      <Title titleType={"h2"}>Детали заказа</Title>
      <Input
        id={"address"}
        value={address}
        setValue={setAddress}
        label={"Откуда:"}
        error={addressError}
        inputProps={{ placeholder: "Введите адрес" }}
        suggests={suggests}
      />
      {carriage.length ? (
        <div className={cn["result-car"]}>
          <span className={cn["result-car-text"]}>Подходящий экипаж:</span>
          <CarriageItem {...carriage[0]} componentView="solo" />
        </div>
      ) : null}
      <div className={cn["map-wrapper"]}>
        <YandexMap
          defaultMapOption={{ center: IZHEVSK_COORDINATES, zoom: 9 }}
          setPoint={setAddressCoordinates}
          point={addressCoordinates}
          setAddress={setAddress}
          address={address}
          onSearchAddressError={onAddressSearchError}
          onAddressValid={onAddressSearchValid}
          isError={Boolean(addressError)}
          className={cn["map"]}
          closestPoints={pointsFromCarriage()}
        />
        <Carriage carriageCars={carriage} className={cn["carriage"]} />
      </div>
      <Button onClick={createOrder}>Заказать</Button>
    </div>
  );
};

export default OrderTaxi;
