import Image from "next/image";
import Link from "next/link";
import { BiClipboard} from 'react-icons/bi';
import { MdSocialDistance } from 'react-icons/md';
import { GiWeightLiftingUp } from 'react-icons/gi';

export default function Home() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-23 h-[100vh]">
      <div className="h-full flex justify-center rows-bg flex-col items-center">
        <p className="text-[70px] font-bold">Gym<span className='text-primary'>Social</span></p>
        <p className="text-2xl font-medium">The go-to social network for fitness enthusiasts.</p>
        <div className="flex gap-2 items-center mt-8">
          <Link href="/register" className="block rounded-sm border-2 border-primary text-primary font-semibold px-2 py-1">Get Started</Link>
          <Link href="/login" className="block rounded-sm bg-primary text-white font-semibold px-2 py-1">Login</Link>
        </div>
      </div>
      <div className=" flex items-center justify-center flex-col gap-2 pr-8">
        <div className="border border-dg-200 rounded-md px-4 py-2 w-full">
          <p className="flex items-center gap-2 text-lg font-medium"><BiClipboard />Track your progress</p>
          <p className="text-sm mt-2">Our easy-to-use workout tracker lets you easily keep track of your exercises, sets, and reps, and monitor your progress over time.</p>
        </div>
        <div className="border  border-dg-200 rounded-md px-4 py-2 w-full">
          <p className="flex items-center gap-2 text-lg font-medium"><MdSocialDistance />Connect with others</p>
          <p className="text-sm mt-2">Share your workouts, get inspiration, and connect with a community of like-minded fitness enthusiasts.</p>
        </div>
        <div className="border border-dg-200 rounded-md px-4 py-2 w-full">
          <p className="flex items-center gap-2 text-lg font-medium"><GiWeightLiftingUp />Personalized reccomendations</p>
          <p className="text-sm mt-2">Get personalized workout recommendations based on your fitness level and goals, and take your fitness journey to the next level.</p>
        </div>
      </div>
    </div>
  );
}
