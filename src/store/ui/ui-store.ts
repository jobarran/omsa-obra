import type { Project } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";


interface State {

    activeProject: Project | null;
    setProject: (project: Project) => void;
    unSetProject: () => void;

}

export const useUiStore = create<State>()(

    persist(
        (set, get) => ({

            activeProject: null,
            setProject: (project) => set({ activeProject: project }),
            unSetProject: () => set({ activeProject: null }),
        }),

        {
            name: 'active-project',
            // skipHydration: true,
        }
    )

)