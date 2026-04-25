export type Task = {
    taskId: number;
    taskName: string;
    description: string;
    time: number;
    isComplete: boolean
};
export type AddTask = {
    taskName: string;
    description: string;
    time: number;
};

export type EditTask = {
    taskId: number;
    taskName?: string;
    description?: string;
    time?: number;
    isComplete?: boolean;
}

export type Tasks = Task[];
