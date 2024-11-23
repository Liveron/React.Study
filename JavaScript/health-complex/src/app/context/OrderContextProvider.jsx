import { OrderContext } from "feature/order";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { format, add } from "date-fns";
import { ConfirmOrderPage } from "pages/confirm-order";

function getTomorrowDate() {
  const tomorrow = add(new Date(), { days: 1 });
  return format(tomorrow, "yyyy-MM-dd");
}

function OrderContextProvider() {
  const [order, setOrder] = useState({
    start: format(new Date(), "yyyy-MM-dd"),
    end: getTomorrowDate(),
  });
  const [showForm, setShowForm] = useState(false);

  return (
    <OrderContext.Provider value={{ order, setOrder, setShowForm }}>
      {showForm && <ConfirmOrderPage />}
      <Outlet />
    </OrderContext.Provider>
  );
}

export default OrderContextProvider;
