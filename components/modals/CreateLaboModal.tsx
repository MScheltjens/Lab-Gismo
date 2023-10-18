'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { useCreateLabo } from '@/hooks/useCreateLabo';
import { createLaboratory } from '@/serverActions/createLaboratory';

import { Modal } from '../Modal';
import { Button } from '../ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { toast } from '../ui/use-toast';

const CreateLaboFormSchema = z.object({
  name: z.string().min(1),
});

export const CreateLaboModal = () => {
  const { isOpen, onClose } = useCreateLabo();

  const form = useForm<z.infer<typeof CreateLaboFormSchema>>({
    resolver: zodResolver(CreateLaboFormSchema),
    defaultValues: { name: '' },
  });

  const handleCreateLabo = async (formData: FormData) => {
    const result = await createLaboratory(formData.get('name') as string);
    if (result.success) {
      toast({ variant: 'default', title: 'Success!' });
      form.reset();
      onClose();
      return;
    }
    toast({ variant: 'destructive', title: 'Uh oh! Something went wrong.' });
    form.reset();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title='Create a lab' description='Create a new laboratory and start experimenting'>
      <Form {...form}>
        <form action={handleCreateLabo} className='flex flex-1 flex-col justify-between'>
          <div>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder='ex. Lab-1' />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>
          <div className='mt-6 flex justify-end gap-4'>
            <Button type='button' variant='outline' onClick={onClose} className='w-full sm:w-auto'>
              Cancel
            </Button>
            <Button type='submit' className='w-full sm:w-auto'>
              Create
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};
