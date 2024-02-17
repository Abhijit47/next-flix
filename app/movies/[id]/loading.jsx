import { SvgSpinners3DotsScale } from '@/assets/icons';

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className='grid h-screen place-items-center'>
      <SvgSpinners3DotsScale className='h-20 w-20' />;
    </div>
  );
}
