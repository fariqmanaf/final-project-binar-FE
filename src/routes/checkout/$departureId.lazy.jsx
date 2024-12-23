import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { BreadCrumb } from '@/components/Breadcrumb';
import Navbar from '@/components/Navbar';
import { UserForm, PassengerForm } from '@/components/PassengerForm';
import { Button } from '@/components/ui/button';
import { DetailFlight, Pricing } from '@/components/PassengerForm/detail-flight';
import { Seat } from '@/components/Seat';
import { getFlightById, createBooking } from '@/Services/auth/checkout';
import { useMutation, useQuery } from '@tanstack/react-query';
import toast, { Toaster } from 'react-hot-toast';
import ReactLoading from 'react-loading';
import { motion } from 'motion/react';
import { mapping, mappingPassenger } from '@/utils/mappingClass';

export const Route = createLazyFileRoute('/checkout/$departureId')({
  component: RouteComponent,
});

function RouteComponent() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const searchParams = Route.useSearch();

  const passenger = [
    {
      type: 'ADULT',
      quantity: searchParams?.A ? parseInt(searchParams?.A) : 0,
    },
    {
      type: 'CHILD',
      quantity: searchParams?.C ? parseInt(searchParams?.C) : 0,
    },
    {
      type: 'INFANT',
      quantity: searchParams?.I ? parseInt(searchParams?.I) : 0,
    },
  ];

  const flightId = Route.useParams().departureId;
  const returnFlightId = searchParams?.returnId;
  const token = useSelector((state) => state.auth.token);
  const userState = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const passengerWithoutInfant = passenger.filter((passengerType) => passengerType.type !== 'INFANT');
  const maxPassenger = passengerWithoutInfant.reduce((acc, curr) => acc + curr.quantity, 0);

  const [seats, setSeats] = useState([]);
  const [returnSeats, setReturnSeats] = useState([]);
  const [selectedReturnSeats, setSelectedReturnSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [flightData, setFlightData] = useState([]);
  const [user, setUser] = useState(userState);

  const {
    data: flight,
    isLoading,
    isSuccess,
    isError,
  } = useQuery({
    queryKey: ['flight', flightId],
    queryFn: () => getFlightById(flightId, returnFlightId),
  });

  const { mutate: createBookingMutate, isPending: isPendingMutate } = useMutation({
    mutationFn: (data) => createBooking(data),
    onSuccess: (dataSuccess) => {
      navigate({ to: `/payment/${dataSuccess.data?.transactionId}` });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  useEffect(() => {
    if (!token) {
      navigate({ to: '/auth/login' });
    }
  }, [token, navigate]);

  useEffect(() => {
    if (isSuccess && flight) {
      setFlightData(flight);
      setSeats(flight.departureFlight?.flightSeats);
      setReturnSeats(flight.returnFlight?.flightSeats);
    } else if (isError) {
      toast.error('Data penerbangan tidak ditemukan', {
        duration: 5000,
      });
    }
  }, [flight, isSuccess, isError]);

  const passengerSchema = z.object({
    PDOB: z.date(),
    PFullName: z.string().nonempty({ message: 'Nama Lengkap harus diisi' }),
    PFamilyName: z.string().optional(),
    PNationality: z.string().nonempty({ message: 'Kewarganegaraan harus diisi' }),
    PIdentity: z.string().nonempty({ message: 'Nomor Identitas harus diisi' }),
    PCountries: z.string().nonempty({ message: 'Negara harus diisi' }),
    PExpired: z.date(),
    PType: z.string(),
  });

  const formSchema = z.object({
    fullName: z.string().min(3, { message: 'Nama Lengkap minimal 3 karakter' }).optional(),
    familyName: z.string().optional(),
    phoneNumber: z
      .string()
      .regex(/^\+62\d+$/, { message: 'Nomor Telepon harus berupa angka' })
      .min(11, { message: 'Nomor Telepon minimal 11 karakter' })
      .optional(),
    email: z.string().email({ message: 'Email tidak valid' }).optional(),
    passengers: z.array(passengerSchema),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: user?.name,
      phoneNumber: user?.phoneNumber,
      email: user?.email,
      passengers: passenger.flatMap((passengerType) =>
        Array.from({ length: passengerType.quantity }, () => ({
          PDOB: undefined,
          PFullName: '',
          PFamilyName: '',
          PNationality: '',
          PIdentity: '',
          PCountries: '',
          PExpired: undefined,
          PType: passengerType.type,
        }))
      ),
    },
    mode: 'onChange',
  });

  function formatDate(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function onSubmit(values) {
    const departureSeats = selectedSeats.map((seat) => seat.id);
    const returnSeat = selectedReturnSeats.map((seat) => seat.id);

    const data = {
      departureFlightId: flightData.departureFlight.id,
      returnFlightId: flightData?.returnFlight?.id,
      passengers: values.passengers.map((passenger, index) => ({
        type: passenger.PType,
        name: passenger.PFullName,
        birthDate: formatDate(passenger.PDOB),
        identityNumber: passenger.PIdentity,
        identityExpirationDate: formatDate(passenger.PExpired),
        identityNationality: passenger.PNationality,
        departureFlightSeatId: departureSeats[index],
        returnFlightSeatId: returnSeat[index],
      })),
    };

    createBookingMutate(data);
  }

  const handleSeatSelection = (seat) => {
    if (selectedSeats.find((s) => s.id === seat.id)) {
      setSelectedSeats((prev) => prev.filter((s) => s.id !== seat.id));
    } else {
      if (selectedSeats.length < maxPassenger) {
        setSelectedSeats((prev) => [...prev, seat]);
      } else {
        toast.error(`Anda hanya dapat memilih ${maxPassenger} kursi.`);
      }
    }
  };

  const handleSeatSelectionReturn = (seat) => {
    if (selectedReturnSeats.find((s) => s.id === seat.id)) {
      setSelectedReturnSeats((prev) => prev.filter((s) => s.id !== seat.id));
    } else {
      if (selectedReturnSeats.length < maxPassenger) {
        setSelectedReturnSeats((prev) => [...prev, seat]);
      } else {
        toast.error(`Anda hanya dapat memilih ${maxPassenger} kursi.`);
      }
    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Navbar isAuth={true} searchBar={true} />
      {isLoading && (
        <div className="flex justify-center items-center w-screen h-[90vh]">
          <ReactLoading type="spin" color="#7126B5" />
        </div>
      )}
      {isError ? (
        <div className="w-screen h-[90vh] flex justify-center items-center">Flight Not Found</div>
      ) : (
        <>
          <div className="w-screen h-[10vh] md:px-[10rem] px-[3rem] py-[3rem]">
            <BreadCrumb active="checkout" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="flex md:flex-row-reverse flex-col w-screen px-[10vw] gap-[3vw]"
          >
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="flex flex-col gap-[1rem] md:w-[40%]"
            >
              <DetailFlight data={flightData.departureFlight} returnData={false} />
              {flightData?.returnFlight && <DetailFlight data={flightData.returnFlight} returnData={true} />}
              <Pricing data={flightData} passenger={passenger} />
            </motion.div>
            <div className="md:w-[60%]">
              <Form {...form} id="form">
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 mb-5">
                  <div className="p-[1.5rem] border border-slate-300 rounded-lg">
                    <p className="font-semibold text-xl">Isi Data Pemesan</p>
                    <p className="bg-gray-700 text-white text-sm py-2 px-4 my-[3vh] rounded-t-xl">Data Diri Pemesan</p>
                    <UserForm form={form} />
                  </div>
                  <div className="p-[1.5rem] border border-slate-300 rounded-lg">
                    <p className="font-semibold text-xl">Isi Data Penumpang</p>
                    {passenger.map((passengerType, typeIndex) =>
                      Array.from({ length: passengerType.quantity }, (_, index) => {
                        const globalIndex =
                          passenger.slice(0, typeIndex).reduce((acc, curr) => acc + curr.quantity, 0) + index;

                        return (
                          <div key={globalIndex}>
                            <p className="bg-gray-700 text-white text-sm py-2 px-4 my-[3vh] rounded-t-xl">
                              Data Diri Penumpang {globalIndex + 1} - {mappingPassenger[passengerType.type]}
                            </p>
                            <div className="space-y-5">
                              <PassengerForm form={form} index={globalIndex} />
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                  <div className="p-[1.5rem] border border-slate-300 rounded-lg">
                    <p className="font-semibold text-xl">Pilih Kursi</p>
                    <p className="bg-green-500 text-center text-white text-sm py-2 px-4 my-[3vh] rounded-md">
                      {mapping[flightData.departureFlight?.type]} -{' '}
                      {flightData.departureFlight?.flightSeats.filter((seat) => seat.status === 'AVAILABLE').length}{' '}
                      Kursi Tersedia
                    </p>
                    <Seat
                      maxCol={
                        flightData.departureFlight?.airplane.maxColumn % 2 === 0
                          ? flightData.departureFlight?.airplane.maxColumn
                          : flightData.departureFlight?.airplane.maxColumn + 1
                      }
                      seats={seats}
                      handleSeatSelection={handleSeatSelection}
                      selectedSeats={selectedSeats}
                    />
                    {flightData?.returnFlight && (
                      <div className="mt-[10vh]">
                        <p className="bg-green-500 text-center text-white text-sm py-2 px-4 my-[3vh] rounded-md">
                          {mapping[flightData.returnFlight?.type]} -{' '}
                          {flightData.returnFlight?.flightSeats.filter((seat) => seat.status === 'AVAILABLE').length}{' '}
                          Kursi Tersedia (Return)
                        </p>
                        <Seat
                          maxCol={
                            flightData.returnFlight?.airplane.maxColumn % 2 === 0
                              ? flightData.returnFlight?.airplane.maxColumn
                              : flightData.returnFlight?.airplane.maxColumn + 1
                          }
                          seats={returnSeats}
                          handleSeatSelection={handleSeatSelectionReturn}
                          selectedSeats={selectedReturnSeats}
                        />
                      </div>
                    )}
                  </div>
                  <Button type="submit" className="w-full rounded-xl mt-3 bg-[#7126B5] h-12 hover:bg-[#4c0f85]">
                    {isPendingMutate ? (
                      <ReactLoading
                        type={'spin'}
                        color={'#FFFFFF'}
                        height={'15%'}
                        width={'15%'}
                        className="flex justify-center items-center"
                      />
                    ) : (
                      <p>Bayar</p>
                    )}{' '}
                  </Button>
                </form>
              </Form>
            </div>
          </motion.div>
        </>
      )}
    </>
  );
}
