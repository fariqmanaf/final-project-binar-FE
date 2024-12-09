import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const DataPembayaran = ({ data }) => {
  return (
    <Accordion type="single" collapsible className="flex flex-col gap-5">
      <h1 className="font-bold text-2xl">Isi Data Pembayaran</h1>
      {data.map((item, index) => (
        <AccordionItem key={index} value={`item-${index + 1}`} className="flex flex-col">
          <AccordionTrigger className="rounded-md bg-[#3C3C3C] text-white px-8">{item.title}</AccordionTrigger>
          <AccordionContent className="p-8">{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default DataPembayaran;
