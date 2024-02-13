import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { RemovetoCart } from "../../redux/actions/Cart";
import { CreateOrderMultiple } from "../../redux/actions/Events";
import Spinner from "../Loading/Spinner";

const products = [
  {
    id: 1,
    name: "Throwback Hip Bag",
    href: "#",
    color: "Salmon",
    price: "$90.00",
    quantity: 1,
    imageSrc:
      "https://tse1.mm.bing.net/th?id=OIP.T_GCGlMA3d33KgupO4C5tAAAAA&pid=Api&P=0&h=220",
    imageAlt:
      "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
  },
  {
    id: 2,
    name: "Medium Stuff Satchel",
    href: "#",
    color: "Blue",
    price: "$32.00",
    quantity: 1,
    imageSrc:
      "https://tse1.mm.bing.net/th?id=OIP.T_GCGlMA3d33KgupO4C5tAAAAA&pid=Api&P=0&h=220",
    imageAlt:
      "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
  },
  // More products...
];

const SideCart = ({ setOpen, open }) => {
  const [subTotal, setSubtoal] = useState(null);
  const cartData = useSelector((state) => state.cart.cartData);
  let total = cartData?.reduce((acc, item) => {
    // Check if item.price is a valid number
    const itemPrice = Number(item.retail_price);
    if (!isNaN(itemPrice)) {
      return acc + itemPrice;
    }
    return acc;
  }, 0);
  const dispatch = useDispatch();
  const [data, setdata] = useState([]);

  const removeTicket = (id, qty, i) => {
    const filterCart = cartData?.filter((item, index) => index !== i);
    dispatch(RemovetoCart(filterCart));
    // const newfilterCartData = cartData?.filter(
    //   (item) => item.id !== filterCart[0]?.id && item.qty != filterCart[0]?.qty
    // );
    // console.log(newfilterCartData);
    // ----
    const filterdata = data?.filter(
      (item) => item?.shipped_items[0]?.items[0]?.ticket_group_id !== id
    );
    setdata(filterdata);
  };

  const orderData = {
    orders: [
      {
        shipped_items: [
          {
            items: [
              {
                ticket_group_id: "id",
                quantity: "qty",
                price: "price",
              },
            ],
            type: "type",
            ship_to_name: "Jackie Martinoski",
            email_address_attributes: {
              address: "jackie@ticketevolution.com",
            },
          },
        ],
        payments: [
          {
            type: "evopay",
          },
        ],
        service_fee: 0,
        tax: 0,
        seller_id: 2760,
        buyer_id: 3161,
        buyer_reference_number: "3161",
        external_notes: "These notes will be visible to all parties",
        internal_notes:
          "These notes will be visible only to your office (1937)",
      },
    ],
  };

  let orders = data;

  // -----
  useEffect(() => {
    if (cartData?.length > 0) {
      const newOrder = {
        orders: cartData.map((item) => ({
          shipped_items: [
            {
              items: [
                {
                  ticket_group_id: item.id,
                  quantity: item.qty,
                  price: item.retail_price,
                },
              ],
              type: item.type, // Replace with the actual type property
              ship_to_name: "Jackie Martinoski",
              email_address_attributes: {
                address: "jackie@ticketevolution.com",
              },
            },
          ],
          payments: [
            {
              type: "evopay",
            },
          ],
          service_fee: 0,
          tax: 0,
          seller_id: 2760,
          buyer_id: 3161,
          buyer_reference_number: "3161",
          external_notes: "These notes will be visible to all parties",
          internal_notes:
            "These notes will be visible only to your office (1937)",
        })),
      };

      setdata(newOrder.orders);
    }
  }, [cartData]);

  const ordernow = async () => {
    await dispatch(CreateOrderMultiple(orders));
  };

  const isLoading = useSelector((state) => state.events.isLoading);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll !bg-color1 !text-color2  shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium ">
                          Shopping cart
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setOpen(false)}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul
                            role="list"
                            className="-my-6 divide-y divide-gray-200"
                          >
                            {Object.keys(cartData).length === 0 ? (
                              <p className="flex-1 w-full flex justify-center place-items-center text-center text-[23px] text-[gray] h-[300px] ">
                                No Ticket In Cart
                                <MdOutlineRemoveShoppingCart className="ml-2 text-[23px] text-[gray]" />
                              </p>
                            ) : (
                              cartData?.map((product, index) => (
                                <li key={index} className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                      src={
                                        "https://tse1.mm.bing.net/th?id=OIP.T_GCGlMA3d33KgupO4C5tAAAAA&pid=Api&P=0&h=220"
                                      }
                                      alt={"image"}
                                      className="h-full w-full object-contain"
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-color2">
                                        <h3>
                                          {/* <a href={product.href}> */}
                                          {product?.name.length > 15
                                            ? `${product?.name}...`
                                            : product?.name}
                                          {/* </a> */}
                                        </h3>
                                        <p className="ml-4">
                                          ${product?.retail_price}
                                        </p>
                                      </div>
                                      <p className="mt-1 text-sm text-color2">
                                        {/* {product.color} */}
                                        color
                                      </p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <p className="text-color2">
                                        split {product?.qty}
                                      </p>

                                      <div className="flex">
                                        <button
                                          type="button"
                                          className="font-medium text-indigo-600 hover:text-indigo-500"
                                          onClick={() =>
                                            removeTicket(
                                              product?.id,
                                              product?.qty,
                                              index
                                            )
                                          }
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>${total}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div className="mt-6">
                        <button
                          disabled={cartData?.length === 0 || isLoading}
                          onClick={ordernow}
                          className="flex items-center justify-center rounded-md border border-transparent w-full bg-indigo-600 disabled:bg-indigo-400 disabled:cursor-no-drop px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                          Order Now {isLoading && <Spinner />}
                        </button>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or{" "}
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={() => setOpen(false)}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default SideCart;
