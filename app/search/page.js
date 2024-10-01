

import dynamic from 'next/dynamic'
const DynamicComponent  = dynamic(() => import('@/AllPage/Search'))

export async function generateMetadata({ searchParams }) {
  const title = searchParams.query;
  if (title) {
    return {
      title: title,
    };
  }
}

function Page() {
  return <DynamicComponent  />;
}

export default Page;
