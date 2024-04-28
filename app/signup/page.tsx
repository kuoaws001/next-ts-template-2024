'use client'

import { useForm } from 'react-hook-form'
import { UserBase } from '@/models/user'

const page = () => {

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = (data: UserBase) => {
    console.log(data)
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-3'>
          <input
            type="text"
            className='form-control'
            {...register('email', {
              required: 'email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "invalid email address"
              }
            })}
            placeholder="Email"
            autoComplete='off'
          />
          <div className='form-text'>{errors.email?.message}</div>
        </div>
        <div className='mb-3'>
          <input
            type='password'
            className='form-control'
            {...register('password', { required: 'password is required' })}
            placeholder="Password"
          />
          <div className='form-text'>{errors.password?.message}</div>
        </div>
        <button type="submit" className="btn btn-primary">Add</button>
      </form>
    </div>
  )
}

export default page