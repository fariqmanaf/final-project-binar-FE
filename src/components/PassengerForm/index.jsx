import { Switch } from '@/components/ui/switch';
import { useState } from 'react';
import { BookerFieldComponent, SelectFieldComponent, TypeFieldComponent } from './form-field';
import { BirthOdDate, ExpiredUntil } from './date-picker';
import { countries } from '@/utils/arrayRegion';

export function UserForm({ form }) {
  return (
    <>
      <BookerFieldComponent
        form={form}
        identifier="fullName"
        label="Nama Lengkap"
        placeholder="Masukkan Nama Lengkapmu"
        isUser={true}
      />
      <BookerFieldComponent
        form={form}
        identifier="phoneNumber"
        label="Nomor Telepon"
        placeholder="Masukkan Nomor Teleponmu"
        isUser={true}
      />
      <BookerFieldComponent isUser={true} form={form} identifier="email" label="Email" placeholder="Masukkan Emailmu" />
    </>
  );
}

export function PassengerForm({ form, index }) {
  const [isHaveFamilyName, setIsHaveFamilyName] = useState(false);

  return (
    <>
      <TypeFieldComponent form={form} identifier={`passengers.${index}.Ptype`} />
      <BookerFieldComponent
        form={form}
        identifier={`passengers.${index}.PFullName`}
        label="Nama Lengkap"
        placeholder="Masukkan Nama Lengkapmu"
      />
      <div className="flex flex-row justify-between">
        <p className="text-sm font-medium">Punya Nama Keluarga?</p>
        <Switch
          onCheckedChange={() => {
            setIsHaveFamilyName(!isHaveFamilyName);
          }}
        />
      </div>
      {isHaveFamilyName && (
        <BookerFieldComponent
          form={form}
          identifier={`passengers.${index}.PFamilyName`}
          label="Nama Keluarga"
          placeholder="Masukkan Nama Keluargamu"
        />
      )}
      <BirthOdDate form={form} identifier={`passengers.${index}.PDOB`} label="Tanggal Lahir" />
      <SelectFieldComponent
        form={form}
        identifier={`passengers.${index}.PNationality`}
        label="Kewarganegaraan"
        items={countries}
        placeholder="Pilih Kewarganegaraan"
      />
      <BookerFieldComponent
        form={form}
        identifier={`passengers.${index}.PIdentity`}
        label="KTP / Paspor"
        placeholder="Masukkan Nomor KTP / Paspormu"
      />
      <SelectFieldComponent
        form={form}
        identifier={`passengers.${index}.PCountries`}
        label="Negara Penerbit"
        items={countries}
        placeholder="Pilih Negara"
      />
      <ExpiredUntil form={form} identifier={`passengers.${index}.PExpired`} label="Berlaku Sampai" />
    </>
  );
}
