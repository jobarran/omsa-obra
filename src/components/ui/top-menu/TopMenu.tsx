'use client';


import Link from "next/link";
import { IoPeople } from "react-icons/io5";
import { Avatar } from "./Avatar";
import { logout } from "@/actions";
import { Project, User } from "@/interfaces";
import { useEffect, useState } from "react";
import { useUiStore } from "@/store";
import { ChangeObraModal } from "./ChangeObraModal";
import { TopMenuIcon } from "./TopMenuIcon";
import { usePathname } from "next/navigation";
import { FaTruck, FaBuilding } from 'react-icons/fa6';
import { FaExchangeAlt } from "react-icons/fa";
import { FaTasks } from "react-icons/fa";
import { FaBuildingCircleCheck } from "react-icons/fa6";


interface Props {
  user: User,
  projects: Project[]
}

const MENU_ITEMS = [
  { href: "/recibir", label: "Recibir", icon: <FaTruck /> },
  { href: "/montar", label: "Montar", icon: <FaBuildingCircleCheck /> },
  { href: "/asistencia", label: "Asistencia", icon: <IoPeople /> },
  { href: "/tareas", label: "Tareas", icon: <FaTasks /> },
];

export const TopMenu = ({ user, projects }: Props) => {

  const activeProject = useUiStore(state => state.activeProject)
  const [isChangeObraModalOpen, setIsChangeObraModalOpen] = useState(false)
  const pathname = usePathname();


  return (

    <nav className="bg-white border-b-2 border-b-gray-200">

      <ChangeObraModal
        projects={projects}
        setIsChangeObraModalOpen={() => setIsChangeObraModalOpen(!isChangeObraModalOpen)}
        isChangeObraModalOpen={isChangeObraModalOpen}
      />

      <div className="flex justify-between items-center px-4">

        {/* Left Side */}
        <div className="flex items-center">
          <a href="/">
            <h1 className="text-xl font-bold">OMSA</h1>
          </a>
          <h1 className="text-xl p-2 font-bold">-</h1>
          <p className="hidden lg:inline text-md">{activeProject?.name}</p>
          <p
            className="lg:hidden text-md underline cursor-pointer"
            onClick={() => setIsChangeObraModalOpen(!isChangeObraModalOpen)}
          >
            {activeProject?.shortName}
          </p>
          <Link
            href=""
            className="pl-2"
            onClick={() => setIsChangeObraModalOpen(!isChangeObraModalOpen)}
          >
            <FaExchangeAlt className="hidden lg:inline w-4 h-4 transition duration-75 text-gray-400 group-hover:text-sky-600" />
          </Link>

        </div>

        {/* Center - Icons */}
        <div className="flex justify-center items-center space-x-4">

          {MENU_ITEMS.map(({ href, label, icon }) => {
            const isActive = pathname === href;

            return (

              <TopMenuIcon
                key={href}
                link={href}
                icon={icon}
                text={label}
                isActive={isActive}
              />

            );
          })}

        </div>

        {/* Right Side - User Name & Avatar */}
        <div className="flex items-center space-x-2">
          {/* User Name */}
          <span className="hidden lg:inline text-sm">{user.name} {user.lastName}</span>
          {/* User Avatar */}
          <Avatar
            initials={user.name[0]! + user.lastName[0]! || ''}
            id={user.id || ''}
            image={user.image || undefined}
            logout={logout}
          />
        </div>
      </div>
    </nav>

  )
}
