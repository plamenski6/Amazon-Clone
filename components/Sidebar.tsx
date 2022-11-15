import React from "react";
import { useRouter } from "next/router";
import { slide as Menu } from "react-burger-menu";
import { ChevronRightIcon, ChevronDownIcon, GlobeAltIcon } from "@heroicons/react/24/outline";
import { UserIcon as UserIconSolid } from "@heroicons/react/24/solid";
import { Us } from "react-flags-select";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

type Props = {
    burgerOpen: boolean;
    setBurgerOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sidebar = ({ burgerOpen, setBurgerOpen }: Props) => {
    const router = useRouter();
    const { locale } = router;
    const { data: session } = useSession();

    return (
        <Menu
            customBurgerIcon={false}
            isOpen={burgerOpen}
            onStateChange={(state) => setBurgerOpen(state.isOpen)}
            className="relative"
        >
            <div className="bg-[#232F3E] px-6 py-3 outline-none absolute top-0 w-full">
                <UserIconSolid className="h-6 text-[#232F3E] bg-white rounded-full inline align-sub mr-3" />
                <p className="text-white font-bold inline select-none">
                    Hello, {session ? session.user?.name?.split(" ")[0] : "sign in"}
                </p>
            </div>
            <div className="mt-14 pt-3 pb-2 text-black border-b border-[#d5dbdb]">
                <p className="font-bold mb-2 px-6">Digital Content & Devices</p>
                <p className="group text-sm flex items-center justify-between py-3 px-6 cursor-pointer select-none hover:bg-[#EAEDED]">
                    Amazon Music <ChevronRightIcon className="h-5 text-gray-500 group-hover:text-black" />
                </p>
                <p className="group text-sm flex items-center justify-between py-3 px-6 cursor-pointer select-none hover:bg-[#EAEDED]">
                    Kindle E-readers & Books <ChevronRightIcon className="h-5 text-gray-500 group-hover:text-black" />
                </p>
                <p className="group text-sm flex items-center justify-between py-3 px-6 cursor-pointer select-none hover:bg-[#EAEDED]">
                    Amazon Appstore <ChevronRightIcon className="h-5 text-gray-500 group-hover:text-black" />
                </p>
            </div>
            <div className="pt-4 pb-2 text-black border-b border-[#d5dbdb]">
                <p className="font-bold mb-2 px-6">Shop By Department</p>
                <p className="group text-sm flex items-center justify-between py-3 px-6 cursor-pointer select-none hover:bg-[#EAEDED]">
                    Electronics <ChevronRightIcon className="h-5 text-gray-500 group-hover:text-black" />
                </p>
                <p className="group text-sm flex items-center justify-between py-3 px-6 cursor-pointer select-none hover:bg-[#EAEDED]">
                    Computers <ChevronRightIcon className="h-5 text-gray-500 group-hover:text-black" />
                </p>
                <p className="group text-sm flex items-center justify-between py-3 px-6 cursor-pointer select-none hover:bg-[#EAEDED]">
                    Smart Home <ChevronRightIcon className="h-5 text-gray-500 group-hover:text-black" />
                </p>
                <p className="group text-sm flex items-center justify-between py-3 px-6 cursor-pointer select-none hover:bg-[#EAEDED]">
                    Arts & Crafts <ChevronRightIcon className="h-5 text-gray-500 group-hover:text-black" />
                </p>
                <p className="group text-sm flex items-center py-3 px-6 cursor-pointer select-none hover:bg-[#EAEDED]">
                    See All <ChevronDownIcon className="h-5 text-gray-500 group-hover:text-black ml-2" />
                </p>
            </div>
            <div className="pt-4 pb-2 text-black border-b border-[#d5dbdb]">
                <p className="font-bold mb-2 px-6">Programs & Features</p>
                <p className="group text-sm flex items-center justify-between py-3 px-6 cursor-pointer select-none hover:bg-[#EAEDED]">
                    Gift Cards <ChevronRightIcon className="h-5 text-gray-500 group-hover:text-black" />
                </p>
                <p className="group text-sm flex items-center justify-between py-3 px-6 cursor-pointer select-none hover:bg-[#EAEDED]">
                    #FoundItOnAmazon
                </p>
                <p className="group text-sm flex items-center justify-between py-3 px-6 cursor-pointer select-none hover:bg-[#EAEDED]">
                    Amazon Live <ChevronRightIcon className="h-5 text-gray-500 group-hover:text-black" />
                </p>
                <p className="group text-sm flex items-center justify-between py-3 px-6 cursor-pointer select-none hover:bg-[#EAEDED]">
                    International Shopping <ChevronRightIcon className="h-5 text-gray-500 group-hover:text-black" />
                </p>
                <p className="group text-sm flex items-center py-3 px-6 cursor-pointer select-none hover:bg-[#EAEDED]">
                    See All <ChevronDownIcon className="h-5 text-gray-500 group-hover:text-black ml-2" />
                </p>
            </div>
            <div className="pt-4 pb-2 text-black border-b border-[#d5dbdb]">
                <p className="font-bold mb-2 px-6">Help & Settings</p>
                <p className="text-sm flex items-center justify-between py-3 px-6 cursor-pointer select-none hover:bg-[#EAEDED]">
                    Your Account
                </p>
                <Link href="/orders">
                    <p className="text-sm flex items-center justify-between py-3 px-6 cursor-pointer select-none hover:bg-[#EAEDED]">
                        Returns & Orders
                    </p>
                </Link>
                <p className="text-sm flex items-center py-3 px-6 cursor-pointer select-none hover:bg-[#EAEDED]">
                    <GlobeAltIcon className="h-5 text-gray-400 mr-2" />{" "}
                    {locale === "en" ? "English" : locale === "es" ? "Español" : "Deutsch"}
                </p>
                <p className="text-sm flex items-center py-3 px-6 cursor-pointer select-none hover:bg-[#EAEDED]">
                    <Us className="w-5 mr-2" /> United States
                </p>
                <p className="text-sm flex items-center justify-between py-3 px-6 cursor-pointer select-none hover:bg-[#EAEDED]">
                    Customer Service
                </p>
                <p
                    onClick={
                        session ? () => signOut() : () => router.push(`/signin?callbackUrl=${window.location.href}`)
                    }
                    className="text-sm flex items-center py-3 px-6 cursor-pointer select-none hover:bg-[#EAEDED]"
                >
                    Sign {session ? "out" : "in"}
                </p>
            </div>
        </Menu>
    );
};
export default Sidebar;
