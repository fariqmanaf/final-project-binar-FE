import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const CardFav = ({ fav }) => {
  const { departureAirport, destinationAirport, type, price, departureTimestamp, arrivalTimestamp } = fav;

  return (
    <Card className="rounded-lg shadow-lg overflow-hidden max-w-56">
      <div className="relative">
        <img
          src={destinationAirport.image} // Use the departure airport image
          alt="Destination"
          className="w-full h-36 object-cover p-3 rounded-2xl"
        />
        {/* <div className="absolute top-0 right-0 mt-3 -mr-1">
          <img
            src={destinationAirport.image} // Use the destination airport image as labelImage
            alt="Label"
            className="w-40 h-8"
          />
        </div> */}
      </div>
      <CardHeader className="p-4 py-0">
        <CardTitle className="text-sm py-0">{`${departureAirport.city} -> ${destinationAirport.city}`}</CardTitle>
        <CardDescription className="font-bold text-[#7126B5] text-sm py-0">{type}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 py-1 text-sm">
        <p>{`${new Date(departureTimestamp).toLocaleDateString('id-ID', { day: 'numeric' })} - ${new Date(arrivalTimestamp).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}`}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 text-sm">
        <p>
          Mulai dari{' '}
          <span className="font-bold text-[#FF0000]">{`${new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price)}`}</span>
        </p>
      </CardFooter>
    </Card>
  );
};

export default CardFav;
