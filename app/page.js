
import dynamic from 'next/dynamic'
const DynamicComponent  = dynamic(() => import('@/AllPage/HomePage'))
function Page() {
  return ( <DynamicComponent /> );
}

export default Page;