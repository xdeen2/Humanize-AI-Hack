import MakerCard from "@/components/MakerCard"
import SpecialText from "@/components/SpecialText"
import SubscribeBox from "@/components/SubscribeBox"

function Makers() {
  return (
    <div className="flex flex-col px-4 md:px-24 p-14 md:p-24 items-center">
        <SpecialText extra="text-5xl font-bold">Our Makers</SpecialText>
        {/* <span className="text-bg-50 mt-5 text-center">They say that ChatGpt is going to take away jobs. Well if that happens, the world will surely be a drab place! Every person is brings in unique perspectives.</span> */}

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10 mt-14">
            <div className="grid grid-cols-1 md:grid-cols-2 absolute md:mx-4 -z-10">
                <img src="/assets/makers-bg-1.png" alt="" />
                <img src="/assets/makers-bg-2.png" alt="" />
                <img src="/assets/makers-bg-2.png" alt="" />
                <img src="/assets/makers-bg-2.png" alt="" />
            </div>
            <MakerCard name="Ria Joshi" image="/team/ria.jpeg" designation="AI Architect" description="Machine Learning & AI Specialist" linkedin="https://www.linkedin.com/in/ria-joshi-997a901bb/" college="IIT Delhi" />
            <MakerCard name="Aastha Katakwar" image="/team/aastha.jpeg" designation="Python Wizard" description="Developer with Expertise in Python and Logic" linkedin="https://www.linkedin.com/in/aastha-katakwar-a2967a208/" college="Medi-Caps University" />
            <MakerCard name="Vishal Vishwajeet" image="/team/vishal.jpeg" designation="Web Craftsman" description="Interface Specialist with Backend APIs" linkedin="https://www.linkedin.com/in/vishal-vishwajeet/" college="Delhi Technological University" />
            <MakerCard name="Gunjan Paneri" image="/team/gunjan.jpeg" designation="Visual Stylist" description="The UI Designer for Web Interface Aesthetics" linkedin="https://www.linkedin.com/in/gunjanpaneri871" college="Chandigarh University" />
        </div>
        <div className="grid grid-cols 1 md:grid-cols-3 gap-x-5 gap-y-10 mt-10 mx-auto">
            <MakerCard name="Moumita Shee" image="/team/moumita.jpeg" designation="Brand Artisan" description="Logo Designer Extraordinaire" linkedin="https://www.linkedin.com/in/moumita-shee-798505226" college="Sister Nivedita University" />
            <MakerCard name="ARTHLEX Research" image="/team/arthlex.jpeg" designation="Owner" description="Radical Problems Real Innovation" imageStyle="!w-64 !object-contain" linkedin="https://www.linkedin.com/company/arthlex-limited/" />
            <MakerCard name="Codeate" image="/team/code8.jpeg" designation="Project Manager" linkedin="https://www.linkedin.com/company/code8-connect/" />
        </div>

        {/* manager and founder */}

        <SubscribeBox boxStyle="mt-14" />

    </div>
  )
}

export default Makers