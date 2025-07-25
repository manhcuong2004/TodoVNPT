import { Task } from "../model/task.model"
import { getUserIdFromToken } from "../utils/auth";
export const resolversTask = {
    Query: {
        getListTask: async (_: any, args: any, context: any) => {
            const userId = getUserIdFromToken(context.req);
            const { sortKey, sortValue, currentPage, limitItem } = args;

            const sort: any = {};
            if (sortKey && sortValue) sort[sortKey] = sortValue;

            const skip = (currentPage - 1) * limitItem;

            const tasks = await Task.find({
                created_by: userId,
                deleted: false
            }).sort(sort).limit(limitItem).skip(skip);

            return tasks;
        },
        getListTaskCompleted: async (_: any, args: any, context: any) => {
            const userId = getUserIdFromToken(context.req);
            const { sortKey, sortValue, currentPage, limitItem } = args;

            const sort: any = {};
            if (sortKey && sortValue) sort[sortKey] = sortValue;

            const skip = (currentPage - 1) * limitItem;

            const tasks = await Task.find({
                created_by: userId,
                completed: true,
                deleted: false
            }).sort(sort).limit(limitItem).skip(skip);

            return tasks;
        },
        getTask: async (_: any, args: any) => {
            const { id } = args
            const task = await Task.findOne({
                _id: id,
                deleted: false
            })
            return task
        }
    },
    Mutation: {
        createTask: async (_: any, args: any, context: any) => {
            const { task } = args;
            try {
                const userId = getUserIdFromToken(context.req);
                const record = new Task({
                    ...task,
                    created_by: userId
                })
                await record.save();
                return record;
            } catch (error) {
                throw new Error("Invalid token");
            }
        },

        deleteTask: async (_: any, args: any) => {
            const { id } = args;

            await Task.updateOne({
                _id: id
            }, {
                deleted: true,
                deleted_at: Date.now()
            })

            return "Đã xóa";
        },

        updateTask: async (_: any, args: any) => {
            const { id, task } = args;

            await Task.updateOne({
                _id: id
            }, task)

            return "Thay đổi thành thụ";
        }
    }
}
