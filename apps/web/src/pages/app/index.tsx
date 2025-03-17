import { ListTodo, Plus } from 'lucide-react'

import { Button, Dialog, Input, Textarea } from '@app/components'

import { Task } from './components'

export function AppPage() {
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

          <Dialog.Root>
            <Dialog.Trigger asChild>
              <Button className="mt-6 w-full">
                Criar tarefa <Plus size={18} />
              </Button>
            </Dialog.Trigger>
            <Dialog.Content>
              <Dialog.Title>Criar tarefa</Dialog.Title>
              <form className="mt-4 w-full space-y-4">
                <Input placeholder="Título" />
                <Textarea placeholder="Descrição" />
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline">Cancelar</Button>
                  <Button>Criar tarefa</Button>
                </div>
              </form>
            </Dialog.Content>
          </Dialog.Root>
        </div>
      </header>

      <section className="w-full flex-1">
        <main className="mx-auto h-full w-full max-w-4xl px-16 py-8">
          <div className="flex w-full items-center justify-between border-b-2 border-zinc-800 pb-6">
            <div className="flex items-center gap-2 text-white">
              <span className="text-sm">Tarefas criadas</span>
              <span className="py-x block rounded-full bg-white px-1.5 text-center text-sm text-black">
                0
              </span>
            </div>

            <div className="flex items-center gap-2 text-white">
              <span className="text-sm">Tarefas concluídas</span>
              <span className="py-x block rounded-full bg-white px-1.5 text-center text-sm text-black">
                0 de 0
              </span>
            </div>
          </div>

          <section className="mt-6 space-y-3">
            <Task />
          </section>
        </main>
      </section>
    </section>
  )
}
