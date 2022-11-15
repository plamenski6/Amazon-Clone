import moment from "moment";
import Image from "next/image";
import { Order } from "../types";

interface Props {
    order: Order;
}

const OrderComponent = ({ order }: Props) => {
    return (
        <div className="border border-gray-300 rounded-sm">
            <div className="bg-gray-200 flex flex-col lg:flex-row justify-between p-5">
                <div className="flex justify-between mb-3 lg:mb-0">
                    <div className="mr-3 sm:mr-5 flex flex-col justify-between">
                        <p className="text-xs font-semibold uppercase">Order Placed</p>
                        <p className="text-xs">{moment.unix(order.timestamp).format("DD MMM YYYY")}</p>
                    </div>
                    <div className="flex flex-col justify-between">
                        <p className="text-xs font-semibold uppercase">Total</p>
                        <p className="text-xs">
                            ${order.amount} - Next day Delivery ${order.shippingAmount}
                        </p>
                    </div>
                </div>
                <div className="lg:max-w-xs lg:text-end">
                    <p className="text-xs truncate">
                        <span className="font-semibold">ORDER:</span> {order.id}
                    </p>
                    <p className="text-blue-500 font-semibold text-end">
                        {order.items.length > 1 ? `${order.items.length} items` : `1 item`}
                    </p>
                </div>
            </div>

            <div className="grid grid-flow-row-dense grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-9 2xl:grid-cols-11 gap-5 p-5 ">
                {order.images.map((url: string, index) => (
                    <div key={url} className="flex items-center justify-center">
                        <Image
                            src={url}
                            alt={`Image ${index}`}
                            width={150}
                            height={150}
                            className="object-contain w-[150px] h-[150px]"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderComponent;
