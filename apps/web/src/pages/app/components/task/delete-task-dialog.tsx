import { useState } from 'react'
import { AxiosError } from 'axios'
import { Trash } from 'lucide-react'

import { Button, Dialog } from '@app/components'
import { useToast } from '@app/components/toast/use-toast'
import { queryClient } from '@app/lib/react-query'
import { HttpTasksService } from '@app/services/tasks.service'

export type DeleteTaskDialogProps = {
  taskId: string
}

export function DeleteTaskDialog({ taskId }: DeleteTaskDialogProps) {
  const taskService = HttpTasksService.create()

  const [isDeleteTaskDialogOpen, setIsDeleteTaskDialogOpen] = useState(false)

  const { toast } = useToast()

  async function handleDeleteTask() {
    try {
      await taskService.delete(taskId)

      queryClient.invalidateQueries({ queryKey: ['find-many-tasks-query'] })

      setIsDeleteTaskDialogOpen(false)

      toast({
        description: 'A tarefa selecionada foi excluida com sucesso.',
        title: 'Tarefa excluida com sucesso.',
        variant: 'success'
      })
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error)

        if (error.status === 403) {
          return toast({
            description:
              'Usuário não possui permissão para excluir essa tarefa.',
            title: 'Usuário não possui permissão.',
            variant: 'error'
          })
        }

        return toast({
          description: 'Ocorreu um erro ao excluir a tarefa.',
          title: `Erro ao excluir tarefa (Code: ${error.status})`,
          variant: 'error'
        })
      }
    }
  }

  return (
    <Dialog.Root
      open={isDeleteTaskDialogOpen}
      onOpenChange={setIsDeleteTaskDialogOpen}
    >
      <Dialog.Trigger asChild>
        <Button group="icon" variant="ghost">
          <Trash size={16} />
        </Button>
      </Dialog.Trigger>

      <Dialog.Content>
        <Dialog.Title>Excluir tarefa</Dialog.Title>

        <Dialog.Description className="mt-2">
          Tem certeza que pretende excluir essa tarefa?
        </Dialog.Description>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            onClick={() => setIsDeleteTaskDialogOpen(false)}
          >
            Cancelar
          </Button>
          <Button onClick={handleDeleteTask}>Excluir tarefa</Button>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  )
}
