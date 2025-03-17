import { Pen, Trash } from 'lucide-react'
import { twJoin } from 'tailwind-merge'

import { Button, Checkbox, Dialog, Input, Textarea } from '@app/components'

export function Task() {
  return (
    <div className="flex w-full items-center rounded-md bg-zinc-950 p-4">
      <Checkbox id="task" />
      <label
        htmlFor="task"
        className={twJoin('ml-2 flex-1 text-sm text-white')}
      >
        Task de teste
      </label>

      <div className="flex space-x-1">
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <Button group="icon" variant="ghost">
              <Pen size={16} />
            </Button>
          </Dialog.Trigger>

          <Dialog.Content>
            <Dialog.Title>Editar tarefa</Dialog.Title>
            <form className="mt-4 w-full space-y-4">
              <Input placeholder="Título" />
              <Textarea placeholder="Descrição" />
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline">Cancelar</Button>
                <Button>Editar tarefa</Button>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Root>

        <Dialog.Root>
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
              <Button variant="outline">Cancelar</Button>
              <Button>Excluir tarefa</Button>
            </div>
          </Dialog.Content>
        </Dialog.Root>
      </div>
    </div>
  )
}
