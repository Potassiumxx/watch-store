export default function AboutUs() {
  return (
    <div id="about-us" className="component-x-axis-padding bg-black text-white border-t-2 border-white/[.5] py-10">
      <div className="py-6">
        <h1 className="text-3xl pb-6">About us</h1>
        <p className="text-[22px]">The Watch Store was founded to sell durable and stylish watches. Although sometimes expensive, they are very durable and of high quality. Alright, enough with this bullshit. This website does not sell watches. I do not know what else to put in the About us section, so I am just typing this so that it looks somewhat long.</p>
      </div>
      <div className="py-10">
        <h1 className="text-3xl pb-6">Why choose us?</h1>
        <ul className="px-6 text-[22px] list-none list-dash">
          <li className="">Durable and stylish watches.</li>
          <li>All kind of watches are available from cheap to expensive, low quality to high quality.</li>
          <li>Home delivery, right outside your door anytime of the day (or night).</li>
          <li>Absolute return policy within 3 days of buying. Although sometimes it might take more than 3 days to deliver, in which case the return policy expires before it was even delivered.</li>
          <li>We do not sell your data and do not request for any other additional data than what is absolutely required for the secure delivery of your product.</li>
        </ul>
      </div>
    </div>
  )
}
