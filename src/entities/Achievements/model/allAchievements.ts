export interface Achievement { 
    id: number,
    name: string,
    boost: number,
    desc: string,
    isOpen: boolean,
    isActive: boolean,
}

export const allAchievements: Achievement[] = [
    {
        id: 1,
        name: "First Step",
        boost: 1,
        desc: "Complete first task",
        isOpen: true,
        isActive: true,
    },
    {
        id: 2,
        name: "Task Hunter",
        boost: 3,
        desc: "Complete 20 tasks",
        isOpen: false,
        isActive: false
    },
    {
        id: 3,
        name: "Iron Focus",
        boost: 4,
        desc: "Finish 6 hour task",
        isOpen: false,
        isActive: false
    },
    {
        id: 4,
        name: "Week Streak",
        boost: 4,
        desc: "7 days without break",
        isOpen: false,
        isActive: false
    },
    {
        id: 5,
        name: "Unstoppable",
        boost: 7,
        desc: "30 day streak reached",
        isOpen: false,
        isActive: false
    },
    {
        id: 6,
        name: "Legend",
        boost: 10,
        desc: "100 day streak completed",
        isOpen: false,
        isActive: false
    },
    {
        id: 7,
        name: "Daily Hero",
        boost: 4,
        desc: "Complete 5 tasks daily",
        isOpen: false,
        isActive: false
    },
    {
        id: 8,
        name: "Master",
        boost: 10,
        desc: "100 level!",
        isOpen: false,
        isActive: false
    },
]