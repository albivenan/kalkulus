"use client"
import Image from 'next/image';
import React, { useState } from 'react';
import profile from "../../public/albivenanza.jpg"

const sqrt = (value: number): number => {
  if (value < 0) throw new Error('Negative value');
  let x = value;
  let y = (x + value / x) / 2.0;
  while (Math.abs(x - y) > 1e-10) {
    x = y;
    y = (x + value / x) / 2.0;
  }
  return x;
};

const atan2 = (y: number, x: number): number => {
  if (x > 0) return Math.atan(y / x);
  if (x < 0 && y >= 0) return Math.atan(y / x) + Math.PI;
  if (x < 0 && y < 0) return Math.atan(y / x) - Math.PI;
  if (x === 0 && y > 0) return Math.PI / 2;
  if (x === 0 && y < 0) return -Math.PI / 2;
  return 0.0;
};

const derajat = (radians: number): number => radians * 180.0 / Math.PI;
const radians = (derajat: number): number => derajat * Math.PI / 180.0;

const kartesiusKePolar = (x: number, y: number): [number, number] => {
  const r = sqrt(x**2 + y**2);
  const theta = derajat(atan2(y, x));
  return [r, theta];
};

const polarKeKartesius = (r: number, theta: number): [number, number] => {
  const thetaRad = radians(theta);
  const x = r * Math.cos(thetaRad);
  const y = r * Math.sin(thetaRad);
  return [x, y];
};

const Home = () => {
  const [jenisKonversi, setJenisKonversi] = useState<string>('1');
  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);
  const [r, setR] = useState<number>(0);
  const [hasil, setHasil] = useState<string | null>(null);
  const [shaking, setIsShaking] = useState<boolean>(false);
  const [theta, setTheta] = useState<number>(0);

  

  const handleJenisPertanyaan = () => {
    setIsShaking(true);
    setTimeout(() => {
    setIsShaking(false);
  }, 500);
    if (jenisKonversi === '1') {
      const [r, theta] = kartesiusKePolar(x, y);
      setHasil(`Koordinat kartesius dengan nilai (${x}, ${y}) pada koordinat polar adalah sebagai berikut: (r = ${r}, θ = ${theta} derajat)`);
    } else if (jenisKonversi === '2') {
      const [x, y] = polarKeKartesius(r, theta);
      setHasil(`Koordinat polar dengan nilai (r = ${r}, θ = ${theta} derajat) pada koordinat kartesius adalah sebagai berikut: (x = ${x}, y = ${y})`);
    }
  };

  return (
    <div className="screen bg-neutral-100 overflow-hidden mx-auto flex justify-center items-center">
      <div className="phone w-1/2 h-screen flex justify-center items-center">
      <div className="h-full py-8 flex flex-col justify-around items-center">
        <div className="text-lg text-center">
          <h2 className='font-bold'>HASIL KERJA UAS GENAP</h2>
          <h2 className='font-bold'>APLIKASI KONVERSI KOORDINAT POLAR KE KARTESIUS DAN SEBALIKNYA</h2>
          <p className='text-sm mt-'>Diselesaikan guna memenuhi tugas akhir pada mata kuliah Kalkulus II</p>
          <p className='text-sm'>Dosen Pengampu: Buang Budi Wahono, S. Kom., M. Si.</p>
        </div>
        <div className="w-[30vh] h-[30vh] flex justify-center items-center image">
          <Image src={profile} className='hover:opacity-50 duration-200' style={{width: '20vh', height: '20vh', borderRadius: '100%', objectFit: 'cover', objectPosition: 'top', transform: 'rotate(-40deg)'}} alt='profile' />
        </div>
        <div className="-mt-4 text-sm text-center flex gap-x-8">
          <p>Gei Zhinjian Albivenanza</p>
          <p>(231240001467)</p>
        </div>
        <div className="font-bold text-lg text-center">
          <h2>PROGRAM STUDI TEKNIK INFORMATIKA</h2>
          <h2>FAKULTAS SAINS DAN TEKNOLOGI</h2>
          <h2>UNIVERSITAS ISLAM NAHDLATUL ULAMA JEPARA</h2>
          <h2>TAHUN AKADEMIK 2023/2024</h2>
        </div>
      </div>
      </div>


      <div className="phone w-1/2 h-screen pr-8 relative rounded-l-3xl shadow-xl overflow-hidden">
      <div className="background absolute w-[200vh] h-[200vh]"></div>

      <div className='px-8 grid gap-y-6 py-6 z-1 relative'>
      <h1 className='text-3xl font-extrabold text-center mb-2'>Aplikasi Konversi koordinat Polar ke Kartesius dan Sebaliknya</h1>
      <div className='grid gap-y-2'>
        <label className='font-bold text-lg'>Pilih jenis konversi:</label>
        <select value={jenisKonversi} onChange={(e) => setJenisKonversi(e.target.value)} className='p-2 rounded-xl focus:border-neutral-700'>
          <option value="1">Kartesius ke Polar</option>
          <option value="2">Polar ke Kartesius</option>
        </select>
      </div>
      {jenisKonversi === '1' && (
        <div className='grid gap-y-4'>
          <div className='grid gap-y-2'>
            <label className='font-bold'>Masukkan koordinat x: </label>
            <input type="number" value={x} onChange={(e) => setX(parseFloat(e.target.value))} className='p-2 rounded-xl focus:border-neutral-700' />
          </div>
          <div className='grid gap-y-2'>
            <label className='font-bold text-lg'>Masukkan koordinat y: </label>
            <input type="number" value={y} onChange={(e) => setY(parseFloat(e.target.value))} className='p-2 rounded-xl focus:border-neutral-700'/>
          </div>
        </div>
      )}
      {jenisKonversi === '2' && (
        <div className='grid gap-y-4'>
          <div className='grid gap-y-2'>
            <label className='font-bold text-lg'>Masukkan koordinat r: </label>
            <input type="number" value={r} onChange={(e) => setR(parseFloat(e.target.value))} className='p-2 rounded-xl focus:border-neutral-700'/>
          </div>
          <div className='grid gap-y-2'>
            <label className='font-bold text-lg'>Masukkan sudut θ dalam derajat: </label>
            <input type="number" value={theta} onChange={(e) => setTheta(parseFloat(e.target.value))} className='p-2 rounded-xl focus:border-neutral-700'/>
          </div>
        </div>
      )}
      <button onClick={handleJenisPertanyaan} className='font-bold text-xl bg-neutral-700 text-white px-4 py-2 w-[60%] mx-auto rounded-full hover:bg-neutral-900 duration-300'>Convert</button>
      <div className={`relative border-2 border-black px-2 py-6 rounded-2xl mt-4 bg-white ${shaking && 'shake'}`}>
        <p className="absolute font-bold text-lg -top-[30%] bg-neutral-700 text-white px-4 py-2 rounded-xl">Hasil:</p>
        {hasil ? <p className='font-bold px-2'>{hasil}</p> : <p className='opacity-50 px-2'>Opsss .... Silakan masukkan angka terlebih dahulu untuk mengetahui hasil konversi</p>
}
      </div>
      </div>

      
      </div>
    </div>
  );
};

export default Home;
