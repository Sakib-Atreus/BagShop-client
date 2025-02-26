import { Tabs, Tab, Card, CardBody, Divider } from "@heroui/react";
import AddReview from "./AddReview";
import Review from "./Review";
import { AuthContext } from "@/hooks/AuthContextProvider";
import { useContext } from "react";


export default function ReviewTab({ product }) {
    const { user } = useContext(AuthContext);
    const userId = user?.userId;
    console.log(product, "Productg in review tab line 11")
    const productId = product?._id;
    return (
        <div className="flex w-full flex-col">
            <Tabs aria-label="Options">
                <Tab key="description" title="Description">
                    <Divider className="py-[2px] mt-5" />
                    <Card>
                        <CardBody>
                            <p className="text-lg font-semibold">Premium Quality & Innovation</p>
                            <p className="mt-3">
                                Explore an exclusive selection of meticulously crafted products that embody precision, durability, and superior performance. Designed using high-quality materials and advanced manufacturing techniques, our offerings guarantee reliability and long-term satisfaction.
                            </p>

                            <p className="mt-5 text-lg font-semibold">Excellence in Every Category</p>
                            <p className="mt-3">
                                Whether you seek state-of-the-art technology, sophisticated fashion, or essential lifestyle accessories, our collection is thoughtfully curated to cater to diverse preferences. Each item undergoes stringent quality assurance to ensure exceptional standards.
                            </p>

                            <p className="mt-5 text-lg font-semibold">A Seamless Shopping Experience</p>
                            <p className="mt-3">
                                Our platform offers a user-friendly interface, secure transactions, and prompt delivery services. With customer-centric policies, including hassle-free returns and responsive support, we provide a refined and effortless shopping experience.
                            </p>

                            <p className="mt-5 text-lg font-semibold">Why Choose Us?</p>
                            <ul className="mt-3 list-disc list-inside space-y-2">
                                <li><strong>Uncompromising Quality:</strong> Crafted from premium materials to ensure excellence.</li>
                                <li><strong>Cutting-Edge Designs:</strong> Stay ahead with the latest innovations and trends.</li>
                                <li><strong>Competitive Pricing:</strong> Exceptional value without compromising on quality.</li>
                                <li><strong>Effortless Returns:</strong> Transparent and customer-friendly return policies.</li>
                                <li><strong>Dedicated Support:</strong> Professional assistance to enhance your shopping journey.</li>
                            </ul>

                            <p className="mt-5">
                                Whether you are upgrading your lifestyle or selecting the perfect gift, our distinguished collection is designed to meet your expectations. Discover unparalleled quality, functionality, and sophistication—shop with confidence today!
                            </p>
                        </CardBody>
                    </Card>
                </Tab>



                <Tab key="review" title="Review">
                    <Divider className="py-[2px] mt-5" />
                    <Card>
                        <CardBody>
                            <Review productId={productId} />

                        </CardBody>
                    </Card>
                </Tab>
                <Tab key="addreview" title="Add Review">
                    <Divider className="py-[2px] mt-5" />
                    <Card>
                        <CardBody>
                            <AddReview userId={userId} productId={productId} />
                        </CardBody>
                    </Card>
                </Tab>
            </Tabs>
        </div>
    );
}
