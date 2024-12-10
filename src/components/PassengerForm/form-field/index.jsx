import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function BookerFieldComponent({ form, identifier, label, placeholder, isUser }) {
  return (
    <FormField
      control={form.control}
      name={identifier}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-[#7126B5] text-sm font-semibold">{label}</FormLabel>
          <FormControl>
            <div className="w-full">
              <Input
                {...field}
                disabled={isUser}
                className="rounded-xl"
                onBlur={field.onBlur}
                placeholder={placeholder}
              />
            </div>
          </FormControl>
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );
}

export function TypeFieldComponent({ form, identifier }) {
  return (
    <FormField
      control={form.control}
      name={identifier}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input {...field} className="rounded-xl hidden" />
          </FormControl>
        </FormItem>
      )}
    />
  );
}

export function SelectFieldComponent({ form, identifier, label, items, placeholder }) {
  return (
    <FormField
      control={form.control}
      name={identifier}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel className="text-[#7126B5] text-sm font-semibold">{label}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {items.length > 0 &&
                items.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
