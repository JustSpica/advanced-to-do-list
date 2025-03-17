import { Link } from 'wouter'

import { Button, Input } from '@app/components'

export function SignUpPage() {
  return (
    <section className="flex h-screen w-full items-center bg-zinc-950">
      <div className="mx-auto w-full max-w-[484px] space-y-8">
        <header>
          <h1 className="mt-6 mb-2 text-2xl font-bold text-white">
            Crie sua conta
          </h1>
          <span className="block text-sm text-zinc-400">
            Já possui uma conta?{' '}
            <Link className="text-blue-500 hover:underline" href="/sign-in">
              Entre aqui
            </Link>
          </span>
        </header>

        <form className="space-y-4">
          <div className="space-y-2">
            <label
              className="block text-sm font-medium text-zinc-400"
              htmlFor="companyName"
            >
              Nome de usuário
            </label>
            <Input placeholder="John Doe" />
          </div>

          <div className="space-y-2">
            <label
              className="block text-sm font-medium text-zinc-400"
              htmlFor="password"
            >
              Senha
            </label>
            <Input type="password" placeholder="••••••••" />
          </div>

          <div className="space-y-2">
            <label
              className="block text-sm font-medium text-zinc-400"
              htmlFor="password"
            >
              Confirme sua senha
            </label>
            <Input type="password" placeholder="••••••••" />
          </div>

          <Button type="submit" className="mt-8 w-full font-medium">
            Criar conta
          </Button>
        </form>
      </div>
    </section>
  )
}
