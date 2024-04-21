'use client';


import Link from "next/link";
import { IoPeople } from "react-icons/io5";
import { FaTruck, FaBuilding } from 'react-icons/fa6';
import { Avatar } from "./Avatar";
import { logout } from "@/actions";
import { Project, User } from "@/interfaces";
import { useEffect, useState } from "react";
import { FaExchangeAlt } from "react-icons/fa";
import { useUiStore } from "@/store";
import { ChangeObraModal } from "./ChangeObraModal";
import { TopMenuIcon } from "./TopMenuIcon";


interface Props {
  user: User,
  projects: Project[]
}

export const TopMenu = ({ user, projects }: Props) => {

  const activeProject = useUiStore(state => state.activeProject)

  const [isChangeObraModalOpen, setIsChangeObraModalOpen] = useState(false)

  return (

    <nav className="bg-white shadow-md">

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
          <p className="hidden md:inline text-md">{activeProject?.name}</p>
          <p className="md:hidden text-md">{activeProject?.shortName}</p>
          <Link
            href=""
            className="pl-2"
            onClick={() => setIsChangeObraModalOpen(!isChangeObraModalOpen)}
          >
            <FaExchangeAlt className="w-4 h-4 transition duration-75 text-gray-400 group-hover:text-sky-600" />
          </Link>

        </div>

        {/* Center - Icons */}
        <div className="flex justify-center items-center space-x-4">

          {/* Icons */}

          <TopMenuIcon
            link={"/recibir"}
            icon={<FaTruck />}
            text={"Recibir"}
          />

          <TopMenuIcon
            link={"/montar"}
            icon={<FaBuilding />}
            text={"Recibir"}
          />

          <TopMenuIcon
            link={"/asistencia"}
            icon={<IoPeople />}
            text={"Asistencia"}
          />

        </div>

        {/* Right Side - User Name & Avatar */}
        <div className="flex items-center space-x-2">
          {/* User Name */}
          <span className="hidden md:inline text-sm">{user.name} {user.lastName}</span>
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
