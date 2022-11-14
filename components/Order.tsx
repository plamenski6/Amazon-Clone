import { Order } from "../types";

interface Props {
    order: Order;
}

const OrderComponent = ({ order }: Props) => {
    return <div>Order</div>;
};

export default OrderComponent;
