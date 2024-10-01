
import dynamic from 'next/dynamic'
const DynamicComponent  = dynamic(() => import('@/AllPage/MovieCaterogy'))

export async function generateMetadata({ params }) {
  const id = params.caterogy;
  const response = await fetch(`${process.env.NEXT_BASE_URL}/api/caterogys/${id}`);
  const caterogy = await response.json();
  if (caterogy) {
    return {
      title: caterogy.title,
    };
  }
}

function Page() {
  return (  
    <DynamicComponent />
  );
}

export default Page;