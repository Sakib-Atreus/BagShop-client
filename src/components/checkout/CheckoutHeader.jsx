
import { BreadcrumbItem, Breadcrumbs } from "@heroui/react";
const CheckoutHeader = () => {
  return (
    <div>
         <div className="bg-gradient-to-r from-[#F1FBFF] via-[#F1EDEB] to-[#F8DAB0] h-[437px] flex flex-col items-center justify-center">
                <h1 className="text-[72px] font-bold">Checkout</h1>
                <div>
                  <Breadcrumbs>
                    <BreadcrumbItem>Home</BreadcrumbItem>
                    <BreadcrumbItem>Checkout</BreadcrumbItem>
                  </Breadcrumbs>
                </div>
              </div>
    </div>
  )
}

export default CheckoutHeader