'use client';

import { JSX } from 'react';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { checkYamlExist } from '@/lib/yamlHandler';

const loginSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
});

const Main = (): JSX.Element => {
  const router = useRouter();
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    const username = data.name.toLowerCase();
    const isExist = await checkYamlExist(data.name);

    if (isExist) {
      Cookies.set('user', data.name, { expires: 7 });
      router.replace('/');
    } else {
      setError('name', {
        type: 'manual',
        message: 'Username is invalid!',
      });
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <form
        action={handleSubmit(onSubmit)}
        className="max-w-[350px] w-full flex flex-col gap-y-2"
      >
        <Field>
          <FieldLabel htmlFor="input-id">Name</FieldLabel>
          <Input placeholder="Enter Name" {...register('name')} />
          {errors?.name && <FieldError>{errors?.name?.message}</FieldError>}
        </Field>
        <Button className="cursor-pointer self-end" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Main;
