import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { MdArrowDropDownCircle } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdOutlineAttachFile } from "react-icons/md";

export default function Dropdown() {
    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <MenuButton className="inline-flex justify-center ">
                    <MdArrowDropDownCircle className='text-xl text-white' />

                </MenuButton>
            </div>

            <MenuItems
                transition
                className="absolute left-[20px] z-10 mt-2 w-[115px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
                <div className="py-1">

                    <MenuItem>
                        <a
                            className="  cursor-default flex px-4 items-center py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                        >
                            Attach
                            <MdOutlineAttachFile className='ml-6 text-lg' />
                        </a>
                    </MenuItem>


                </div>
            </MenuItems>
        </Menu>
    )
}
