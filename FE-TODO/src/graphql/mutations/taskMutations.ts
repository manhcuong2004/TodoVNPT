import { gql } from "@apollo/client";


export const CREATE_TASK = gql`
    mutation createTask($task: TaskInput!) {
        createTask(task: $task) {
            title
            note
            priority
            due_date
            created_by
        }
    }
`;