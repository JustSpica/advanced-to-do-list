import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { ChevronLeft, ChevronRight, ListTodo, Plus } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { Button, Dialog, Input, Textarea } from '@app/components'
import { useToast } from '@app/components/toast/use-toast'

import { HttpTasksService } from '@app/services/tasks.service'

import { Task } from './components'

type NewTaskForm = {
  description: string
  title: string
}

export function AppPage() {
  const taskService = HttpTasksService.create()

  const [isNewTaskDialogOpen, setIsNewTaskDialogOpen] = useState(false)
  const [limit, setLimit] = useState(1)
  const [page, setPage] = useState(1)

  const { toast } = useToast()

  const { handleSubmit, register, reset } = useForm<NewTaskForm>()

  const { data, refetch } = useQuery({
    queryKey: ['find-many-tasks-query', page],
    queryFn: async () => {
      const { data } = await taskService.findMany(page)

      const newLimit = Math.ceil(data.metadata.count / 5)

      if (newLimit > 1) {
        setLimit(newLimit)
      }

      return data
    }
  })

  async function handleSubmitNewTask(formData: NewTaskForm) {
    try {
      await taskService.create(formData)

      refetch()
      reset()
      setIsNewTaskDialogOpen(false)

      toast({
        description: '',
        title: 'Tarefa criada com sucesso.',
        variant: 'success'
      })
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error)

        return toast({
          description: 'Ocorreu um erro inesperado ao criar a tarefa.',
          title: `Erro ao criar uma tarefa (Code: ${error.status})`,
          variant: 'error'
        })
      }
    }
  }

  function handleBackPage() {
    setPage((prevState) => {
      if (prevState === 1) return prevState

      return prevState - 1
    })
  }

  function handleNextPage() {
    setPage((prevState) => {
      if (prevState === limit) return prevState

      return prevState + 1
    })
  }

  return (
    <section className="flex min-h-screen w-full flex-col bg-zinc-950/98">
      <header className="flex h-80 w-full items-center justify-center bg-zinc-950">
        <div className="flex max-w-96 flex-col items-center space-y-4">
          <div className="flex items-center gap-2 text-white">
            <ListTodo size={32} />
            <h1 className="text-3xl font-semibold">To-do list</h1>
          </div>

          <span className="block text-center text-zinc-500">
            Gerencie suas tarefas de forma simples, prática e eficiente para um
            dia mais produtivo!
          </span>

          <Dialog.Root
            open={isNewTaskDialogOpen}
            onOpenChange={setIsNewTaskDialogOpen}
          >
            <Dialog.Trigger asChild>
              <Button className="mt-6 w-full">
                Criar tarefa <Plus size={18} />
              </Button>
            </Dialog.Trigger>
            <Dialog.Content>
              <Dialog.Title>Criar tarefa</Dialog.Title>
              <form
                className="mt-4 w-full space-y-4"
                onSubmit={handleSubmit(handleSubmitNewTask)}
              >
                <Input placeholder="Título" {...register('title')} />
                <Textarea
                  placeholder="Descrição"
                  {...register('description')}
                />
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsNewTaskDialogOpen(false)}
                  >
                    Cancelar
                  </Button>
                  <Button type="submit">Criar tarefa</Button>
                </div>
              </form>
            </Dialog.Content>
          </Dialog.Root>
        </div>
      </header>

      <section className="w-full flex-1">
        <main className="mx-auto h-full w-full max-w-4xl px-16 py-8">
          <div className="flex w-full items-center gap-2 border-b-2 border-zinc-800 pb-6 text-white">
            <span className="text-sm">Tarefas criadas</span>
            <span className="py-x block rounded-full bg-white px-1.5 text-center text-sm text-black">
              {data?.metadata.count}
            </span>
          </div>

          <section className="mt-6 space-y-3">
            {data?.tasks?.map((task) => <Task key={task.id} task={task} />)}
          </section>

          <div className="mt-4 flex items-center justify-end gap-4">
            <Button group="icon" variant="outline" onClick={handleBackPage}>
              <ChevronLeft size={18} />
            </Button>
            <span className="block text-white">{page}</span>
            <Button group="icon" variant="outline" onClick={handleNextPage}>
              <ChevronRight size={18} />
            </Button>
          </div>
        </main>
      </section>
    </section>
  )
}
