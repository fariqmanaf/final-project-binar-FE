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

export function PassengerForm({ form, index, type }) {
  const [isHaveFamilyName, setIsHaveFamilyName] = useState(false);

  const items = [
    { value: 'Mr.', label: 'Mr.' },
    { value: 'Mrs.', label: 'Mrs.' },
    { value: 'Miss.', label: 'Miss.' },
  ];

  return (
    <>
      <TypeFieldComponent form={form} identifier={`passengers.${index}.Ptype`} />
      <SelectFieldComponent
        form={form}
        identifier={`passengers.${index}.Ptitle`}
        label="Title"
        items={items}
        placeholder="Pilih Title Untuk Penumpang"
      />
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
      <BookerFieldComponent
        form={form}
        identifier={`passengers.${index}.PNationality`}
        label="Kewarganegaraan"
        placeholder="Masukkan Kewarganegaraanmu"
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
