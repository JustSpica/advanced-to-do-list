import { useState } from 'react'
import { AxiosError } from 'axios'
import { Pen } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { Button, Dialog, Input, Textarea } from '@app/components'
import { useToast } from '@app/components/toast/use-toast'
import { queryClient } from '@app/lib/react-query'
import { HttpTasksService } from '@app/services/tasks.service'

type EditTaskForm = {
  description: string
  title: string
}

type EditTaskDialogProps = {
  taskId: string
  description: string
  title: string
}

export function EditTaskDialog({
  description,
  taskId,
  title
}: EditTaskDialogProps) {
  const taskService = HttpTasksService.create()

  const [isEditTaskDialogOpen, setIsEditTaskDialogOpen] = useState(false)

  const { handleSubmit, register } = useForm<EditTaskForm>({
    defaultValues: {
      description,
      title
    }
  })

  const { toast } = useToast()

  async function handleEditTask(formData: EditTaskForm) {
    try {
      await taskService.save(taskId, formData)

      queryClient.invalidateQueries({ queryKey: ['find-many-tasks-query'] })

      setIsEditTaskDialogOpen(false)

      toast({
        description: 'A tarefa selecionada foi atualizada com sucesso.',
        title: 'Tarefa atualizada com sucesso.',
        variant: 'success'
      })
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error)

        if (error.status === 403) {
          return toast({
            description:
              'Usuário não possui permissão para atualizar essa tarefa.',
            title: 'Usuário não possui permissão.',
            variant: 'error'
          })
        }

        return toast({
          description: 'Ocorreu um erro ao atualizar a tarefa.',
          title: `Erro ao atualizar tarefa (Code: ${error.status})`,
          variant: 'error'
        })
      }
    }
  }

  return (
    <Dialog.Root
      open={isEditTaskDialogOpen}
      onOpenChange={setIsEditTaskDialogOpen}
    >
      <Dialog.Trigger asChild>
        <Button group="icon" variant="ghost">
          <Pen size={16} />
        </Button>
      </Dialog.Trigger>

      <Dialog.Content>
        <Dialog.Title>Editar tarefa</Dialog.Title>
        <form
          className="mt-4 w-full space-y-4"
          onSubmit={handleSubmit(handleEditTask)}
        >
          <Input placeholder="Título" {...register('title')} />
          <Textarea placeholder="Descrição" {...register('description')} />
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline">Cancelar</Button>
            <Button type="submit">Editar tarefa</Button>
          </div>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  )
}
