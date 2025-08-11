export default function AboutUs() {
  return (
    <div id="about-us" className="px-4 lg:component-x-axis-padding bg-black text-white border-t-2 border-white/[.5] py-10">
      <div className="md:py-6">
        <h1 className="text-2xl pb-6 md:text-3xl">About us</h1>
        <p className="text-[16px] text-justify md:text-[22px] md:text-left">The Watch Store was founded to sell durable and stylish watches. Although sometimes expensive, they are very durable and of high quality. Alright, enough with this bullshit. This website does not sell watches. I do not know what else to put in the About us section, so I am just typing this so that it looks somewhat long.</p>
      </div>
      <div className="py-10">
        <h1 className="text-2xl md:text-3xl pb-6">Why choose us?</h1>
        <ul className="px-4 text-[16px] md:px-6 md:text-[22px] list-none list-dash">
          <li className="pl-6 -indent-4 before:mr-2"> Durable and stylish watches.</li>
          <li className="pl-6 -indent-4 before:mr-2"> All kind of watches are available from cheap to expensive, low quality to high quality.</li>
          <li className="pl-6 -indent-4 before:mr-2"> Home delivery, right outside your door anytime of the day (or night).</li>
          <li className="pl-6 -indent-4 before:mr-2"> Absolute return policy within 3 days of buying. Although sometimes it might take more than 3 days to deliver, in which case the return policy expires before it was even delivered.</li>
          <li className="pl-6 -indent-4 before:mr-2"> We do not sell your data and do not request for any other additional data than what is absolutely required for the secure delivery of your product.</li>
        </ul>
      </div>
    </div>
  )
}
