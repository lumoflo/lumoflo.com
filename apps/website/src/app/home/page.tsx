import {
    Button,
    Input,
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@lumoflo/ui";
import {GithubIcon} from "lucide-react"
import {BackgroundBeams} from "~/app/home/components/background-beams";

export default function HomePage() {
    return (
        <div className="flex min-h-screen flex-col space-y-5 bg-background pt-10">
            <div className={"flex flex-col space-y-5 "}>
            <div className={"flex flex-col space-y-5 z-10"  }>
                    <a className="flex flex-row gap-2 items-center bg-gray-500/10 hover:bg-gray-500/20 w-fit mx-auto px-4 py-2 border-2 rounded-full"
                       role="button" href="https://github.com/lumoflo/lumoflo.com"
                       target="_blank"
                       tabIndex={"0"}
                       rel="noopener noreferrer">
                        Star us on Github
                        <GithubIcon/>
                    </a>
                    <h1 className="md:text-8xl text-4xl font-bold text-foreground text-center">
                        Sell Smart, <br/> Stress Less!
                    </h1>
                    <h2 className="md:text-2xl textg-lg font-medium text-foreground text-center">
                        Streamline your Insta-Sales with <span className={"underline text-indigo-500"}>Lumoflo</span>
                    </h2>
                    <div className={"flex flex-row gap-2 max-w-[400px] mx-auto"}>
                        <Input placeholder={"Your Email"} type={"email"}/>
                        <Button className={"bg-indigo-500 hover:bg-indigo-600 text-white"}>
                            Join&nbsp;Waitlist
                        </Button>
                    </div>
                    <div
                        tabIndex={"0"}
                        className={"max-w-screen-md w-full sm:h-96 h-56 bg-gray-500/40 rounded-lg mx-auto shadow-indigo-500/20 shadow-lg"}>

                    </div>
                </div>

                <BackgroundBeams className={""}/>

            </div>
            <hr className={"border-px w-full"}/>
            <section id={"features"}>
                <h1 className="md:text-5xl text-4xl font-semibold text-foreground my-3 text-center">
                    Focus on your <span className={"text-indigo-500"}>Business</span>
                </h1>
                <p className="text-lg max-w-screen-md text-center mx-auto text-foreground">
                    Lumoflo simplifies the process for Instagram sellers by offering tools like order management and
                    shipment fulfillment. This allows you to concentrate on your business without getting caught up in
                    operational complexities.
                </p>
                <div className={"grid grid-cols-4 gap-5 my-5 px-2"}>
                    <div className={"col-span-1 border bg-gray-500/10 p-4 rounded"} tabIndex={"0"}>
                        <h2 className={"text-4xl -ml-2"}>😎</h2>
                        <h2 className={"font-bold text-lg my-2"}>Inventory Control</h2>
                        <p>
                            Keep a finger on the pulse of your inventory levels, enabling timely restocking and avoiding
                            stockouts.
                        </p>
                    </div>
                    <div className={"col-span-2 border bg-gray-500/10 p-4 rounded"} tabIndex={"0"}>
                        <h2 className={"text-4xl -ml-2"}>👜️</h2>
                        <h2 className={"font-bold text-lg my-2"}>Streamlined Order Management</h2>
                        <p>
                            Lumoflo's order management is a seamless, all-in-one solution. It simplifies the entire
                            process, from order placement to fulfillment, ensuring smooth and efficient handling without
                            any complexity.
                        </p>
                    </div>
                    <div className={"col-span-1 row-span-2 border bg-gray-500/10 p-4 rounded"} tabIndex={"0"}>
                        <h2 className={"text-4xl -ml-2"}>🚚</h2>
                        <h2 className={"font-bold text-lg my-2"}>Simplified Logistics</h2>
                        <p>
                            Lumoflo streamlines logistics by seamlessly integrating with Delhivery. This integration
                            offers a hassle-free setup for pickups and enables real-time shipment tracking directly from
                            the Lumoflo platform. Sellers can easily coordinate pickups and monitor shipments without
                            toggling between multiple systems, ensuring a smoother and more efficient logistics process.

                        </p>
                    </div>
                    <div className={"col-span-2 border bg-gray-500/10 p-4 rounded"} tabIndex={"0"}>
                        <h2 className={"text-4xl -ml-2"}>🌐️</h2>
                        <h2 className={"font-bold text-lg my-2"}>Personalized Shop Page</h2>
                        <p>
                            Lumoflo crafts individualized shop pages for sellers, enabling order tracking and reviews.
                            These customizable pages reflect the brand and link seamlessly in Instagram bios, enhancing
                            customer experience and fostering engagement.
                        </p>
                    </div>
                    <div className={"col-span-1 border bg-gray-500/10 p-4 rounded"} tabIndex={"0"}>
                        <h2 className={"text-4xl -ml-2"}>📈️</h2>
                        <h2 className={"font-bold text-lg my-2"}>Actionable Analytics</h2>
                        <p>
                            Lumoflo empowers insights for smarter decisions and enhanced selling strategies
                            effortlessly.
                        </p>
                    </div>

                </div>
            </section>
            <hr className={"border-px w-full"}/>
            <section id={"features"}>
                <h1 className="md:text-5xl text-4xl font-semibold text-foreground my-3 text-center">
                    <span className={"text-indigo-500"}>Frequently</span> Asked Questions
                </h1>
                <p className="text-lg max-w-screen-md text-center mx-auto text-foreground">
                    Have questions? Find answers in our comprehensive FAQ
                </p>
                <Accordion type="single" collapsible className="w-full max-w-screen-sm mx-auto my-10">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>What is Lumoflo?</AccordionTrigger>
                        <AccordionContent>
                            Lumoflo is an all-in-one platform crafted to streamline Instagram selling. It simplifies
                            order management, logistics, and payments for sellers, ensuring a seamless selling
                            experience.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Why was Lumoflo created?</AccordionTrigger>
                        <AccordionContent>
                            Lumoflo was born to ease the complexities of Instagram sales. It centralizes operations,
                            empowering sellers with tools for efficient order management and streamlined processes.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>How will Lumoflo help Instagram sellers?</AccordionTrigger>
                        <AccordionContent>
                            Lumoflo simplifies selling by offering an intuitive interface for order management,
                            logistics coordination, and secure payment processing, tailored specifically for Instagram
                            sellers.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                        <AccordionTrigger>How are logistics handled on Lumoflo?</AccordionTrigger>
                        <AccordionContent>
                            Lumoflo collaborates with logistics partners, enabling seamless pickups, real-time shipment
                            tracking, and efficient management, simplifying the entire process for sellers.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-5">
                        <AccordionTrigger>How are payments managed on Lumoflo?</AccordionTrigger>
                        <AccordionContent>
                            Lumoflo seamlessly integrates Razorpay payment gateway for automated transactions. Sellers
                            have the choice to manually accept payments to avoid convenience charges, providing
                            flexibility in payment methods.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-6">
                        <AccordionTrigger>When will Lumoflo launch?</AccordionTrigger>
                        <AccordionContent>
                            Lumoflo's launch date will be unveiled soon. Keep an eye out for official announcements
                            regarding the launch!
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </section>
        </div>
    );
}
