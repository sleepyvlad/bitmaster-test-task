import React, { useCallback, useEffect, useState } from "react";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import { useDebounce } from "use-debounce";
import ymaps from "ymaps";

import YandexMapProps from "./YandexMap.types";
import cn from "./YandexMap.module.pcss";
import clsx from "clsx";

const API_URL =
  "https://api-maps.yandex.ru/2.1?apikey=90f493fe-dfb1-4708-98b9-6c436f81cdac&lang=ru_RU";

const ERROR_COLOR = "#FF0000";
const VALID_COLOR = "#FFFF00";
const CLOSE_POINT_COLOR = "#00FF00";

const decimalRegex = /\d/;

const YandexMap = (props: YandexMapProps) => {
  const {
    point,
    setPoint,
    defaultMapOption,
    setAddress,
    onAddressValid,
    closestPoints,
    className,
    isError,
    onSearchAddressError,
    address,
  } = props;
  const [mapRef, setMapRef] = useState(null);
  const [ymapsApi, setYmapsApi] = useState(null);
  const [debouncedAddress] = useDebounce(address, 500);

  const mapRefCallback = useCallback((node) => {
    if (node !== null) {
      setMapRef(node);
    }
  }, []);

  const setPointByClick = (ev: any) => {
    const coordinates = ev.get("coords");

    ymapsApi.geocode(coordinates).then((res) => {
      const firstGeoObject = res.geoObjects.get(0);
      const foundAddress = firstGeoObject.getAddressLine();
      setAddress(foundAddress);
      if (!decimalRegex.test(foundAddress)) {
        onSearchAddressError();
      } else {
        onAddressValid();
      }
    });
    setPoint(coordinates);
  };

  const searchAddressCoordinates = (searchingAddress: string) => {
    if (!decimalRegex.test(searchingAddress)) {
      onSearchAddressError();
      return;
    }

    ymapsApi.search(address).then((res) => {
      const geoObjects = res.geoObjects;
      if (geoObjects) {
        const coordinates = res.geoObjects.get(0).geometry.getCoordinates();

        if (coordinates[0] < 0 || coordinates[1] < 0) {
          onSearchAddressError();
        } else {
          setPoint(coordinates);
          onAddressValid();
        }
      } else {
        onSearchAddressError();
      }
    });
  };

  useEffect(() => {
    ymaps.load(API_URL).then((api) => setYmapsApi(api));
  }, []);

  useEffect(() => {
    if (mapRef && ymapsApi) {
      mapRef.events.add("click", setPointByClick);

      return () => {
        mapRef.events.remove("click", setPointByClick);
      };
    }
  }, [mapRef, ymapsApi]);

  useEffect(() => {
    if (ymapsApi && debouncedAddress.length > 3) {
      searchAddressCoordinates(debouncedAddress);
    }
  }, [ymapsApi, debouncedAddress]);

  return (
    <YMaps>
      <Map
        instanceRef={mapRefCallback}
        className={clsx(cn["map"], className)}
        defaultState={defaultMapOption}
      >
        {point ? (
          <Placemark
            options={{ iconColor: isError ? ERROR_COLOR : VALID_COLOR }}
            geometry={point}
          />
        ) : null}
        {closestPoints.length
          ? closestPoints.map((closePoint) => (
              <Placemark
                key={JSON.stringify(closePoint)}
                geometry={closePoint}
                options={{ iconColor: CLOSE_POINT_COLOR }}
              />
            ))
          : null}
      </Map>
    </YMaps>
  );
};

export default YandexMap;
