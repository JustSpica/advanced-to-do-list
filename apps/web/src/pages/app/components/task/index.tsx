import { AxiosError } from 'axios'
import { twJoin } from 'tailwind-merge'

import { Checkbox } from '@app/components'
import { queryClient } from '@app/lib/react-query'
import { HttpTasksService } from '@app/services/tasks.service'

import { DeleteTaskDialog } from './delete-task-dialog'
import { EditTaskDialog } from './edit-task-dialog'

export type TaskProps = {
  task: {
    status: boolean
    id: string
    title: string
    description: string
    createdAt: Date
    userId: string
  }
}

export function Task({ task }: TaskProps) {
  const taskService = HttpTasksService.create()

  async function handleUpdateTaskStatus(isChecked: boolean) {
    try {
      await taskService.save(task.id, { status: isChecked })

      queryClient.invalidateQueries({ queryKey: ['find-many-tasks-query'] })
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error)
      }
    }
  }

  return (
    <div className="flex w-full items-start rounded-md bg-zinc-950 p-4">
      <Checkbox
        id={task.id}
        checked={task.status}
        onCheckedChange={handleUpdateTaskStatus}
      />

      <div className="ml-2 flex flex-1 flex-col">
        <label
          htmlFor={task.id}
          className={twJoin(
            'text-sm text-white',
            task.status && 'line-through'
          )}
        >
          {task.title}
        </label>
        <span className="line-clamp-1 text-sm text-zinc-500">
          {task.description}
        </span>
      </div>

      <div className="flex space-x-1">
        <EditTaskDialog
          description={task.description}
          title={task.title}
          taskId={task.id}
        />
        <DeleteTaskDialog taskId={task.id} />
      </div>
    </div>
  )
}
