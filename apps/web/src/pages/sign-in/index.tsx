import { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { Link, useLocation } from 'wouter'

import { Button, Input } from '@app/components'
import { useToast } from '@app/components/toast/use-toast'

import { HttpUsersService } from '@app/services/users.service'

export type SignInForm = {
  password: string
  username: string
}

export function SignInPage() {
  const { handleSubmit, register } = useForm<SignInForm>()

  const [, setLocation] = useLocation()

  const { toast } = useToast()

  async function handleSubmitSignInForm(formData: SignInForm) {
    const userService = HttpUsersService.create()

    try {
      const { data } = await userService.auth(formData)

      localStorage.setItem('access_token', data.access_token)

      setLocation('/app')
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error)

        if (error.status === 401) {
          return toast({
            description: 'As credenciais do usuário estão incorretas.',
            title: 'Erro ao entrar com o usuário',
            variant: 'error'
          })
        }

        return toast({
          description: 'Ocorreu um erro ao entrar com o usuário informado.',
          title: `Erro ao entrar com o usuário (Code: ${error.status})`,
          variant: 'error'
        })
      }
    }
  }

  return (
    <section className="flex h-screen w-full items-center bg-zinc-950">
      <div className="mx-auto w-full max-w-[484px] space-y-8">
        <header>
          <h1 className="mt-6 mb-2 text-2xl font-bold text-white">
            Entre com a sua conta
          </h1>
          <span className="block text-sm text-zinc-400">
            Não possui uma conta ainda?{' '}
            <Link className="text-blue-500 hover:underline" href="/">
              Cadastre-se aqui
            </Link>
          </span>
        </header>

        <form
          className="space-y-4"
          onSubmit={handleSubmit(handleSubmitSignInForm)}
        >
          <div className="space-y-2">
            <label
              className="block text-sm font-medium text-zinc-400"
              htmlFor="companyName"
            >
              Nome de usuário
            </label>
            <Input placeholder="John Doe" {...register('username')} />
          </div>

          <div className="space-y-2">
            <label
              className="block text-sm font-medium text-zinc-400"
              htmlFor="password"
            >
              Senha
            </label>
            <Input
              type="password"
              placeholder="••••••••"
              {...register('password')}
            />
          </div>

          <Button type="submit" className="mt-8 w-full font-medium">
            Entrar
          </Button>
        </form>
      </div>
    </section>
  )
}
