import React from "react";

import CarriageProps from "./Carriage.types";
import cn from "./Carriage.module.pcss";
import clsx from "clsx";
import CarriageItem from "./parts/CarriageItem";

const Carriage = (props: CarriageProps): React.ReactElement => {
  const { className, carriageCars } = props;
  return (
    <div className={clsx(cn["container"], className)}>
      {carriageCars && carriageCars.length
        ? carriageCars.map((car) => <CarriageItem key={car.crew_id} {...car} />)
        : null}
    </div>
  );
};

export default Carriage;
