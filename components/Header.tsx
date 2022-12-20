"use client";

import { Fragment, useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
    MapPinIcon,
    MagnifyingGlassIcon,
    ShoppingCartIcon,
    Bars3Icon,
    UserIcon,
    ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { Dialog, Transition } from "@headlessui/react";
import ReactFlagsSelect from "react-flags-select";
import { Oval } from "react-loader-spinner";
import Translation from "../utils/translation";
import { countryList } from "../utils/allCountries";
import { useSession, signOut } from "next-auth/react";
import type { RootState } from "../redux/store";
import { useSelector } from "react-redux";

import logo from "../public/images/logo.png";
import Sidebar from "./Sidebar";

const Header = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [category, setCategory] = useState("All");
    const [selected, setSelected] = useState("");
    const [country, setCountry] = useState("Bulgaria");
    const [burgerOpen, setBurgerOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [isInputSearchFocused, setIsInputSearchFocused] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const t = Translation();

    const { data: session } = useSession();

    const items = useSelector((state: RootState) => state.cart.items);

    const selectCountryRef = useRef<HTMLSelectElement>(null);
    const doneButtonRef = useRef(null);

    useEffect(() => {
        if (localStorage.getItem("country")) {
            const country = localStorage.getItem("country") as string;
            setCountry(country);
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        if (pathname?.slice(1, 3) === "es") {
            setSelected("ES");
        } else if (pathname?.slice(1, 3) === "de") {
            setSelected("DE");
        } else {
            setSelected("US");
        }
    }, [pathname]);

    const changeLanguage = (e: string) => {
        setSelected(e);
        let locale = "";

        if (e === "ES") {
            locale = "es";
        } else if (e === "DE") {
            locale = "de";
        } else {
            locale = "";
        }

        window.location.href = `${window.location.origin}/${locale}`;
    };

    return (
        <>
            {/* SIDEBAR MENU */}
            <Sidebar burgerOpen={burgerOpen} setBurgerOpen={setBurgerOpen} />

            <header>
                {/* TOP SECTION */}
                <div className="bg-[#131921] py-2 px-4 flex justify-between lg:justify-start">
                    <div className="flex flex-none">
                        <div className="flex">
                            <Bars3Icon
                                onClick={() => setBurgerOpen((prevState) => !prevState)}
                                className="h-10 text-white lg:hidden"
                            />
                            <Link href="/" className="flex">
                                <div className="w-fit flex items-end ml-2">
                                    <Image src={logo} alt="Logo" width={100} height={35} className="cursor-pointer" />
                                </div>
                            </Link>
                        </div>

                        <div
                            onClick={() => setModalOpen(true)}
                            className="hidden text-white cursor-pointer py-1 pl-1 pr-2 ml-2 lg:flex items-center border border-transparent hover:border-white rounded-sm"
                        >
                            <MapPinIcon className="w-5 h-6" />
                            <div className="w-20 select-none">
                                <p className="text-xs text-[#ccc] leading-4">Deliver to</p>
                                {isLoading ? (
                                    <Oval
                                        height={10}
                                        width={10}
                                        color="white"
                                        wrapperStyle={{}}
                                        wrapperClass=""
                                        visible={true}
                                        ariaLabel="oval-loading"
                                        secondaryColor="white"
                                        strokeWidth={10}
                                        strokeWidthSecondary={10}
                                    />
                                ) : (
                                    <p className="text-sm font-bold leading-4 truncate">{country}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div
                        className={`hidden ml-2 lg:flex grow rounded ${
                            isInputSearchFocused ? "ring-2 ring-[#FF9900]" : ""
                        }`}
                    >
                        <select
                            onChange={(e) => setCategory(e.target.value)}
                            className={`text-sm outline-none h-full rounded-l bg-[#f3f3f3] border border-[#cdcdcd] text-gray-500 flex-none
                ${
                    category.length <= 3
                        ? "w-10"
                        : category.length <= 5
                        ? "w-16"
                        : category.length <= 10
                        ? "w-24"
                        : category.length <= 15
                        ? "w-32"
                        : category.length <= 23
                        ? "w-44"
                        : "w-52"
                } focus:ring-2 focus:ring-[#FF9900] z-5
                `}
                        >
                            <option className="text-black" value="All">
                                All
                            </option>
                            <option className="text-black" value="Arts & Crafts">
                                Arts & Crafts
                            </option>
                            <option className="text-black" value="Automotive">
                                Automotive
                            </option>
                            <option className="text-black" value="Baby">
                                Baby
                            </option>
                            <option className="text-black" value="Beauty & Personal Care">
                                Beauty & Personal Care
                            </option>
                            <option className="text-black" value="Boys' Fashion">
                                Boys&apos; Fashion
                            </option>
                            <option className="text-black" value="Computers">
                                Computers
                            </option>
                            <option className="text-black" value="Deals">
                                Deals
                            </option>
                            <option className="text-black" value="Digital Music">
                                Digital Music
                            </option>
                            <option className="text-black" value="Electronics">
                                Electronics
                            </option>
                            <option className="text-black" value="Girls' Fashion">
                                Girls&apos; Fashion
                            </option>
                            <option className="text-black" value="Health & Household">
                                Health & Household
                            </option>
                            <option className="text-black" value="Home & Kitchen">
                                Home & Kitchen
                            </option>
                            <option className="text-black" value="Industrial & Scientific">
                                Industrial & Scientific
                            </option>
                            <option className="text-black" value="Kindle Store">
                                Kindle Store
                            </option>
                            <option className="text-black" value="Luggage">
                                Luggage
                            </option>
                            <option className="text-black" value="Men's Fashion">
                                Men&apos;s Fashion
                            </option>
                            <option className="text-black" value="Movies & TV">
                                Movies & TV
                            </option>
                            <option className="text-black" value="Music, CDs & Vinyl">
                                Music, CDs & Vinyl
                            </option>
                            <option className="text-black" value="Pet Supplies">
                                Pet Supplies
                            </option>
                            <option className="text-black" value="Prime Video">
                                Prime Video
                            </option>
                            <option className="text-black" value="Software">
                                Software
                            </option>
                            <option className="text-black" value="Sports & Outdoors">
                                Sports & Outdoors
                            </option>
                            <option className="text-black" value="Tools & Home Improvement">
                                Tools & Home Improvement
                            </option>
                            <option className="text-black" value="Toys & Games">
                                Toys & Games
                            </option>
                            <option className="text-black" value="Video Games">
                                Video Games
                            </option>
                            <option className="text-black" value="Women's Fashion">
                                Women&apos;s Fashion
                            </option>
                        </select>
                        <input
                            type="text"
                            className="h-full outline-none pl-2 grow rounded-none"
                            size={1}
                            placeholder="Search Amazon"
                            onBlur={() => setIsInputSearchFocused(false)}
                            onFocus={() => setIsInputSearchFocused(true)}
                        />
                        <button className="bg-[#febd69] rounded-r px-2 flex-none hover:bg-[#F3A847]">
                            <MagnifyingGlassIcon className="h-6" />
                        </button>
                    </div>

                    <div className="flex-none lg:ml-3 text-white flex items-center">
                        <div className="hidden lg:block pt-1 px-2 cursor-pointer border border-transparent hover:border-white rounded-sm select-none">
                            <p className="text-xs leading-none">
                                {pathname?.slice(1, 3) === "es"
                                    ? "Español"
                                    : pathname?.slice(1, 3) === "de"
                                    ? "Deutsch"
                                    : "English"}
                            </p>
                            <ReactFlagsSelect
                                selected={selected}
                                onSelect={changeLanguage}
                                countries={["US", "ES", "DE"]}
                                customLabels={{
                                    US: "English",
                                    ES: "Español",
                                    DE: "Deutsch",
                                }}
                                showSelectedLabel={false}
                                fullWidth={false}
                            />
                        </div>
                        <div
                            onClick={
                                session
                                    ? () => signOut()
                                    : () => router.push(`/signin?callbackUrl=${window.location.href}`)
                            }
                            className="hidden lg:block ml-2 py-1 px-2 cursor-pointer border border-transparent hover:border-white rounded-sm select-none"
                        >
                            <p className="text-xs leading-4">Hello, {session ? session.user?.name : "sign in"}</p>
                            <p className="text-sm font-bold leading-4">Account & Lists</p>
                        </div>
                        <div
                            onClick={() => router.push("/orders")}
                            className="hidden lg:block ml-2 py-1 px-2 cursor-pointer border border-transparent hover:border-white rounded-sm select-none"
                        >
                            <p className="text-xs leading-4">Returns</p>
                            <p className="text-sm font-bold leading-4">& Orders</p>
                        </div>
                        <div
                            onClick={
                                session
                                    ? () => signOut()
                                    : () => router.push(`/signin?callbackUrl=${window.location.href}`)
                            }
                            className="lg:hidden text-white p-1 flex items-center"
                        >
                            <p className="text-sm select-none">
                                {session ? session.user?.name?.split(" ")[0] : "Sign in"}{" "}
                                <ChevronRightIcon className="h-3 inline" />
                            </p>
                            <UserIcon className="h-8" />
                        </div>
                        <div
                            onClick={() => router.push("/checkout")}
                            className="lg:ml-2 py-1 px-1 lg:px-2 flex items-center relative cursor-pointer border border-transparent lg:hover:border-white rounded-sm select-none"
                        >
                            <span
                                className={`hidden lg:block rounded-full px-1 text-xs bg-[#F3A847] text-black absolute top-0
                ${pathname?.slice(1, 3) === "es" ? "right-10" : pathname?.slice(1, 3) === "de" ? "right-12" : "right-8"}
                `}
                            >
                                {items.length}
                            </span>
                            <span className="block lg:hidden rounded-full px-1 text-xs bg-[#F3A847] text-black absolute top-0 right-0">
                                {items.length}
                            </span>
                            <ShoppingCartIcon className="h-8" />
                            <p className="hidden lg:block text-sm font-bold mt-2">{t.CART}</p>
                        </div>
                    </div>
                </div>

                {/* SEARCH BAR FOR MOBILE AND TABLET VIEW */}
                <div className="bg-[#131921] flex lg:hidden pl-5 pr-4">
                    <input
                        type="text"
                        className="h-full outline-none pl-2 py-2 grow rounded-l rounded-r-none"
                        size={1}
                        placeholder="Search Amazon"
                    />
                    <button className="bg-[#febd69] rounded-r px-2 py-1 flex-none hover:bg-[#F3A847]">
                        <MagnifyingGlassIcon className="h-6" />
                    </button>
                </div>

                {/* BOTTOM SECTION */}
                <div className="bg-[#131921] lg:bg-[#232F3E] text-white py-1 px-3 lg:px-4 flex items-center overflow-x-auto whitespace-nowrap no-scrollbar">
                    <div className="hidden lg:flex items-center">
                        <div
                            onClick={() => setBurgerOpen((prevState) => !prevState)}
                            className="px-1 flex border border-transparent hover:border-white rounded-sm select-none items-center"
                        >
                            <Bars3Icon className="h-6" /> <p className="font-semibold text-sm">All</p>
                        </div>
                        <p className="px-2 border border-transparent hover:border-white rounded-sm select-none text-sm">
                            Today&apos;s Deals
                        </p>
                        <p className="px-2 border border-transparent hover:border-white rounded-sm select-none text-sm">
                            Customer Service
                        </p>
                        <p className="px-2 border border-transparent hover:border-white rounded-sm select-none text-sm">
                            Registry
                        </p>
                        <p className="px-2 border border-transparent hover:border-white rounded-sm select-none text-sm">
                            Gift Cards
                        </p>
                        <p className="px-2 border border-transparent hover:border-white rounded-sm select-none text-sm">
                            Sell
                        </p>
                    </div>
                    <div className="flex items-center lg:hidden">
                        <p className="p-2 active:text-yellow-600 select-none">Deals</p>
                        <p className="p-2 active:text-yellow-600 select-none">Amazon Basics</p>
                        <p className="p-2 active:text-yellow-600 select-none">Best Sellers</p>
                        <p className="p-2 active:text-yellow-600 select-none">Livestreams</p>
                        <p className="p-2 active:text-yellow-600 select-none">Video</p>
                        <p className="p-2 active:text-yellow-600 select-none">New Releases</p>
                        <p className="p-2 active:text-yellow-600 select-none">Home</p>
                        <p className="p-2 active:text-yellow-600 select-none">Books</p>
                        <p className="p-2 active:text-yellow-600 select-none">Gift Cards</p>
                        <p className="p-2 active:text-yellow-600 select-none">Healt & Household</p>
                        <p className="p-2 active:text-yellow-600 select-none">PC</p>
                        <p className="p-2 active:text-yellow-600 select-none">Music</p>
                        <p className="p-2 active:text-yellow-600 select-none">Lists</p>
                    </div>
                </div>

                {/* DELIVERY SECTION FOR MOBILE AND TABLET VIEW */}
                <div
                    onClick={() => setModalOpen(true)}
                    className="bg-[#232F3E] px-4 py-2 text-white flex items-center lg:hidden"
                >
                    <MapPinIcon className="h-6" />
                    <p className="text-sm ml-1 select-none">Deliver to {country}</p>
                </div>
            </header>

            <Transition.Root show={modalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={doneButtonRef} onClose={setModalOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <Dialog.Title
                                                as="h3"
                                                className="text-lg font-medium leading-6 text-gray-900"
                                            >
                                                Choose your location
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    Delivery options and delivery speeds may vary for different
                                                    locations
                                                </p>
                                            </div>
                                            <select
                                                defaultValue={country}
                                                ref={selectCountryRef}
                                                className="outline-none rounded-md bg-[#f3f3f3] border border-[#cdcdcd] text-gray-500 p-2 drop-shadow-lg hover:bg-[#E3E6E6] mt-3 w-full"
                                            >
                                                {countryList.map((country) => (
                                                    <option className="bg-white" key={country} value={country}>
                                                        {country}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button
                                            type="button"
                                            className="bg-[#FFD814] mt-3 inline-flex w-full justify-center rounded-md border border-[#FCD200] px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-[#F7CA00] hover:border-[#F2C200] focus:outline-none sm:mt-0 sm:w-auto sm:text-sm"
                                            onClick={() => {
                                                if (selectCountryRef.current) {
                                                    localStorage.setItem("country", selectCountryRef.current.value);
                                                    setCountry(selectCountryRef.current.value);
                                                }
                                                setModalOpen(false);
                                            }}
                                            ref={doneButtonRef}
                                        >
                                            Done
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    );
};

export default Header;
