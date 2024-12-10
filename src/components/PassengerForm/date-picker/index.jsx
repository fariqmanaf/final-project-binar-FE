import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { FaCalendarAlt } from 'react-icons/fa';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export function BirthOdDate({ form, identifier, label }) {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState(null);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const limitUser = currentYear - 60;

  return (
    <FormField
      control={form.control}
      name={identifier}
      render={({ field }) => (
        <FormItem className="flex flex-col w-full">
          <FormLabel className="text-[#7126B5] text-sm font-semibold">{label}</FormLabel>
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={'outline'}
                  className={cn('w-full font-normal', !field.value && 'text-muted-foreground')}
                >
                  {field.value ? `${format(field.value, 'PPP')}` : <span>Pick a date</span>}
                  <FaCalendarAlt className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                captionLayout="dropdown"
                selected={date || field.value}
                onSelect={(selectedDate) => {
                  setDate(selectedDate);
                  field.onChange(selectedDate);
                }}
                onDayClick={() => setIsOpen(false)}
                fromYear={limitUser}
                toYear={currentYear}
                defaultMonth={field.value}
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function ExpiredUntil({ form, identifier, label }) {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState(null);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const limitExpired = currentYear + 40;

  return (
    <FormField
      control={form.control}
      name={identifier}
      render={({ field }) => (
        <FormItem className="flex flex-col w-full">
          <FormLabel className="text-[#7126B5] text-sm font-semibold">{label}</FormLabel>
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={'outline'}
                  className={cn('w-full font-normal', !field.value && 'text-muted-foreground')}
                >
                  {field.value ? `${format(field.value, 'PPP')}` : <span>Pick a date</span>}
                  <FaCalendarAlt className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                captionLayout="dropdown"
                selected={date || field.value}
                onSelect={(selectedDate) => {
                  setDate(selectedDate);
                  field.onChange(selectedDate);
                }}
                onDayClick={() => setIsOpen(false)}
                fromYear={currentYear}
                toYear={limitExpired}
                defaultMonth={field.value}
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
